import React, { useState, useEffect, useRef } from 'react';
import { careerData, translations, languageInfo } from './lib/data';
import { RAGSystem, UserProfile } from './lib/rag';
import { useMentorChat, useRegister, useLogin, useLogout, useSaveProfile, useRecordTest } from '@workspace/api-client-react';

export default function App() {
  const [language, setLanguage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [twoPersonMode, setTwoPersonMode] = useState(false);
  const [view, setView] = useState<'chat'|'performance'|'tests'|'resume'|'jobs'|'media'>('chat');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [stage, setStage] = useState<'language' | 'personal' | 'professional' | 'mentor'>('language');
  const [ragSystem, setRagSystem] = useState<RAGSystem | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    location: '',
    educationLevel: "Bachelor's",
    currentRole: '',
    yearsOfExperience: '',
  });

  const [professionalData, setProfessionalData] = useState({
    skills: '',
    careerInterests: '',
    currentGoals: '',
    challenges: '',
    availableHoursPerWeek: '',
    preferredLearningStyle: 'Interactive',
  });

  const [chatMessages, setChatMessages] = useState<Array<{ role: string; text: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const recognitionRef = useRef<any>(null);
  const voiceConversationRef = useRef(false);
  const pendingVoiceReplyRef = useRef(false);

  const mentorChatMutation = useMentorChat();
  const registerMutation = useRegister();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const saveProfileMutation = useSaveProfile();
  const recordTestMutation = useRecordTest();

  const t = language && translations[language] ? translations[language] : null;

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleLanguageSelect = (selectedLang: string) => {
    setLanguage(selectedLang);
    const rag = new RAGSystem();
    setRagSystem(rag);
    setStage('personal');
  };

  const speakText = (text: string) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = language === 'Hindi' ? 'hi-IN' : language === 'Tamil' ? 'ta-IN' : 'en-US';
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => {
      setIsSpeaking(false);
      if (voiceConversationRef.current && twoPersonMode) {
        setTimeout(() => {
          if (!recognitionRef.current) startListening(true);
        }, 250);
      }
    };
    synth.cancel();
    synth.speak(utter);
  };

  const stopListening = () => {
    voiceConversationRef.current = false;
    pendingVoiceReplyRef.current = false;
    setIsListening(false);
    try { recognitionRef.current?.stop?.(); } catch {}
    recognitionRef.current = null;
  };

  const startListening = async (autoSend = false) => {
    const w: any = window as any;
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert('Speech recognition not supported in this browser'); return; }
    const recog = new SpeechRecognition();
    recog.lang = language === 'Hindi' ? 'hi-IN' : language === 'Tamil' ? 'ta-IN' : 'en-US';
    recog.interimResults = false;
    recog.continuous = twoPersonMode;
    recog.maxAlternatives = 1;
    recog.onresult = async (e: any) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      if (!transcript) return;
      if (twoPersonMode && autoSend) {
        pendingVoiceReplyRef.current = true;
        setChatInput(transcript);
        recog.stop();
        await handleChatSubmitWithMessage(transcript, 'voice');
        return;
      }
      setChatInput(prev => (prev ? prev + ' ' + transcript : transcript));
    };
    recog.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
      if (twoPersonMode && voiceConversationRef.current && pendingVoiceReplyRef.current) {
        pendingVoiceReplyRef.current = false;
      }
    };
    recog.onerror = () => {
      setIsListening(false);
      recognitionRef.current = null;
      pendingVoiceReplyRef.current = false;
    };
    recognitionRef.current = recog;
    setIsListening(true);
    recog.start();
  };

  const sendMentorMessage = async (userMsg: string, source: 'text' | 'voice') => {
    if (!ragSystem) return;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    const profile = ragSystem.getUserProfile();

    try {
      const data = await mentorChatMutation.mutateAsync({
        data: { message: userMsg, profile: profile as any, mode: source === 'voice' ? 'voice' : 'text' }
      });
      const reply = data.reply || 'No reply returned.';
      setChatMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      if (twoPersonMode && source === 'voice') speakText(reply);
    } catch (err: any) {
      const fallback = err?.data?.error || err?.message || 'Unable to generate reply';
      setChatMessages(prev => [...prev, { role: 'assistant', text: fallback }]);
    }
  };

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalData.firstName || !personalData.email || !personalData.currentRole) {
      alert(t?.['alert_fillRequired'] || 'Please fill all required fields');
      return;
    }
    setStage('professional');
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sahipath_profile');
      if (saved) {
        const profile = JSON.parse(saved);
        const rag = new RAGSystem();
        rag.setUserProfile(profile);
        setRagSystem(rag);
        setLanguage(profile.language);
        setStage('mentor');
        const welcome = rag.generateResponse(`Welcome back ${profile.firstName}`, careerData);
        setChatMessages([{ role: 'assistant', text: welcome }]);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (stage !== 'mentor') return;
    if (twoPersonMode) {
      voiceConversationRef.current = true;
      if (!recognitionRef.current && !isListening) void startListening(true);
    } else {
      stopListening();
    }
  }, [twoPersonMode, stage]);

  const handleProfessionalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!professionalData.skills || !professionalData.careerInterests || !professionalData.currentGoals) {
      alert(t?.['alert_fillRequired'] || 'Please fill all required fields');
      return;
    }

    const userProfile: UserProfile = {
      language: language!,
      firstName: personalData.firstName,
      lastName: personalData.lastName,
      age: parseInt(personalData.age) || 0,
      email: personalData.email,
      location: personalData.location,
      educationLevel: personalData.educationLevel,
      currentRole: personalData.currentRole,
      yearsOfExperience: parseInt(personalData.yearsOfExperience) || 0,
      skills: professionalData.skills.split(',').map(s => s.trim()),
      careerInterests: professionalData.careerInterests.split(',').map(s => s.trim()),
      currentGoals: professionalData.currentGoals,
      challenges: professionalData.challenges,
      availableHoursPerWeek: parseInt(professionalData.availableHoursPerWeek) || 0,
      preferredLearningStyle: professionalData.preferredLearningStyle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (ragSystem) ragSystem.setUserProfile(userProfile);

    try { localStorage.setItem('sahipath_profile', JSON.stringify(userProfile)); } catch {}
    try { saveProfileMutation.mutate({ data: userProfile as any }); } catch {}

    const welcomeMsg = ragSystem?.generateResponse(`Hello, I'm ${personalData.firstName}. I'm starting my career journey.`, careerData);
    setChatMessages([{ role: 'assistant', text: welcomeMsg || `Welcome ${personalData.firstName}! I'm your AI career mentor.` }]);
    setStage('mentor');
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !ragSystem) return;
    const userMsg = chatInput;
    setChatInput('');
    await sendMentorMessage(userMsg, 'text');
  };

  const handleChatSubmitWithMessage = async (userMsg: string, source: 'text' | 'voice') => {
    if (!ragSystem) return;
    await sendMentorMessage(userMsg, source);
    setChatInput('');
  };

  // STAGE: Language Selection
  if (stage === 'language') {
    const allLanguages = Object.keys(languageInfo);
    const indianLanguages = allLanguages.filter(lang => (languageInfo as any)[lang].region === 'India');
    const globalLanguages = allLanguages.filter(lang => (languageInfo as any)[lang].region === 'Global');

    return (
      <div className="sp-container sp-welcome">
        <div className="sp-card sp-language-selection">
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button className="sp-btn-secondary" onClick={() => setShowLogin(true)}>Sign in</button>
            <button className="sp-btn-primary" onClick={() => setShowRegister(true)}>Register</button>
          </div>

          {showLogin && (
            <div style={{ marginTop: '1rem', textAlign: 'left', padding: '1rem', borderRadius: 8, background: 'var(--sp-bg-tertiary)' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Sign in</h3>
              <label style={{ fontSize: '0.9rem', color: 'var(--sp-text-secondary)' }}>Email</label>
              <input style={{ width: '100%', marginBottom: '0.6rem', padding: '0.6rem', borderRadius: 6, background: 'var(--sp-bg-secondary)', border: '1px solid var(--sp-border-color)', color: 'var(--sp-text-primary)' }} type="email" placeholder="you@domain.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
              <label style={{ fontSize: '0.9rem', color: 'var(--sp-text-secondary)' }}>Password</label>
              <input style={{ width: '100%', marginBottom: '0.6rem', padding: '0.6rem', borderRadius: 6, background: 'var(--sp-bg-secondary)', border: '1px solid var(--sp-border-color)', color: 'var(--sp-text-primary)' }} placeholder="Password" type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} />
              {authError && <div style={{ color: 'var(--sp-accent-coral)', marginBottom: '0.6rem' }}>{authError}</div>}
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <button className="sp-btn-primary" disabled={loginMutation.isPending || !authEmail || !authPassword} onClick={async () => {
                  setAuthError(null);
                  try {
                    const data = await loginMutation.mutateAsync({ data: { email: authEmail, password: authPassword } });
                    const profile = (data as any).user?.profile;
                    if (profile) {
                      const rag = new RAGSystem();
                      rag.setUserProfile(profile);
                      setRagSystem(rag);
                      setLanguage(profile.language || 'English');
                      setStage('mentor');
                      localStorage.setItem('sahipath_profile', JSON.stringify(profile));
                    }
                    setShowLogin(false);
                  } catch (err: any) {
                    setAuthError(err?.data?.error || 'Login failed');
                  }
                }}>{loginMutation.isPending ? 'Signing in...' : 'Sign in'}</button>
                <button className="sp-btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => { setShowLogin(false); setAuthError(null); }}>Cancel</button>
              </div>
            </div>
          )}

          {showRegister && (
            <div style={{ marginTop: '1rem', textAlign: 'left', padding: '1rem', borderRadius: 8, background: 'var(--sp-bg-tertiary)' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Create account</h3>
              <label style={{ fontSize: '0.9rem', color: 'var(--sp-text-secondary)' }}>Email</label>
              <input style={{ width: '100%', marginBottom: '0.6rem', padding: '0.6rem', borderRadius: 6, background: 'var(--sp-bg-secondary)', border: '1px solid var(--sp-border-color)', color: 'var(--sp-text-primary)' }} type="email" placeholder="you@domain.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
              <label style={{ fontSize: '0.9rem', color: 'var(--sp-text-secondary)' }}>Password</label>
              <input style={{ width: '100%', marginBottom: '0.6rem', padding: '0.6rem', borderRadius: 6, background: 'var(--sp-bg-secondary)', border: '1px solid var(--sp-border-color)', color: 'var(--sp-text-primary)' }} placeholder="Choose a strong password" type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} />
              {authError && <div style={{ color: 'var(--sp-accent-coral)', marginBottom: '0.6rem' }}>{authError}</div>}
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <button className="sp-btn-primary" disabled={registerMutation.isPending || !authEmail || !authPassword} onClick={async () => {
                  setAuthError(null);
                  try {
                    const basicProfile = { language: language || 'English', firstName: '', lastName: '', email: authEmail, currentRole: '', yearsOfExperience: 0, skills: [], careerInterests: [], currentGoals: '', challenges: '', availableHoursPerWeek: 0, preferredLearningStyle: 'Interactive', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
                    await registerMutation.mutateAsync({ data: { email: authEmail, password: authPassword, profile: basicProfile } });
                    alert('Registered successfully — you can sign in now.');
                    setShowRegister(false);
                  } catch (err: any) {
                    setAuthError(err?.data?.error || 'Register failed');
                  }
                }}>{registerMutation.isPending ? 'Creating...' : 'Create account'}</button>
                <button className="sp-btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => { setShowRegister(false); setAuthError(null); }}>Cancel</button>
              </div>
            </div>
          )}

          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, var(--sp-accent-teal), var(--sp-accent-orange))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              🚀 SahiPath
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--sp-text-secondary)', marginBottom: '1rem' }}>
              Your Personal AI Career Mentor
            </p>
          </div>

          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.3rem' }}>🌍 Choose Your Language</h2>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--sp-text-secondary)', marginBottom: '1rem' }}>
              🇮🇳 Languages from India
            </h3>
            <div className="sp-language-grid">
              {indianLanguages.map(lang => (
                <button key={lang} onClick={() => handleLanguageSelect(lang)} className="sp-language-btn">
                  <div className="sp-lang-emoji">{(languageInfo as any)[lang].emoji}</div>
                  <div className="sp-lang-name">{lang}</div>
                  <div className="sp-lang-subtitle">{(languageInfo as any)[lang].nativeName}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--sp-text-secondary)', marginBottom: '1rem' }}>
              🌎 Languages Worldwide
            </h3>
            <div className="sp-language-grid">
              {globalLanguages.map(lang => (
                <button key={lang} onClick={() => handleLanguageSelect(lang)} className="sp-language-btn">
                  <div className="sp-lang-emoji">{(languageInfo as any)[lang].emoji}</div>
                  <div className="sp-lang-name">{lang}</div>
                  <div className="sp-lang-subtitle">{(languageInfo as any)[lang].nativeName}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!language || !t) return null;

  // STAGE: Personal Details
  if (stage === 'personal') {
    return (
      <div className="sp-container sp-form-container">
        <div className="sp-card sp-form-card">
          <h1>👤 {t['personal_details'] || 'Personal Details'}</h1>
          <p className="sp-form-subtitle">{t['tell_us_about'] || 'Tell us about yourself'}</p>
          <form onSubmit={handlePersonalSubmit} className="sp-form">
            <div className="sp-form-row">
              <input type="text" placeholder={t['firstName'] || 'First Name *'} value={personalData.firstName} onChange={e => setPersonalData({ ...personalData, firstName: e.target.value })} required />
              <input type="text" placeholder={t['lastName'] || 'Last Name'} value={personalData.lastName} onChange={e => setPersonalData({ ...personalData, lastName: e.target.value })} />
            </div>
            <div className="sp-form-row">
              <input type="number" placeholder={t['age'] || 'Age'} value={personalData.age} onChange={e => setPersonalData({ ...personalData, age: e.target.value })} />
              <input type="email" placeholder={t['email'] || 'Email *'} value={personalData.email} onChange={e => setPersonalData({ ...personalData, email: e.target.value })} required />
            </div>
            <div className="sp-form-row">
              <input type="text" placeholder={t['location'] || 'Location'} value={personalData.location} onChange={e => setPersonalData({ ...personalData, location: e.target.value })} />
              <select value={personalData.educationLevel} onChange={e => setPersonalData({ ...personalData, educationLevel: e.target.value })}>
                <option>{t['edu_highschool'] || 'High School'}</option>
                <option>{t['edu_bachelor'] || "Bachelor's"}</option>
                <option>{t['edu_master'] || "Master's"}</option>
                <option>{t['edu_phd'] || 'PhD'}</option>
              </select>
            </div>
            <div className="sp-form-row">
              <input type="text" placeholder={t['currentRole'] || 'Current Role *'} value={personalData.currentRole} onChange={e => setPersonalData({ ...personalData, currentRole: e.target.value })} required />
              <input type="number" placeholder={t['yearsExp'] || 'Years of Experience'} value={personalData.yearsOfExperience} onChange={e => setPersonalData({ ...personalData, yearsOfExperience: e.target.value })} />
            </div>
            <button type="submit" className="sp-btn-primary sp-form-btn">{t['next'] || 'Next'} →</button>
          </form>
        </div>
      </div>
    );
  }

  // STAGE: Professional Details
  if (stage === 'professional') {
    return (
      <div className="sp-container sp-form-container">
        <div className="sp-card sp-form-card">
          <h1>💼 {t['professional_details'] || 'Professional Details'}</h1>
          <p className="sp-form-subtitle">{t['career_info'] || 'Tell us about your career goals'}</p>
          <form onSubmit={handleProfessionalSubmit} className="sp-form">
            <textarea placeholder={t['skills'] || 'Skills (comma-separated) *'} value={professionalData.skills} onChange={e => setProfessionalData({ ...professionalData, skills: e.target.value })} required rows={2} />
            <textarea placeholder={t['interests'] || 'Career Interests (comma-separated) *'} value={professionalData.careerInterests} onChange={e => setProfessionalData({ ...professionalData, careerInterests: e.target.value })} required rows={2} />
            <textarea placeholder={t['goals'] || 'Current Goals *'} value={professionalData.currentGoals} onChange={e => setProfessionalData({ ...professionalData, currentGoals: e.target.value })} required rows={2} />
            <textarea placeholder={t['challenges'] || 'Challenges'} value={professionalData.challenges} onChange={e => setProfessionalData({ ...professionalData, challenges: e.target.value })} rows={2} />
            <div className="sp-form-row">
              <input type="number" placeholder={t['hoursPerWeek'] || 'Hours available per week'} value={professionalData.availableHoursPerWeek} onChange={e => setProfessionalData({ ...professionalData, availableHoursPerWeek: e.target.value })} />
              <select value={professionalData.preferredLearningStyle} onChange={e => setProfessionalData({ ...professionalData, preferredLearningStyle: e.target.value })}>
                <option>Interactive</option>
                <option>Visual</option>
                <option>Reading</option>
                <option>Practice-based</option>
              </select>
            </div>
            <div className="sp-form-buttons">
              <button type="button" onClick={() => setStage('personal')} className="sp-btn-secondary sp-form-btn">← {t['back'] || 'Back'}</button>
              <button type="submit" className="sp-btn-primary sp-form-btn">{t['startMentoring'] || 'Start Mentoring'} →</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // STAGE: Mentor
  if (stage === 'mentor') {
    const profile = ragSystem?.getUserProfile();

    return (
      <div className="sp-container sp-mentor-main">
        <div className="sp-mentor-header">
          <h1>🤖 {t['mentorChat'] || 'AI Career Mentor'} - <span style={{ color: 'var(--sp-accent-teal)' }}>{profile?.firstName} {profile?.lastName}</span></h1>
          <p className="sp-mentor-subtitle">{t['rag_intro'] || '24/7 AI Assistant powered by your personal career context'}</p>
        </div>

        <div className="sp-mentor-layout">
          <div className="sp-mentor-sidebar">
            <div className="sp-card sp-profile-card">
              <h3>📋 {t['profile_summary'] || 'Your Profile'}</h3>
              <ul className="sp-profile-list">
                <li><strong>{t['role'] || 'Role'}:</strong> {profile?.currentRole}</li>
                <li><strong>{t['yearsExp'] || 'Experience'}:</strong> {profile?.yearsOfExperience} {t['years'] || 'years'}</li>
                <li><strong>{t['goals'] || 'Goals'}:</strong> {profile?.currentGoals}</li>
                <li><strong>{t['hoursPerWeek'] || 'Hours/Week'}:</strong> {profile?.availableHoursPerWeek} {t['hours'] || 'hours'}</li>
                <li><strong>{t['learningStyle'] || 'Learning Style'}:</strong> {profile?.preferredLearningStyle}</li>
              </ul>
              <h3 style={{ marginTop: '1.5rem' }}>🎯 {t['skills'] || 'Skills'}</h3>
              <div className="sp-skills-tags">
                {profile?.skills.map(skill => <span key={skill} className="sp-skill-tag">{skill}</span>)}
              </div>
              <div style={{ marginTop: '1rem', display: 'grid', gap: '0.6rem' }}>
                {(['chat', 'performance', 'tests', 'resume', 'jobs', 'media'] as const).map(v => (
                  <button key={v} onClick={() => setView(v)} className={`sp-btn-secondary${view === v ? ' sp-btn-active' : ''}`}>
                    {v === 'chat' ? '💬 Chat' : v === 'performance' ? '📈 Performance' : v === 'tests' ? '📝 Tests' : v === 'resume' ? '📄 Resume' : v === 'jobs' ? '💼 Jobs' : '🎙️ Media'}
                  </button>
                ))}
                <button onClick={() => {
                  logoutMutation.mutate({});
                  setStage('language');
                  setLanguage(null);
                  setRagSystem(null);
                  localStorage.removeItem('sahipath_profile');
                }} className="sp-btn-secondary">🔄 {t['restart'] || 'Restart'}</button>
              </div>
            </div>
          </div>

          <div className="sp-mentor-chat">
            <div className="sp-chat-messages">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`sp-message sp-message-${msg.role}`}>
                  <span className="sp-msg-emoji">{msg.role === 'assistant' ? '🤖' : '👤'}</span>
                  <div className="sp-message-content">{msg.text}</div>
                </div>
              ))}
              {mentorChatMutation.isPending && (
                <div className="sp-message sp-message-assistant">
                  <span className="sp-msg-emoji">🤖</span>
                  <div className="sp-message-content sp-typing">Thinking...</div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {view === 'chat' && (
              <>
                <form onSubmit={handleChatSubmit} className="sp-chat-form">
                  <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder={t['askAnything'] || 'Ask me anything...'} className="sp-chat-input" />
                  <button type="button" onClick={() => startListening(twoPersonMode)} className="sp-btn-secondary" title={twoPersonMode ? 'Start or stop two-person voice chat' : 'Use microphone'} style={{ marginRight: '0.5rem' }}>
                    {isListening ? '🎤 Listening...' : twoPersonMode ? '🎤 Voice Chat' : '🎤'}
                  </button>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    <input type="checkbox" checked={twoPersonMode} onChange={e => { setTwoPersonMode(e.target.checked); if (!e.target.checked) stopListening(); }} />
                    Two-person AI
                  </label>
                  <button type="submit" className="sp-btn-primary" disabled={mentorChatMutation.isPending}>{t['send'] || 'Send'}</button>
                </form>
                <div style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', color: 'var(--sp-text-secondary)' }}>
                  {twoPersonMode ? 'Two-person AI will listen and speak while the tab stays open.' : 'Typed or mic-transcribed messages return text only.'}
                </div>
              </>
            )}

            {view === 'performance' && (
              <div style={{ padding: '1rem', overflowY: 'auto' }}>
                <h3>Performance Summary</h3>
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}>{JSON.stringify(ragSystem?.getPerformanceSummary(), null, 2)}</pre>
              </div>
            )}

            {view === 'tests' && (
              <div style={{ padding: '1rem', overflowY: 'auto' }}>
                <h3>Test Records</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!ragSystem) return;
                  const rec = ragSystem.recordTestResult({ name: 'Sample Test', score: 80 });
                  try {
                    await recordTestMutation.mutateAsync({ data: { name: rec.name, score: rec.score } });
                    setChatMessages(prev => [...prev, { role: 'assistant', text: `Recorded test: ${rec.name} (${rec.score})` }]);
                  } catch {}
                }}>
                  <button className="sp-btn-primary" type="submit">Record Sample Test</button>
                </form>
                <div style={{ marginTop: '1rem' }}>
                  <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}>{JSON.stringify(ragSystem?.getTestHistory(), null, 2)}</pre>
                </div>
              </div>
            )}

            {view === 'resume' && (
              <div style={{ padding: '1rem' }}>
                <h3>Resume Builder</h3>
                <button className="sp-btn-primary" onClick={() => {
                  if (!profile) return;
                  const resume = `Resume - ${profile.firstName} ${profile.lastName}\nRole: ${profile.currentRole}\nExperience: ${profile.yearsOfExperience} years\nSkills: ${profile.skills.join(', ')}\nGoals: ${profile.currentGoals}`;
                  const blob = new Blob([resume], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${profile.firstName}_${profile.lastName}_resume.txt`;
                  a.click();
                }}>Generate Resume (TXT)</button>
                <button className="sp-btn-secondary" style={{ marginLeft: '0.6rem' }} onClick={() => alert('To enable PDF resume generation, install jspdf.')}>Generate Resume (PDF)</button>
              </div>
            )}

            {view === 'jobs' && (
              <div style={{ padding: '1rem' }}>
                <h3>Job / Internship Suggestions</h3>
                <button className="sp-btn-primary" onClick={() => {
                  const jobs = ragSystem?.suggestJobs(careerData) || [];
                  setChatMessages(prev => [...prev, { role: 'assistant', text: `Found ${jobs.length} suggested roles:\n${jobs.map((j: any) => `• ${j.role} (${j.type}) — ${j.path}`).join('\n')}` }]);
                  setView('chat');
                }}>Suggest Jobs</button>
              </div>
            )}

            {view === 'media' && (
              <div style={{ padding: '1rem' }}>
                <h3>AI Media (Podcast / Image / Video)</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button className="sp-btn-secondary" onClick={async () => {
                    try {
                      const data = await fetch('/api/media', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'podcast', prompt: 'Short career advice podcast' }) }).then(r => r.json());
                      setChatMessages(prev => [...prev, { role: 'assistant', text: `Podcast generated: ${data.note || data.url ? 'ready' : 'failed'}` }]);
                      if (data?.url?.startsWith('data:audio')) {
                        const a = document.createElement('audio'); a.src = data.url; a.controls = true; a.autoplay = false;
                        const w = window.open('', '_blank'); if (w) { w.document.write('<h3>Podcast</h3>'); w.document.body.appendChild(a); }
                      }
                    } catch { setChatMessages(prev => [...prev, { role: 'assistant', text: 'Media generation failed. Check OPENAI_API_KEY is set.' }]); }
                  }}>Generate Podcast</button>
                  <button className="sp-btn-secondary" onClick={async () => {
                    try {
                      const data = await fetch('/api/media', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'image', prompt: 'Professional career banner' }) }).then(r => r.json());
                      if (data?.url?.startsWith('data:image') || data?.url?.startsWith('https')) {
                        const w = window.open(''); if (w) { const img = w.document.createElement('img'); img.src = data.url; img.style.maxWidth = '100%'; w.document.body.appendChild(img); }
                      }
                      setChatMessages(prev => [...prev, { role: 'assistant', text: `Image generated: ${data.url ? 'ready' : data.error || 'failed'}` }]);
                    } catch { setChatMessages(prev => [...prev, { role: 'assistant', text: 'Image generation failed. Check OPENAI_API_KEY is set.' }]); }
                  }}>Generate Image</button>
                  <button className="sp-btn-secondary" onClick={() => setChatMessages(prev => [...prev, { role: 'assistant', text: 'Video generation requires a third-party service. Contact support to enable.' }])}>Generate Video</button>
                  <button className="sp-btn-secondary" onClick={() => alert('To enable PPTX generation, install pptxgenjs.')}>Generate PPTX</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
