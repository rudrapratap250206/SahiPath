import React, { useState, useEffect, useRef } from 'react';
import { careerData, translations, languageInfo } from './lib/data';
import { RAGSystem, UserProfile } from './lib/rag';
import { useMentorChat, useRegister, useLogin, useLogout, useSaveProfile, useGetMe } from '@workspace/api-client-react';
import { VoiceRow } from './components/VoiceFill';
import { TestsView } from './components/TestsView';
import { PerformanceView } from './components/PerformanceView';
import { ResumeView } from './components/ResumeView';
import { JobsView } from './components/JobsView';
import { HistoryView } from './components/HistoryView';
import { CopilotKit, useCopilotReadable, useCopilotAction } from '@copilotkit/react-core';
import { CopilotPopup } from '@copilotkit/react-ui';
import '@copilotkit/react-ui/styles.css';
import { CopilotPersistence } from './components/CopilotPersistence';

interface CopilotLayerProps {
  ragSystem: RAGSystem | null;
  chatMessages: Array<{ role: string; text: string }>;
  view: string;
  stage: string;
  copilotUserKey: string | null;
  setView: (v: 'chat' | 'performance' | 'tests' | 'resume' | 'jobs') => void;
  onSendMentorMessage: (msg: string, source: 'text' | 'voice') => Promise<void>;
}

function CopilotLayer({ ragSystem, chatMessages, view, stage, copilotUserKey, setView, onSendMentorMessage }: CopilotLayerProps) {
  const profile = ragSystem?.getUserProfile() ?? null;

  useCopilotReadable({
    description: "The current user's career profile and context in SahiPath",
    value: profile
      ? {
          name: `${profile.firstName} ${profile.lastName}`.trim(),
          role: profile.currentRole,
          yearsOfExperience: profile.yearsOfExperience,
          skills: profile.skills,
          careerInterests: profile.careerInterests,
          goals: profile.currentGoals,
          challenges: profile.challenges,
          language: profile.language,
          educationLevel: profile.educationLevel,
          hoursPerWeek: profile.availableHoursPerWeek,
          preferredLearningStyle: profile.preferredLearningStyle,
        }
      : null,
  });

  useCopilotReadable({
    description: "The current active view in the app",
    value: stage === 'mentor' ? view : stage,
  });

  useCopilotReadable({
    description: "Recent chat messages with the AI mentor (last 6)",
    value: chatMessages.slice(-6).map(m => ({ role: m.role, text: m.text })),
  });

  useCopilotAction({
    name: "navigateToView",
    description: "Navigate to a specific section of the SahiPath app",
    parameters: [
      {
        name: "viewName",
        type: "string",
        description: "The section to navigate to: 'chat', 'performance', 'tests', 'resume', or 'jobs'",
        enum: ["chat", "performance", "tests", "resume", "jobs"],
      },
    ],
    handler: ({ viewName }: { viewName: string }) => {
      if (stage === 'mentor') setView(viewName as any);
    },
  });

  useCopilotAction({
    name: "sendMentorMessage",
    description: "Send a message to the SahiPath AI career mentor on the user's behalf",
    parameters: [
      {
        name: "message",
        type: "string",
        description: "The message to send to the mentor",
      },
    ],
    handler: async ({ message }: { message: string }) => {
      if (stage === 'mentor' && ragSystem) {
        setView('chat');
        await onSendMentorMessage(message, 'text');
      }
    },
  });

  return (
    <>
      <CopilotPersistence userKey={copilotUserKey} />
      <CopilotPopup
        instructions="You are a helpful assistant embedded in SahiPath, an AI career mentoring platform. You have full access to the user's career profile, goals, skills, and recent mentor chat history. You can navigate the app to different sections (chat, tests, performance, resume, jobs) and you can send messages to the AI mentor on behalf of the user. Help the user get the most out of SahiPath — suggest tests, review their progress, recommend next steps, or kick off a mentor conversation for them."
        labels={{
          title: "SahiPath Assistant",
          initial: "Hi! I'm your SahiPath assistant. I can navigate the app, check your progress, or start a conversation with your AI mentor. What would you like to do?",
        }}
      />
    </>
  );
}

interface Notification {
  id: string;
  topic: string;
  scheduledAt: number;
}

export default function App() {
  const [language, setLanguage] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [twoPersonMode, setTwoPersonMode] = useState(false);
  const [view, setView] = useState<'chat' | 'performance' | 'tests' | 'resume' | 'jobs' | 'history'>('chat');
  const [newTestAlert, setNewTestAlert] = useState<{ topic: string; score: number } | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Array<{ id: string; title: string; createdAt: string }>>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stage, setStage] = useState<'language' | 'personal' | 'professional' | 'mentor'>('language');
  const [copilotUserKey, setCopilotUserKey] = useState<string | null>(() => {
    try { return localStorage.getItem('sp_copilot_user'); } catch { return null; }
  });
  const [ragSystem, setRagSystem] = useState<RAGSystem | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const [pendingTestTopic, setPendingTestTopic] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [chatInterim, setChatInterim] = useState('');
  const recognitionRef = useRef<any>(null);
  const voiceConvRef = useRef(false);
  const pendingVoiceRef = useRef(false);
  const listeningActiveRef = useRef(false);
  const chatFinalsRef = useRef('');

  const [personalData, setPersonalData] = useState({
    firstName: '', lastName: '', age: '', email: '', location: '',
    educationLevel: "Bachelor's", currentRole: '', yearsOfExperience: '',
  });
  const [professionalData, setProfessionalData] = useState({
    skills: '', careerInterests: '', currentGoals: '', challenges: '',
    availableHoursPerWeek: '', preferredLearningStyle: 'Interactive',
  });

  const [chatMessages, setChatMessages] = useState<Array<{ role: string; text: string }>>([]);
  const [chatInput, setChatInput] = useState('');

  const mentorMutation = useMentorChat();
  const registerMutation = useRegister();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const saveProfileMutation = useSaveProfile();
  const getMeQuery = useGetMe({ query: { enabled: false } });

  const t = language && (translations as any)[language] ? (translations as any)[language] : null;
  const lang = language === 'Hindi' ? 'hi-IN' : language === 'Tamil' ? 'ta-IN' : language === 'Telugu' ? 'te-IN' : language === 'Kannada' ? 'kn-IN' : language === 'Malayalam' ? 'ml-IN' : 'en-US';

  useEffect(() => { chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

  const showToast = (msg: string, ms = 4000) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), ms);
  };

  // Request browser notification permission on first use
  const requestNotifPermission = async () => {
    if ('Notification' in window && (window as any).Notification.permission === 'default') {
      await (window as any).Notification.requestPermission();
    }
  };

  // Parse AI reply for the structured STUDY_TOPIC marker
  const detectStudyTopic = (text: string) => {
    // Prefer the structured marker the AI is instructed to emit
    const structured = text.match(/🔔\s*STUDY_TOPIC:\s*([^\n]+)/i);
    if (structured && structured[1]) return structured[1].trim().slice(0, 80);
    // Fallback patterns
    const patterns = [
      /you should (?:study|learn|practice|cover|go through) ([A-Za-z0-9 .#+/\-]+?)(?:\.|,|!|$)/i,
      /start with ([A-Za-z0-9 .#+/\-]+?)(?:\.|,|!| which| for| and|$)/i,
      /focus on ([A-Za-z0-9 .#+/\-]+?)(?:\.|,|!| which| for| and|$)/i,
      /complete ([A-Za-z0-9 .#+/\-]+?)(?:\.|,|!| which| for| and|$)/i,
    ];
    for (const p of patterns) {
      const m = text.match(p);
      if (m?.[1]) {
        const topic = m[1].trim().replace(/['"]/g, '').slice(0, 60);
        if (topic.length >= 3) return topic;
      }
    }
    return null;
  };

  // Schedule a real browser notification at 8pm (or 12h from now if already past 8pm)
  const scheduleEndOfDayNotification = (topic: string) => {
    if (!('Notification' in window)) return;
    const Notif = (window as any).Notification as typeof Notification;
    if (Notif.permission !== 'granted') return;

    const now = new Date();
    const target = new Date();
    target.setHours(20, 0, 0, 0); // 8:00 PM today
    if (target <= now) target.setTime(now.getTime() + 12 * 60 * 60 * 1000); // 12h later

    const delay = target.getTime() - now.getTime();
    const timeLabel = target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setTimeout(() => {
      try {
        new Notif('SahiPath — Time to test yourself! 📝', {
          body: `You studied "${topic}" today. Take a quick test now to lock in what you learned.`,
          icon: '/logo.png',
          tag: `sp-test-${topic.slice(0, 20)}`,
        });
      } catch {}
    }, delay);

    showToast(`🔔 End-of-day test reminder set for ${timeLabel} — "${topic}"`, 5000);
  };

  const scheduleTestNotification = (topic: string) => {
    const notif: Notification = { id: `n-${Date.now()}`, topic, scheduledAt: Date.now() };
    try {
      const existing = JSON.parse(localStorage.getItem('sp_upcoming_tests') || '[]');
      if (!existing.some((n: Notification) => n.topic.toLowerCase() === topic.toLowerCase())) {
        const updated = [...existing, notif];
        localStorage.setItem('sp_upcoming_tests', JSON.stringify(updated));
        scheduleEndOfDayNotification(topic);
        showToast(`📚 Study topic added: "${topic}". End-of-day test reminder set!`, 5000);
      }
    } catch {}
  };

  const loadSessions = async () => {
    try {
      const res = await fetch('/api/mentor/sessions', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.sessions)) setSessions(data.sessions);
      }
    } catch {}
  };

  const loadSessionMessages = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/mentor/sessions/${sessionId}/messages`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.messages) && data.messages.length > 0) {
          setChatMessages(data.messages.map((m: any) => ({ role: m.role, text: m.text })));
          return true;
        }
      }
    } catch {}
    return false;
  };

  // Load server-side conversation history for logged-in users
  const loadChatHistory = async () => {
    try {
      const res = await fetch('/api/mentor/history', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.messages) && data.messages.length > 0) {
          setChatMessages(data.messages.map((m: any) => ({ role: m.role, text: m.text })));
          return true;
        }
      }
    } catch {}
    return false;
  };

  // Restore session on load
  useEffect(() => {
    const tryRestore = async () => {
      // Try cookie-based auth first
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          const profile = data?.user?.profile;
          if (profile) {
            const rag = new RAGSystem();
            rag.setUserProfile(profile);
            setRagSystem(rag);
            setLanguage(profile.language || 'English');
            setIsLoggedIn(true);
            setStage('mentor');
            const uKey = data?.user?.email || profile.email || null;
            if (uKey) { setCopilotUserKey(uKey); localStorage.setItem('sp_copilot_user', uKey); }
            // Load sessions list then most recent session messages
            await loadSessions();
            const sessionsRes = await fetch('/api/mentor/sessions', { credentials: 'include' });
            if (sessionsRes.ok) {
              const sessData = await sessionsRes.json();
              if (Array.isArray(sessData.sessions) && sessData.sessions.length > 0) {
                const latest = sessData.sessions[0];
                setCurrentSessionId(latest.id);
                const loaded = await loadSessionMessages(latest.id);
                if (loaded) return;
              }
            }
            setChatMessages([{ role: 'assistant', text: `Welcome back, ${profile.firstName}! How can I help you today?` }]);
            return;
          }
        }
      } catch {}
      // Fall back to localStorage
      try {
        const saved = localStorage.getItem('sahipath_profile');
        if (saved) {
          const profile = JSON.parse(saved);
          const rag = new RAGSystem();
          rag.setUserProfile(profile);
          setRagSystem(rag);
          setLanguage(profile.language || 'English');
          setStage('mentor');
          const welcome = rag.generateResponse(`Welcome back ${profile.firstName}`, careerData);
          setChatMessages([{ role: 'assistant', text: welcome || `Welcome back, ${profile.firstName}!` }]);
        }
      } catch {}
    };
    tryRestore();
  }, []);

  const speakText = (text: string) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => {
      setIsSpeaking(false);
      if (voiceConvRef.current && twoPersonMode && !recognitionRef.current) {
        setTimeout(() => startListening(true), 300);
      }
    };
    synth.cancel();
    synth.speak(utter);
  };

  const stopListening = () => {
    voiceConvRef.current = false;
    pendingVoiceRef.current = false;
    listeningActiveRef.current = false;
    setIsListening(false);
    setChatInterim('');
    chatFinalsRef.current = '';
    try { recognitionRef.current?.stop?.(); } catch {}
    recognitionRef.current = null;
  };

  const startListening = async (autoSend = false) => {
    const w: any = window;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) { alert('Speech recognition not supported in this browser'); return; }

    chatFinalsRef.current = '';
    const recog = new SR();
    recog.lang = lang;
    recog.maxAlternatives = 1;

    if (autoSend && twoPersonMode) {
      // Two-person mode: auto-sends when user pauses — use non-continuous
      recog.continuous = false;
      recog.interimResults = false;
      recog.onresult = async (e: any) => {
        const transcript = e.results[e.results.length - 1][0].transcript.trim();
        if (!transcript) return;
        pendingVoiceRef.current = true;
        recog.stop();
        await sendMentorMessage(transcript, 'voice');
      };
      recog.onend = () => { setIsListening(false); recognitionRef.current = null; };
      recog.onerror = () => { setIsListening(false); recognitionRef.current = null; };
    } else {
      // Manual mode: stays on until user taps stop
      recog.continuous = true;
      recog.interimResults = true;
      recog.onresult = (e: any) => {
        let finals = '';
        let interim = '';
        for (let i = 0; i < e.results.length; i++) {
          if (e.results[i].isFinal) {
            finals += e.results[i][0].transcript;
          } else {
            interim += e.results[i][0].transcript;
          }
        }
        chatFinalsRef.current = finals;
        setChatInput(finals);
        setChatInterim(interim);
      };
      recog.onerror = (e: any) => {
        if (e.error === 'no-speech') return;
        stopListening();
      };
      recog.onend = () => {
        if (listeningActiveRef.current) {
          // Browser ended early — restart to keep listening
          try { recog.start(); } catch {}
        } else {
          setIsListening(false);
          setChatInterim('');
          recognitionRef.current = null;
        }
      };
    }

    recognitionRef.current = recog;
    listeningActiveRef.current = true;
    setIsListening(true);
    recog.start();
  };

  useEffect(() => {
    if (stage !== 'mentor') return;
    void requestNotifPermission();
    if (twoPersonMode) {
      voiceConvRef.current = true;
      if (!recognitionRef.current && !isListening) void startListening(true);
    } else {
      stopListening();
    }
  }, [twoPersonMode, stage]);

  const sendMentorMessage = async (userMsg: string, source: 'text' | 'voice') => {
    if (!ragSystem) return;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    const profile = ragSystem.getUserProfile();
    try {
      const data = await mentorMutation.mutateAsync({
        data: { message: userMsg, profile: profile as any, mode: source, history: chatMessages.slice(-20), sessionId: currentSessionId } as any
      });
      const rawReply = (data as any).reply || 'No reply returned.';

      // Handle AI image generation request
      const imageMatch = rawReply.match(/🖼️\s*GENERATE_IMAGE:\s*([^\n]+)/i);
      if (imageMatch) {
        setChatMessages(prev => [...prev, { role: 'assistant', text: '🖼️ Generating image for you, please wait...' }]);
        try {
          const r = await fetch('/api/media', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ type: 'image', prompt: imageMatch[1].trim() }) });
          const d = await r.json();
          if (r.ok && d.url) {
            setChatMessages(prev => [...prev.slice(0, -1), { role: 'assistant', text: `🖼️ Here's your generated image:\n[IMAGE:${d.url}]` }]);
          } else {
            setChatMessages(prev => [...prev.slice(0, -1), { role: 'assistant', text: `❌ Image generation failed: ${d.error || 'Unknown error'}. OPENAI_API_KEY must be configured.` }]);
          }
        } catch {
          setChatMessages(prev => [...prev.slice(0, -1), { role: 'assistant', text: '❌ Image generation failed. Make sure OPENAI_API_KEY is set in secrets.' }]);
        }
        if ((data as any).sessionId) { setCurrentSessionId((data as any).sessionId); loadSessions(); }
        return;
      }

      // Handle AI podcast generation request
      const podcastMatch = rawReply.match(/🎙️\s*GENERATE_PODCAST:\s*([\s\S]+)/i);
      if (podcastMatch) {
        setChatMessages(prev => [...prev, { role: 'assistant', text: '🎙️ Generating audio podcast for you, please wait...' }]);
        try {
          const r = await fetch('/api/media', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ type: 'podcast', prompt: podcastMatch[1].trim() }) });
          const d = await r.json();
          if (r.ok && d.url) {
            setChatMessages(prev => [...prev.slice(0, -1), { role: 'assistant', text: `🎙️ Your podcast is ready! Press play to listen:\n[AUDIO:${d.url}]` }]);
          } else {
            setChatMessages(prev => [...prev.slice(0, -1), { role: 'assistant', text: `❌ Podcast generation failed: ${d.error || 'Unknown error'}. OPENAI_API_KEY must be configured.` }]);
          }
        } catch {
          setChatMessages(prev => [...prev.slice(0, -1), { role: 'assistant', text: '❌ Podcast generation failed. Make sure OPENAI_API_KEY is set in secrets.' }]);
        }
        if ((data as any).sessionId) { setCurrentSessionId((data as any).sessionId); loadSessions(); }
        return;
      }

      // Normal reply — strip the study topic marker from display
      const displayReply = rawReply.replace(/🔔\s*STUDY_TOPIC:[^\n]*/gi, '').trim();
      setChatMessages(prev => [...prev, { role: 'assistant', text: displayReply }]);

      // Update session tracking
      if ((data as any).sessionId) {
        const newSid = (data as any).sessionId;
        setCurrentSessionId(newSid);
        loadSessions();
      }

      const topic = detectStudyTopic(rawReply);
      if (topic) scheduleTestNotification(topic);
      if (twoPersonMode && source === 'voice') speakText(displayReply);
    } catch (err: any) {
      const fallback = err?.data?.error || err?.message || 'Unable to reach the mentor. Check your GEMINI_API_KEY.';
      setChatMessages(prev => [...prev, { role: 'assistant', text: fallback }]);
    }
  };

  const handleNewChat = () => {
    const p = ragSystem?.getUserProfile();
    setChatMessages([{ role: 'assistant', text: `Starting a fresh chat! Hi ${p?.firstName || 'there'}, what would you like to explore today?` }]);
    setCurrentSessionId(null);
    setView('chat');
  };

  const handleLoadSession = async (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setView('chat');
    try {
      const res = await fetch(`/api/mentor/sessions/${sessionId}/messages`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.messages) && data.messages.length > 0) {
          setChatMessages(data.messages.map((m: any) => ({ role: m.role, text: m.text })));
        } else {
          setChatMessages([]);
        }
      }
    } catch {}
  };

  const handleClearChat = async () => {
    if (!window.confirm('Clear all chat history? This cannot be undone.')) return;
    try { await fetch('/api/mentor/history', { method: 'DELETE', credentials: 'include' }); } catch {}
    const p = ragSystem?.getUserProfile();
    setChatMessages([{ role: 'assistant', text: `Chat cleared! Hi ${p?.firstName || 'there'}, what would you like to work on today?` }]);
    setSessions([]);
    setCurrentSessionId(null);
    showToast('✅ Chat history cleared');
  };

  // Render a message with clickable course links, media embeds, and URL detection
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];

    lines.forEach((line, li) => {
      // Detect inline image embed: [IMAGE:url]
      const imageEmbedMatch = line.match(/\[IMAGE:(https?:\/\/[^\]]+)\]/);
      if (imageEmbedMatch) {
        elements.push(
          <div key={li} style={{ margin: '0.6rem 0' }}>
            <img
              src={imageEmbedMatch[1]}
              alt="AI Generated"
              style={{ maxWidth: '100%', borderRadius: 10, border: '1px solid var(--sp-border-color)' }}
            />
          </div>
        );
        return;
      }

      // Detect inline audio embed: [AUDIO:data:audio/...]
      const audioEmbedMatch = line.match(/\[AUDIO:(data:audio\/[^\]]+)\]/);
      if (audioEmbedMatch) {
        elements.push(
          <div key={li} style={{ margin: '0.6rem 0' }}>
            <audio controls src={audioEmbedMatch[1]} style={{ width: '100%', borderRadius: 8 }} />
          </div>
        );
        return;
      }

      // Detect structured course line: 📚 COURSE: Title — https://...
      const courseMatch = line.match(/📚\s*COURSE:\s*(.+?)\s*[—–-]\s*(https?:\/\/\S+)/i);
      if (courseMatch) {
        elements.push(
          <a
            key={li}
            href={courseMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(0,188,212,0.08)', border: '1px solid rgba(0,188,212,0.3)',
              borderRadius: 8, padding: '0.5rem 0.75rem', margin: '0.3rem 0',
              color: 'var(--sp-accent-teal)', textDecoration: 'none', fontSize: '0.85rem',
              fontWeight: 500,
            }}
          >
            <span>🎓</span>
            <span style={{ flex: 1 }}>{courseMatch[1].trim()}</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>↗ Open</span>
          </a>
        );
        return;
      }

      // Detect plain URLs in regular lines and make them clickable
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      if (urlRegex.test(line)) {
        const parts = line.split(/(https?:\/\/[^\s]+)/g);
        elements.push(
          <span key={li}>
            {parts.map((part, pi) =>
              part.match(/^https?:\/\//) ? (
                <a key={pi} href={part} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--sp-accent-teal)', wordBreak: 'break-all' }}>
                  {part}
                </a>
              ) : part
            )}
            {li < lines.length - 1 && <br />}
          </span>
        );
      } else {
        elements.push(<span key={li}>{line}{li < lines.length - 1 && <br />}</span>);
      }
    });

    return <>{elements}</>;
  };

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalData.firstName.trim() || !personalData.email.trim() || !personalData.currentRole.trim()) {
      alert(t?.['alert_fillRequired'] || 'Please fill all required fields');
      return;
    }
    if (!personalData.email.includes('@')) {
      alert('Please enter a valid email address (e.g. you@gmail.com)');
      return;
    }
    setStage('professional');
  };

  const handleProfessionalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!professionalData.skills.trim() || !professionalData.careerInterests.trim() || !professionalData.currentGoals.trim()) {
      alert(t?.['alert_fillRequired'] || 'Please fill all required fields');
      return;
    }
    const userProfile: UserProfile = {
      language: language!,
      firstName: personalData.firstName.trim(),
      lastName: personalData.lastName.trim(),
      age: parseInt(personalData.age) || 0,
      email: personalData.email.trim(),
      location: personalData.location.trim(),
      educationLevel: personalData.educationLevel,
      currentRole: personalData.currentRole.trim(),
      yearsOfExperience: parseInt(personalData.yearsOfExperience) || 0,
      skills: professionalData.skills.split(',').map(s => s.trim()).filter(Boolean),
      careerInterests: professionalData.careerInterests.split(',').map(s => s.trim()).filter(Boolean),
      currentGoals: professionalData.currentGoals.trim(),
      challenges: professionalData.challenges.trim(),
      availableHoursPerWeek: parseInt(professionalData.availableHoursPerWeek) || 0,
      preferredLearningStyle: professionalData.preferredLearningStyle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const rag = new RAGSystem();
    rag.setUserProfile(userProfile);
    setRagSystem(rag);

    try { localStorage.setItem('sahipath_profile', JSON.stringify(userProfile)); } catch {}
    try { await saveProfileMutation.mutateAsync({ data: userProfile as any }); } catch {}

    const welcomeMsg = rag.generateResponse(`Hello, I'm ${userProfile.firstName}.`, careerData);
    setChatMessages([{ role: 'assistant', text: welcomeMsg || `Welcome ${userProfile.firstName}! I'm your SahiPath AI mentor.` }]);
    setStage('mentor');
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !ragSystem) return;
    const msg = chatInput.trim();
    setChatInput('');
    await sendMentorMessage(msg, 'text');
  };

  const handleLogout = () => {
    logoutMutation.mutate({});
    setStage('language');
    setLanguage(null);
    setRagSystem(null);
    setIsLoggedIn(false);
    setView('chat');
    setChatMessages([]);
    setSessions([]);
    setCurrentSessionId(null);
    setCopilotUserKey(null);
    localStorage.removeItem('sahipath_profile');
    localStorage.removeItem('sp_copilot_user');
  };

  // ------- STAGE: Language -------
  if (stage === 'language') {
    const allLanguages = Object.keys(languageInfo as any);
    const indLangs = allLanguages.filter(l => (languageInfo as any)[l].region === 'India');
    const globalLangs = allLanguages.filter(l => (languageInfo as any)[l].region === 'Global');

    return (
      <div className="sp-container sp-welcome">
        <div className="sp-card sp-language-selection">
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <button className="sp-btn-secondary" style={{ padding: '0.5rem 1rem' }} onClick={() => { setShowLogin(true); setShowRegister(false); }}>Sign in</button>
            <button className="sp-btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={() => { setShowRegister(true); setShowLogin(false); }}>Register</button>
          </div>

          {(showLogin || showRegister) && (
            <div style={{ marginBottom: '1rem', padding: '1.2rem', borderRadius: 8, background: 'var(--sp-bg-tertiary)', border: '1px solid var(--sp-border-color)' }}>
              <h3 style={{ marginBottom: '0.8rem', marginTop: 0 }}>{showLogin ? '🔐 Sign in to SahiPath' : '📝 Create Account'}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--sp-text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Email address (e.g. you@gmail.com)</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={authEmail}
                    onChange={e => setAuthEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 6, background: 'var(--sp-bg-secondary)', border: `1px solid ${authError ? 'var(--sp-accent-coral)' : 'var(--sp-border-color)'}`, color: 'var(--sp-text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--sp-text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Password</label>
                  <input
                    type="password"
                    placeholder={showRegister ? 'Minimum 6 characters' : 'Your password'}
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.closest('form')?.requestSubmit(); }}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 6, background: 'var(--sp-bg-secondary)', border: `1px solid ${authError ? 'var(--sp-accent-coral)' : 'var(--sp-border-color)'}`, color: 'var(--sp-text-primary)' }}
                  />
                </div>
                {authError && (
                  <div style={{ padding: '0.5rem 0.8rem', background: 'rgba(255,107,107,0.1)', border: '1px solid var(--sp-accent-coral)', borderRadius: 6, color: 'var(--sp-accent-coral)', fontSize: '0.85rem' }}>
                    {authError === 'Invalid credentials' ? '❌ Wrong email or password. Check and try again, or register.' : authError}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                  {showLogin ? (
                    <button className="sp-btn-primary" disabled={loginMutation.isPending || !authEmail || !authPassword}
                      onClick={async () => {
                        setAuthError(null);
                        if (!authEmail.includes('@')) { setAuthError('Please enter a valid email (e.g. you@gmail.com)'); return; }
                        try {
                          const data = await loginMutation.mutateAsync({ data: { email: authEmail.trim(), password: authPassword } });
                          const profile = (data as any).user?.profile;
                          setIsLoggedIn(true);
                          const uKey = authEmail.trim();
                          setCopilotUserKey(uKey);
                          localStorage.setItem('sp_copilot_user', uKey);
                          if (profile) {
                            const rag = new RAGSystem();
                            rag.setUserProfile(profile);
                            setRagSystem(rag);
                            setLanguage(profile.language || 'English');
                            setStage('mentor');
                            localStorage.setItem('sahipath_profile', JSON.stringify(profile));
                            setChatMessages([{ role: 'assistant', text: `Welcome back, ${profile.firstName}! Ready to continue your career journey?` }]);
                          } else {
                            setLanguage('English');
                            setStage('personal');
                          }
                          setShowLogin(false);
                        } catch (err: any) {
                          setAuthError(err?.data?.error || err?.message || 'Login failed. Please try again.');
                        }
                      }}>
                      {loginMutation.isPending ? '⏳ Signing in...' : 'Sign in'}
                    </button>
                  ) : (
                    <button className="sp-btn-primary" disabled={registerMutation.isPending || !authEmail || !authPassword}
                      onClick={async () => {
                        setAuthError(null);
                        if (!authEmail.includes('@')) { setAuthError('Please enter a valid email (e.g. you@gmail.com)'); return; }
                        if (authPassword.length < 6) { setAuthError('Password must be at least 6 characters'); return; }
                        try {
                          await registerMutation.mutateAsync({ data: { email: authEmail.trim(), password: authPassword } });
                          setIsLoggedIn(true);
                          setAuthError(null);
                          showToast('✅ Account created! Please complete your profile.');
                          setLanguage('English');
                          setShowRegister(false);
                          setStage('personal');
                          setPersonalData(p => ({ ...p, email: authEmail.trim() }));
                        } catch (err: any) {
                          setAuthError(err?.data?.error || err?.message || 'Registration failed.');
                        }
                      }}>
                      {registerMutation.isPending ? '⏳ Creating account...' : 'Create Account'}
                    </button>
                  )}
                  <button className="sp-btn-secondary" onClick={() => { setShowLogin(false); setShowRegister(false); setAuthError(null); }}>Cancel</button>
                  {showLogin && <button className="sp-btn-secondary" style={{ marginLeft: 'auto', fontSize: '0.8rem' }} onClick={() => { setShowLogin(false); setShowRegister(true); setAuthError(null); }}>No account? Register</button>}
                  {showRegister && <button className="sp-btn-secondary" style={{ marginLeft: 'auto', fontSize: '0.8rem' }} onClick={() => { setShowRegister(false); setShowLogin(true); setAuthError(null); }}>Already registered? Sign in</button>}
                </div>
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img src="/logo.png" alt="SahiPath" style={{ height: '90px', objectFit: 'contain', marginBottom: '0.5rem' }} />
            <p style={{ fontSize: '1rem', color: 'var(--sp-text-secondary)', marginTop: '0.2rem' }}>Your Personal AI Career Mentor</p>
          </div>

          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.3rem' }}>🌍 Choose Your Language</h2>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--sp-text-secondary)', marginBottom: '1rem' }}>🇮🇳 Languages from India</h3>
            <div className="sp-language-grid">
              {indLangs.map(l => (
                <button key={l} onClick={() => { setLanguage(l); setRagSystem(new RAGSystem()); setStage('personal'); }} className="sp-language-btn">
                  <div className="sp-lang-emoji">{(languageInfo as any)[l].emoji}</div>
                  <div className="sp-lang-name">{l}</div>
                  <div className="sp-lang-subtitle">{(languageInfo as any)[l].nativeName}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--sp-text-secondary)', marginBottom: '1rem' }}>🌎 Languages Worldwide</h3>
            <div className="sp-language-grid">
              {globalLangs.map(l => (
                <button key={l} onClick={() => { setLanguage(l); setRagSystem(new RAGSystem()); setStage('personal'); }} className="sp-language-btn">
                  <div className="sp-lang-emoji">{(languageInfo as any)[l].emoji}</div>
                  <div className="sp-lang-name">{l}</div>
                  <div className="sp-lang-subtitle">{(languageInfo as any)[l].nativeName}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {toastMsg && <div className="sp-toast">{toastMsg}</div>}
      </div>
    );
  }

  if (!language || !t) return null;

  // ------- STAGE: Personal Details -------
  if (stage === 'personal') {
    return (
      <div className="sp-container sp-form-container">
        {toastMsg && <div className="sp-toast">{toastMsg}</div>}
        <div className="sp-card sp-form-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
            <img src="/logo.png" alt="SahiPath" style={{ height: '40px', objectFit: 'contain' }} />
            <h1 style={{ margin: 0 }}>👤 {t['personal_details'] || 'Personal Details'}</h1>
          </div>
          <p className="sp-form-subtitle">{t['tell_us_about'] || 'Tell us about yourself'}</p>
          <p style={{ fontSize: '0.82rem', color: 'var(--sp-text-secondary)', marginBottom: '1.2rem' }}>
            🎤 Tap the mic icon next to any field to fill it by speaking
          </p>
          <form onSubmit={handlePersonalSubmit} className="sp-form">
            <div className="sp-form-row">
              <VoiceRow lang={lang} label={t['firstName'] || 'First Name *'} value={personalData.firstName} onChange={v => setPersonalData(p => ({ ...p, firstName: v }))} required />
              <VoiceRow lang={lang} label={t['lastName'] || 'Last Name'} value={personalData.lastName} onChange={v => setPersonalData(p => ({ ...p, lastName: v }))} />
            </div>
            <div className="sp-form-row">
              <VoiceRow lang={lang} label={t['age'] || 'Age'} type="number" value={personalData.age} onChange={v => setPersonalData(p => ({ ...p, age: v }))} />
              <VoiceRow lang={lang} label="Email address *" type="email" placeholder="your@email.com" value={personalData.email} onChange={v => setPersonalData(p => ({ ...p, email: v }))} required />
            </div>
            <div className="sp-form-row">
              <VoiceRow lang={lang} label={t['location'] || 'City, Country'} value={personalData.location} onChange={v => setPersonalData(p => ({ ...p, location: v }))} />
              <VoiceRow lang={lang} label="Education Level" as="select" value={personalData.educationLevel} onChange={v => setPersonalData(p => ({ ...p, educationLevel: v }))}>
                <option>{t['edu_highschool'] || 'High School'}</option>
                <option>{t['edu_bachelor'] || "Bachelor's"}</option>
                <option>{t['edu_master'] || "Master's"}</option>
                <option>{t['edu_phd'] || 'PhD'}</option>
              </VoiceRow>
            </div>
            <div className="sp-form-row">
              <VoiceRow lang={lang} label={t['currentRole'] || 'Current Role *'} value={personalData.currentRole} onChange={v => setPersonalData(p => ({ ...p, currentRole: v }))} required />
              <VoiceRow lang={lang} label={t['yearsExp'] || 'Years of Experience'} type="number" value={personalData.yearsOfExperience} onChange={v => setPersonalData(p => ({ ...p, yearsOfExperience: v }))} />
            </div>
            <button type="submit" className="sp-btn-primary sp-form-btn">{t['next'] || 'Next'} →</button>
            {isLoggedIn && <button type="button" className="sp-btn-secondary" onClick={() => setStage('language')} style={{ marginTop: '0.5rem' }}>← Back</button>}
          </form>
        </div>
      </div>
    );
  }

  // ------- STAGE: Professional Details -------
  if (stage === 'professional') {
    return (
      <div className="sp-container sp-form-container">
        {toastMsg && <div className="sp-toast">{toastMsg}</div>}
        <div className="sp-card sp-form-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
            <img src="/logo.png" alt="SahiPath" style={{ height: '40px', objectFit: 'contain' }} />
            <h1 style={{ margin: 0 }}>💼 {t['professional_details'] || 'Professional Details'}</h1>
          </div>
          <p className="sp-form-subtitle">{t['career_info'] || 'Tell us about your career goals'}</p>
          <p style={{ fontSize: '0.82rem', color: 'var(--sp-text-secondary)', marginBottom: '1.2rem' }}>
            🎤 Tap the mic icon to speak your answers
          </p>
          <form onSubmit={handleProfessionalSubmit} className="sp-form">
            <VoiceRow lang={lang} label={t['skills'] || 'Skills (comma-separated) *'} as="textarea" value={professionalData.skills} onChange={v => setProfessionalData(p => ({ ...p, skills: v }))} required />
            <VoiceRow lang={lang} label={t['interests'] || 'Career Interests (comma-separated) *'} as="textarea" value={professionalData.careerInterests} onChange={v => setProfessionalData(p => ({ ...p, careerInterests: v }))} required />
            <VoiceRow lang={lang} label={t['goals'] || 'Current Goals *'} as="textarea" value={professionalData.currentGoals} onChange={v => setProfessionalData(p => ({ ...p, currentGoals: v }))} required />
            <VoiceRow lang={lang} label={t['challenges'] || 'Challenges'} as="textarea" value={professionalData.challenges} onChange={v => setProfessionalData(p => ({ ...p, challenges: v }))} />
            <div className="sp-form-row">
              <VoiceRow lang={lang} label={t['hoursPerWeek'] || 'Hours/week'} type="number" value={professionalData.availableHoursPerWeek} onChange={v => setProfessionalData(p => ({ ...p, availableHoursPerWeek: v }))} />
              <VoiceRow lang={lang} label="Learning Style" as="select" value={professionalData.preferredLearningStyle} onChange={v => setProfessionalData(p => ({ ...p, preferredLearningStyle: v }))}>
                <option>Interactive</option>
                <option>Visual</option>
                <option>Reading</option>
                <option>Practice-based</option>
              </VoiceRow>
            </div>
            <div className="sp-form-buttons">
              <button type="button" onClick={() => setStage('personal')} className="sp-btn-secondary sp-form-btn">← {t['back'] || 'Back'}</button>
              <button type="submit" className="sp-btn-primary sp-form-btn" disabled={saveProfileMutation.isPending}>
                {saveProfileMutation.isPending ? '⏳ Saving...' : `${t['startMentoring'] || 'Start Mentoring'} →`}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ------- STAGE: Mentor -------
  const profile = ragSystem?.getUserProfile() || null;

  return (
    <CopilotKit runtimeUrl="/api/copilot">
    <div className="sp-container sp-mentor-main">
      <CopilotLayer
        ragSystem={ragSystem}
        chatMessages={chatMessages}
        view={view}
        stage={stage}
        copilotUserKey={copilotUserKey}
        setView={setView}
        onSendMentorMessage={sendMentorMessage}
      />
      {toastMsg && <div className="sp-toast">{toastMsg}</div>}

      <div className="sp-mentor-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/logo.png" alt="SahiPath" style={{ height: '52px', objectFit: 'contain', flexShrink: 0 }} />
        <div>
          <h1 style={{ margin: 0 }}>{t['mentorChat'] || 'AI Career Mentor'}
            {profile?.firstName && <span style={{ WebkitTextFillColor: 'var(--sp-text-primary)', background: 'none' }}> — <span style={{ color: 'var(--sp-accent-teal)', WebkitTextFillColor: 'var(--sp-accent-teal)' }}>{profile.firstName}</span></span>}
          </h1>
          <p className="sp-mentor-subtitle" style={{ margin: 0 }}>{t['rag_intro'] || '24/7 AI Assistant powered by your personal career context'}</p>
        </div>
      </div>

      <div className="sp-mentor-layout">
        <div className="sp-mentor-sidebar">
          <div className="sp-profile-card">
            <h3 style={{ marginTop: 0 }}>📋 {t['profile_summary'] || 'Your Profile'}</h3>
            <ul className="sp-profile-list">
              <li><strong>{t['role'] || 'Role'}:</strong> {profile?.currentRole || '—'}</li>
              <li><strong>Exp:</strong> {profile?.yearsOfExperience ?? '—'} {t['years'] || 'years'}</li>
              <li><strong>{t['goals'] || 'Goals'}:</strong> {profile?.currentGoals?.slice(0, 50) || '—'}</li>
              <li><strong>Hours/Week:</strong> {profile?.availableHoursPerWeek || '—'}</li>
              <li><strong>Style:</strong> {profile?.preferredLearningStyle || '—'}</li>
            </ul>
            {profile?.skills?.length ? (
              <>
                <h3 style={{ marginTop: '1rem' }}>🎯 {t['skills'] || 'Skills'}</h3>
                <div className="sp-skills-tags">
                  {profile.skills.map(s => <span key={s} className="sp-skill-tag">{s}</span>)}
                </div>
              </>
            ) : null}
            <div style={{ marginTop: '1.2rem', display: 'grid', gap: '0.4rem' }}>
              <button
                onClick={handleNewChat}
                style={{ padding: '0.6rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, background: 'var(--sp-accent-teal)', color: '#0a0f2d', border: 'none', borderRadius: 6, cursor: 'pointer' }}
              >
                ➕ New Chat
              </button>

              {sessions.length > 0 && (
                <div style={{ marginTop: '0.2rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--sp-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.3rem 0.1rem', marginBottom: '0.2rem' }}>
                    Recent Chats
                  </div>
                  <div style={{ maxHeight: '160px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    {sessions.map(s => (
                      <button
                        key={s.id}
                        onClick={() => handleLoadSession(s.id)}
                        className={`sp-btn-secondary${currentSessionId === s.id ? ' sp-btn-active' : ''}`}
                        title={s.title}
                        style={{ padding: '0.45rem 0.6rem', textAlign: 'left', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        💬 {s.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ height: '1px', background: 'var(--sp-border-color)', margin: '0.3rem 0' }} />

              {([
                ['chat', '💬 Chat'],
                ['history', '📜 History'],
                ['performance', '📈 Performance'],
                ['tests', '📝 Tests'],
                ['resume', '📄 Resume'],
                ['jobs', '💼 Jobs'],
              ] as const).map(([v, label]) => (
                <button key={v} onClick={() => setView(v as any)} className={`sp-btn-secondary${view === v ? ' sp-btn-active' : ''}`} style={{ padding: '0.6rem', textAlign: 'left', fontSize: '0.85rem' }}>
                  {label}
                </button>
              ))}

              <div style={{ height: '1px', background: 'var(--sp-border-color)', margin: '0.3rem 0' }} />

              <button onClick={handleClearChat} className="sp-btn-secondary" style={{ padding: '0.6rem', fontSize: '0.85rem', color: 'var(--sp-accent-coral)', textAlign: 'left' }}>
                🗑️ Clear Chat
              </button>
              <button onClick={handleLogout} className="sp-btn-secondary" style={{ padding: '0.6rem', fontSize: '0.85rem', textAlign: 'left' }}>
                🔄 {t['restart'] || 'Restart'}
              </button>
            </div>
          </div>
        </div>

        <div className="sp-mentor-chat">
          {view === 'chat' && (
            <>
              <div className="sp-chat-messages">
                {chatMessages.length === 0 && (
                  <div style={{ color: 'var(--sp-text-secondary)', textAlign: 'center', padding: '2rem', fontSize: '0.9rem' }}>
                    Ask your mentor anything — career advice, study plans, skill gaps, interview prep...
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`sp-message sp-message-${msg.role}`}>
                    <span className="sp-msg-emoji">{msg.role === 'assistant' ? '🤖' : '👤'}</span>
                    <div className="sp-message-content">
                      {msg.role === 'assistant' ? renderMessageContent(msg.text) : msg.text}
                    </div>
                  </div>
                ))}
                {mentorMutation.isPending && (
                  <div className="sp-message sp-message-assistant">
                    <span className="sp-msg-emoji">🤖</span>
                    <div className="sp-message-content sp-typing">Thinking...</div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>
              <form onSubmit={handleChatSubmit} className="sp-chat-form">
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    type="text"
                    value={isListening && chatInterim ? chatInput + ' ' + chatInterim : chatInput}
                    onChange={e => { if (!isListening) setChatInput(e.target.value); }}
                    placeholder={isListening ? '🎙️ Listening… speak freely, tap 🔴 to stop' : (t['askAnything'] || 'Ask me anything...')}
                    className="sp-chat-input"
                    style={{ width: '100%', fontStyle: isListening && chatInterim ? 'italic' : 'normal', opacity: isListening && chatInterim ? 0.85 : 1 }}
                  />
                </div>
                <button
                  type="button"
                  title={isListening ? 'Tap to stop recording' : 'Tap to start — mic stays on until you tap again'}
                  onClick={() => isListening ? stopListening() : startListening(twoPersonMode)}
                  style={{ background: isListening ? 'var(--sp-accent-coral)' : 'var(--sp-bg-tertiary)', border: `1px solid ${isListening ? 'var(--sp-accent-coral)' : 'var(--sp-border-color)'}`, borderRadius: 8, padding: '0.6rem 0.8rem', cursor: 'pointer', color: 'var(--sp-text-primary)', animation: isListening ? 'spPulse 1s infinite' : 'none', flexShrink: 0 }}>
                  {isListening ? '🔴' : '🎤'}
                </button>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.8rem', color: 'var(--sp-text-secondary)' }}>
                  <input type="checkbox" checked={twoPersonMode} onChange={e => { setTwoPersonMode(e.target.checked); if (!e.target.checked) stopListening(); }} />
                  Two-person AI
                </label>
                <button type="submit" className="sp-btn-primary" disabled={mentorMutation.isPending} style={{ padding: '0.7rem 1.2rem' }}>{t['send'] || 'Send'}</button>
              </form>
              <div style={{ padding: '0.3rem 1rem 0.5rem', fontSize: '0.75rem', color: 'var(--sp-text-secondary)' }}>
                {isSpeaking ? '🔊 Speaking...' : isListening ? '🔴 Recording — speak as long as you need, tap the mic button to stop' : twoPersonMode ? 'Two-person: AI listens → replies → speaks → repeats' : 'Tap 🎤 to speak — mic stays active until you tap again'}
              </div>
            </>
          )}

          {view === 'performance' && (
            <PerformanceView
              newTestAlert={newTestAlert}
              onAlertDismissed={() => setNewTestAlert(null)}
            />
          )}

          {view === 'tests' && (
            <TestsView
              pendingTopic={pendingTestTopic}
              onTopicHandled={() => setPendingTestTopic(null)}
              onTestRecorded={(topic, score) => {
                setNewTestAlert({ topic, score });
                setView('performance');
              }}
            />
          )}

          {view === 'resume' && <ResumeView profile={profile} />}

          {view === 'jobs' && <JobsView profile={profile} />}

          {view === 'history' && <HistoryView />}
        </div>
      </div>
    </div>
    </CopilotKit>
  );
}
