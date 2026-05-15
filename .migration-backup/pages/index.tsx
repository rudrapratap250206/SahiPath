import React, { useState, useEffect, useRef } from 'react';
import { careerData, translations, languageInfo } from '../lib/data';
import { RAGSystem, UserProfile } from '../lib/rag';

export default function Home() {
  const [language, setLanguage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [twoPersonMode, setTwoPersonMode] = useState(false);
  const [view, setView] = useState<'chat'|'performance'|'tests'|'resume'|'jobs'|'media'>('chat');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [stage, setStage] = useState<'language' | 'personal' | 'professional' | 'mentor'>('language');
  const [ragSystem, setRagSystem] = useState<RAGSystem | null>(null);
  
  // Personal details form
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    location: '',
    educationLevel: 'Bachelor\'s',
    currentRole: '',
    yearsOfExperience: '',
  });

  // Professional details form
  const [professionalData, setProfessionalData] = useState({
    skills: '',
    careerInterests: '',
    currentGoals: '',
    challenges: '',
    availableHoursPerWeek: '',
    preferredLearningStyle: 'Interactive',
  });

  // Mentor stage
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; text: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const recognitionRef = useRef<any>(null);
  const voiceConversationRef = useRef(false);
  const pendingVoiceReplyRef = useRef(false);

  const t = language && translations[language] ? translations[language] : null;

  // Handle language selection
  const handleLanguageSelect = (selectedLang: string) => {
    setLanguage(selectedLang);
    const rag = new RAGSystem();
    setRagSystem(rag);
    setStage('personal');
  };

  // Speech recognition (browser) - simple wrapper
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
    try {
      recognitionRef.current?.stop?.();
    } catch (err) {
      console.warn('Failed to stop speech recognition', err);
    }
    recognitionRef.current = null;
  };

  const startListening = async (autoSend = false) => {
    const w: any = window as any;
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser');
      return;
    }
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
      const response = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, profile, mode: source === 'voice' ? 'voice' : 'text' }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Unable to generate reply');
      }

      const reply = data.reply || 'No reply returned.';
      setChatMessages(prev => [...prev, { role: 'assistant', text: reply }]);

      if (twoPersonMode && source === 'voice') {
        speakText(reply);
      }
    } catch (err: any) {
      const fallback = err?.message || 'Unable to generate reply';
      setChatMessages(prev => [...prev, { role: 'assistant', text: fallback }]);
    }
  };

  // Handle personal details submission
  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalData.firstName || !personalData.email || !personalData.currentRole) {
      alert(t?.['alert_fillRequired'] || 'Please fill all required fields');
      return;
    }
    setStage('professional');
  };

  // Load saved profile and tests from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sahipath_profile');
      const savedTests = localStorage.getItem('sahipath_tests');
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
      if (savedTests && ragSystem) {
        const tests = JSON.parse(savedTests);
        tests.forEach((t: any) => {
          ragSystem.recordTestResult(t);
        });
      }
    } catch (err) {
      console.warn('Failed to load saved profile', err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stage !== 'mentor') return;
    if (twoPersonMode) {
      voiceConversationRef.current = true;
      if (!recognitionRef.current && !isListening) {
        void startListening(true);
      }
    } else {
      stopListening();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twoPersonMode, stage]);

  // Handle professional details submission
  const handleProfessionalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !professionalData.skills ||
      !professionalData.careerInterests ||
      !professionalData.currentGoals
    ) {
      alert(t?.['alert_fillRequired'] || 'Please fill all required fields');
      return;
    }

    // Create user profile
    const userProfile: UserProfile = {
      language: language!,
      firstName: personalData.firstName,
      lastName: personalData.lastName,
      age: parseInt(personalData.age),
      email: personalData.email,
      location: personalData.location,
      educationLevel: personalData.educationLevel,
      currentRole: personalData.currentRole,
      yearsOfExperience: parseInt(personalData.yearsOfExperience),
      skills: professionalData.skills.split(',').map(s => s.trim()),
      careerInterests: professionalData.careerInterests.split(',').map(s => s.trim()),
      currentGoals: professionalData.currentGoals,
      challenges: professionalData.challenges,
      availableHoursPerWeek: parseInt(professionalData.availableHoursPerWeek),
      preferredLearningStyle: professionalData.preferredLearningStyle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Set profile in RAG system
    if (ragSystem) {
      ragSystem.setUserProfile(userProfile);
      setRagSystem(ragSystem);
    }

    // Persist profile locally
    try {
      localStorage.setItem('sahipath_profile', JSON.stringify(userProfile));
    } catch (err) {
      console.warn('Failed to save profile', err);
    }
    // Also persist on server
    try {
      fetch('/api/profile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userProfile) });
    } catch (err) {
      console.warn('Failed to save profile to server', err);
    }

    // Initialize welcome message from RAG
    const welcomeMsg = ragSystem?.generateResponse(
      `Hello, I'm ${personalData.firstName}. I'm starting my career journey.`,
      careerData,
    );
    
    setChatMessages([
      {
        role: 'assistant',
        text: welcomeMsg || `Welcome ${personalData.firstName}! I'm your AI career mentor. I've reviewed your profile and I'm here to help you achieve your goals!`,
      },
    ]);

    setStage('mentor');
  };

  // Handle chat submission
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

  // Stage 1: Language Selection
  if (stage === 'language') {
    const allLanguages = Object.keys(languageInfo);
    const indianLanguages = allLanguages.filter(lang => languageInfo[lang].region === 'India');
    const globalLanguages = allLanguages.filter(lang => languageInfo[lang].region === 'Global');

    return (
      <div className="container welcome">
        <div className="card language-selection">
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button className="btn-secondary" onClick={() => setShowLogin(true)}>Sign in</button>
            <button className="btn-primary" onClick={() => setShowRegister(true)}>Register</button>
          </div>

          {showLogin && (
            <div style={{ marginTop: '1rem', textAlign: 'left', padding: '1rem', borderRadius: 8, background: 'var(--bg-tertiary)' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Sign in</h3>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label>
              <input style={{ width: '100%', marginBottom: '0.6rem', padding: '0.6rem', borderRadius: 6 }} type="email" placeholder="you@domain.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Password</label>
              <input style={{ width: '100%', marginBottom: '0.6rem', padding: '0.6rem', borderRadius: 6 }} placeholder="Password" type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} />
              {authError && <div style={{ color: 'var(--accent-coral)', marginBottom: '0.6rem' }}>{authError}</div>}
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <button className="btn-primary" disabled={authLoading || !authEmail || !authPassword} onClick={async () => {
                  setAuthError(null);
                  setAuthLoading(true);
                  try {
                    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: authEmail, password: authPassword }) });
                    const data = await res.json();
                    if (!res.ok) {
                      setAuthError(data?.error || 'Login failed');
                      setAuthLoading(false);
                      return;
                    }
                    const profile = data.user.profile;
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
                    console.error(err);
                    setAuthError('Login error');
                  } finally {
                    setAuthLoading(false);
                  }
                }}>{authLoading ? 'Signing in...' : 'Sign in'}</button>
                <button className="btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => { setShowLogin(false); setAuthError(null); }}>Cancel</button>
              </div>
            </div>
          )}

          {showRegister && (
            <div style={{ marginTop: '1rem', textAlign: 'left', padding: '1rem', borderRadius: 8, background: 'var(--bg-tertiary)' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Create account</h3>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label>
              <input style={{ width: '100%', marginBottom: '0.6rem', padding: '0.6rem', borderRadius: 6 }} type="email" placeholder="you@domain.com" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Password</label>
              <input style={{ width: '100%', marginBottom: '0.6rem', padding: '0.6rem', borderRadius: 6 }} placeholder="Choose a strong password" type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} />
              {authError && <div style={{ color: 'var(--accent-coral)', marginBottom: '0.6rem' }}>{authError}</div>}
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <button className="btn-primary" disabled={authLoading || !authEmail || !authPassword} onClick={async () => {
                  setAuthError(null);
                  setAuthLoading(true);
                  try {
                    const basicProfile = { language: language || 'English', firstName: '', lastName: '', email: authEmail, currentRole: '', yearsOfExperience: 0, skills: [], careerInterests: [], currentGoals: '', challenges: '', availableHoursPerWeek: 0, preferredLearningStyle: 'Interactive', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
                    const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: authEmail, password: authPassword, profile: basicProfile }) });
                    const data = await res.json();
                    if (!res.ok) {
                      setAuthError(data?.error || 'Register failed');
                      setAuthLoading(false);
                      return;
                    }
                    alert('Registered successfully — you can sign in now.');
                    setShowRegister(false);
                  } catch (err: any) { console.error(err); setAuthError('Register error'); }
                  finally { setAuthLoading(false); }
                }}>{authLoading ? 'Creating...' : 'Create account'}</button>
                <button className="btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => { setShowRegister(false); setAuthError(null); }}>Cancel</button>
              </div>
            </div>
          )}
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#2563eb' }}>
              🚀 SahiPath
            </h1>
            <p style={{ fontSize: '1rem', color: '#666', marginBottom: '1rem' }}>
              Your Personal AI Career Mentor
            </p>
          </div>

          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
            🌍 Choose Your Language
          </h2>

          {/* Indian Languages Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ textAlign: 'center', fontSize: '1rem', color: '#555', marginBottom: '1rem' }}>
              🇮🇳 Languages from India
            </h3>
            <div className="language-grid">
              {indianLanguages.map(lang => (
                <button
                  key={lang}
                  onClick={() => handleLanguageSelect(lang)}
                  className="language-btn"
                >
                  <div className="lang-emoji">{languageInfo[lang].emoji}</div>
                  <div className="lang-name">{lang}</div>
                  <div className="lang-subtitle">{languageInfo[lang].nativeName}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Global Languages Section */}
          <div>
            <h3 style={{ textAlign: 'center', fontSize: '1rem', color: '#555', marginBottom: '1rem' }}>
              🌎 Languages Worldwide
            </h3>
            <div className="language-grid">
              {globalLanguages.map(lang => (
                <button
                  key={lang}
                  onClick={() => handleLanguageSelect(lang)}
                  className="language-btn"
                >
                  <div className="lang-emoji">{languageInfo[lang].emoji}</div>
                  <div className="lang-name">{lang}</div>
                  <div className="lang-subtitle">{languageInfo[lang].nativeName}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!language || !t) return null;

  // Stage 2: Personal Details
  if (stage === 'personal') {
    return (
      <div className="container form-container">
        <div className="card form-card">
          <h1>👤 {t['personal_details'] || 'Personal Details'}</h1>
          <p className="form-subtitle">
            {t['tell_us_about'] || 'Tell us about yourself so we can personalize your experience'}
          </p>

          <form onSubmit={handlePersonalSubmit} className="form">
            <div className="form-row">
              <input
                type="text"
                placeholder={t['firstName'] || 'First Name *'}
                value={personalData.firstName}
                onChange={e => setPersonalData({ ...personalData, firstName: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder={t['lastName'] || 'Last Name'}
                value={personalData.lastName}
                onChange={e => setPersonalData({ ...personalData, lastName: e.target.value })}
              />
            </div>

            <div className="form-row">
              <input
                type="number"
                placeholder={t['age'] || 'Age'}
                value={personalData.age}
                onChange={e => setPersonalData({ ...personalData, age: e.target.value })}
              />
              <input
                type="email"
                placeholder={t['email'] || 'Email *'}
                value={personalData.email}
                onChange={e => setPersonalData({ ...personalData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder={t['location'] || 'Location (City/Country)'}
                value={personalData.location}
                onChange={e => setPersonalData({ ...personalData, location: e.target.value })}
              />
              <select
                value={personalData.educationLevel}
                onChange={e => setPersonalData({ ...personalData, educationLevel: e.target.value })}
              >
                <option>{t['edu_highschool'] || 'High School'}</option>
                <option>{t['edu_bachelor'] || "Bachelor's"}</option>
                <option>{t['edu_master'] || "Master's"}</option>
                <option>{t['edu_phd'] || 'PhD'}</option>
              </select>
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder={t['currentRole'] || 'Current Role/Job Title *'}
                value={personalData.currentRole}
                onChange={e => setPersonalData({ ...personalData, currentRole: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder={t['yearsExp'] || 'Years of Experience'}
                value={personalData.yearsOfExperience}
                onChange={e => setPersonalData({ ...personalData, yearsOfExperience: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-primary form-btn">
              {t['next'] || 'Next'} →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Stage 3: Professional Details
  if (stage === 'professional') {
    return (
      <div className="container form-container">
        <div className="card form-card">
          <h1>💼 {t['professional_details'] || 'Professional Details'}</h1>
          <p className="form-subtitle">
            {t['career_info'] || 'Help us understand your career goals and learning preferences'}
          </p>

          <form onSubmit={handleProfessionalSubmit} className="form">
            <textarea
              placeholder={t['skills'] || 'Skills (comma-separated) e.g., JavaScript, Python, React *'}
              value={professionalData.skills}
              onChange={e => setProfessionalData({ ...professionalData, skills: e.target.value })}
              required
              rows={2}
            />

            <textarea
              placeholder={
                t['interests'] ||
                'Career Interests (comma-separated) e.g., Frontend, Data Science, AI *'
              }
              value={professionalData.careerInterests}
              onChange={e =>
                setProfessionalData({ ...professionalData, careerInterests: e.target.value })
              }
              required
              rows={2}
            />

            <textarea
              placeholder={t['goals'] || 'Current Goals (What do you want to achieve?) *'}
              value={professionalData.currentGoals}
              onChange={e => setProfessionalData({ ...professionalData, currentGoals: e.target.value })}
              required
              rows={2}
            />

            <textarea
              placeholder={
                t['challenges'] || 'Challenges (What\'s holding you back? e.g., time management, learning pace)'
              }
              value={professionalData.challenges}
              onChange={e =>
                setProfessionalData({ ...professionalData, challenges: e.target.value })
              }
              rows={2}
            />

            <div className="form-row">
              <input
                type="number"
                placeholder={t['hoursPerWeek'] || 'Hours available per week'}
                value={professionalData.availableHoursPerWeek}
                onChange={e =>
                  setProfessionalData({ ...professionalData, availableHoursPerWeek: e.target.value })
                }
              />
              <select
                value={professionalData.preferredLearningStyle}
                onChange={e =>
                  setProfessionalData({
                    ...professionalData,
                    preferredLearningStyle: e.target.value,
                  })
                }
              >
                <option>Interactive</option>
                <option>Visual</option>
                <option>Reading</option>
                <option>Practice-based</option>
              </select>
            </div>

            <div className="form-buttons">
              <button
                type="button"
                onClick={() => setStage('personal')}
                className="btn-secondary form-btn"
              >
                ← {t['back'] || 'Back'}
              </button>
              <button type="submit" className="btn-primary form-btn">
                {t['startMentoring'] || 'Start Mentoring'} →
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Stage 4: Mentor with RAG AI
  if (stage === 'mentor') {
    const profile = ragSystem?.getUserProfile();

    return (
      <div className="container mentor-main">
        <div className="mentor-header">
          <h1>
            🤖 {t['mentorChat'] || 'AI Career Mentor'} -
            <span style={{ color: 'var(--accent-teal)' }}>
              {' '}{profile?.firstName} {profile?.lastName}
            </span>
          </h1>
          <p className="mentor-subtitle">
            {t['rag_intro'] || '24/7 AI Assistant powered by your personal career context'}
          </p>
        </div>

        <div className="mentor-layout">
          <div className="mentor-sidebar">
            <div className="card profile-card">
              <h3>📋 {t['profile_summary'] || 'Your Profile'}</h3>
              <ul className="profile-list">
                <li>
                  <strong>{t['role'] || 'Role'}:</strong> {profile?.currentRole}
                </li>
                <li>
                  <strong>{t['yearsExp'] || 'Experience'}:</strong> {profile?.yearsOfExperience} {t['years'] || 'years'}
                </li>
                <li>
                  <strong>{t['goals'] || 'Goals'}:</strong> {profile?.currentGoals}
                </li>
                <li>
                  <strong>{t['hoursPerWeek'] || 'Hours/Week'}:</strong> {profile?.availableHoursPerWeek} {t['hours'] || 'hours'}
                </li>
                <li>
                  <strong>{t['learningStyle'] || 'Learning Style'}:</strong> {profile?.preferredLearningStyle}
                </li>
              </ul>

              <h3 style={{ marginTop: '1.5rem' }}>🎯 {t['skills'] || 'Skills'}</h3>
              <div className="skills-tags">
                {profile?.skills.map(skill => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: '1rem', display: 'grid', gap: '0.6rem' }}>
                <button onClick={() => setView('chat')} className="btn-secondary">💬 Chat</button>
                <button onClick={() => setView('performance')} className="btn-secondary">📈 Performance</button>
                <button onClick={() => setView('tests')} className="btn-secondary">📝 Tests</button>
                <button onClick={() => setView('resume')} className="btn-secondary">📄 Resume</button>
                <button onClick={() => setView('jobs')} className="btn-secondary">💼 Jobs</button>
                <button onClick={() => setView('media')} className="btn-secondary">🎙️ Media</button>
                <button
                  onClick={() => {
                    setStage('language');
                    setLanguage(null);
                    setRagSystem(null);
                  }}
                  className="btn-secondary"
                  style={{ width: '100%' }}
                >
                  🔄 {t['restart'] || 'Restart'}
                </button>
              </div>
            </div>
          </div>

          <div className="mentor-chat">
            <div className="chat-messages">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  {msg.role === 'assistant' && <span className="emoji">🤖</span>}
                  {msg.role === 'user' && <span className="emoji">👤</span>}
                  <div className="message-content">{msg.text}</div>
                </div>
              ))}
            </div>

            {view === 'chat' && (
              <>
                <form onSubmit={handleChatSubmit} className="chat-form">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder={t['askAnything'] || 'Ask me anything...'}
                    className="chat-input"
                  />
                  <button
                    type="button"
                    onClick={() => startListening(twoPersonMode)}
                    className="btn-secondary"
                    title={twoPersonMode ? 'Start or stop two-person voice chat' : 'Use microphone to speak your question'}
                    style={{ marginRight: '0.5rem' }}
                  >
                    {isListening ? '🎤 Listening...' : twoPersonMode ? '🎤 Voice Chat' : '🎤'}
                  </button>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={twoPersonMode}
                      onChange={e => {
                        const enabled = e.target.checked;
                        setTwoPersonMode(enabled);
                        if (!enabled) stopListening();
                      }}
                    />
                    Two-person AI
                  </label>
                  <button type="submit" className="btn-primary">
                    {t['send'] || 'Send'}
                  </button>
                </form>
                <div style={{ marginTop: '0.6rem', color: 'var(--text-secondary)' }}>
                  {twoPersonMode
                    ? 'Two-person AI will listen and speak while the tab stays open.'
                    : 'Typed or mic-transcribed messages return text only.'}
                </div>
              </>
            )}

            {view === 'performance' && (
              <div style={{ padding: '1rem' }}>
                <h3>Performance Summary</h3>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(ragSystem?.getPerformanceSummary(), null, 2)}</pre>
              </div>
            )}

            {view === 'tests' && (
              <div style={{ padding: '1rem' }}>
                <h3>Test Records</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!ragSystem) return;
                  const rec = ragSystem.recordTestResult({ name: 'Sample Test', score: 80 });
                  setChatMessages(prev => [...prev, { role: 'assistant', text: `Recorded test: ${rec.name} (${rec.score})` }]);
                    // persist tests locally and on server
                    try {
                      const tests = ragSystem.getTestHistory();
                      localStorage.setItem('sahipath_tests', JSON.stringify(tests));
                      fetch('/api/tests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rec) });
                    } catch (err) { console.warn('Failed to save tests', err); }
                }}>
                  <button className="btn-primary">Record Sample Test</button>
                </form>
                <div style={{ marginTop: '1rem' }}>
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(ragSystem?.getTestHistory(), null, 2)}</pre>
                </div>
              </div>
            )}


            {view === 'resume' && (
              <div style={{ padding: '1rem' }}>
                <h3>Resume Builder</h3>
                <button className="btn-primary" onClick={() => {
                  const profile = ragSystem?.getUserProfile();
                  if (!profile) return;
                  const resume = `Resume - ${profile.firstName} ${profile.lastName}\nRole: ${profile.currentRole}\nExperience: ${profile.yearsOfExperience} years\nSkills: ${profile.skills.join(', ')}\nGoals: ${profile.currentGoals}`;
                  const blob = new Blob([resume], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${profile.firstName}_${profile.lastName}_resume.txt`;
                  a.click();
                }}>Generate Resume (TXT)</button>
                <button className="btn-secondary" style={{ marginLeft: '0.6rem' }} onClick={() => {
                  const profile = ragSystem?.getUserProfile();
                  if (!profile) return alert('No profile');
                  // PDF generation is optional. Install `jspdf` to enable this feature:
                  alert('To enable PDF resume generation install: npm install jspdf then restart the dev server.');
                }}>Generate Resume (PDF)</button>
              </div>
            )}

            {view === 'jobs' && (
              <div style={{ padding: '1rem' }}>
                <h3>Job / Internship Suggestions</h3>
                <button className="btn-primary" onClick={() => {
                  const jobs = ragSystem?.suggestJobs(careerData) || [];
                  setChatMessages(prev => [...prev, { role: 'assistant', text: `Found ${jobs.length} suggested roles. Check sidebar for details.` }]);
                  // temporarily store as assistant message
                  setChatMessages(prev => [...prev, { role: 'assistant', text: JSON.stringify(jobs, null, 2) }]);
                }}>Suggest Jobs</button>
              </div>
            )}

            {view === 'media' && (
              <div style={{ padding: '1rem' }}>
                <h3>AI Media (Podcast / Image / Video / PPT)</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button className="btn-secondary" onClick={async () => {
                      const res = await fetch('/api/media', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'podcast', prompt: 'Short career advice podcast' }) });
                      const data = await res.json();
                      setChatMessages(prev => [...prev, { role: 'assistant', text: `Created podcast: ${data.url} ${data.note ? '- ' + data.note : ''}` }]);
                        if (data?.url && data.url.startsWith('data:audio')) {
                          // play audio in new window or create audio element
                          const a = document.createElement('audio');
                          a.src = data.url;
                          a.controls = true;
                          a.autoplay = false;
                          const w = window.open('', '_blank');
                          if (w) {
                            w.document.write('<h3>Podcast (generated)</h3>');
                            w.document.write('<p>Right-click and save the audio to download.</p>');
                            w.document.body.appendChild(a);
                          }
                        }
                        setChatMessages(prev => [...prev, { role: 'assistant', text: `Created podcast: ${data.url || data.note || 'generated'}` }]);
                    }}>Generate Podcast</button>
                    <button className="btn-secondary" onClick={async () => {
                        const res = await fetch('/api/media', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'image', prompt: 'Profile banner image' }) });
                        const data = await res.json();
                        // if data URL received, open in new tab
                        if (data?.url && data.url.startsWith('data:image')) {
                          const w = window.open('');
                          if (w) {
                            const img = w.document.createElement('img');
                            img.src = data.url;
                            img.style.maxWidth = '100%';
                            w.document.body.appendChild(img);
                          }
                        }
                        setChatMessages(prev => [...prev, { role: 'assistant', text: `Created image: ${data.url || data.note || 'generated'}` }]);
                      }}>Generate Image</button>
                    <button className="btn-secondary" onClick={async () => {
                        const res = await fetch('/api/media', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'video', prompt: 'Explainer video' }) });
                        const data = await res.json();
                        setChatMessages(prev => [...prev, { role: 'assistant', text: `Created video: ${data.url} ${data.note ? '- ' + data.note : ''}` }]);
                      }}>Generate Video</button>
                      <button className="btn-secondary" onClick={async () => {
                        // Generate PPTX client-side using pptxgenjs when available
                        // PPTX generation is optional. Install `pptxgenjs` to enable this feature:
                        alert('To enable PPTX generation install: npm install pptxgenjs then restart the dev server.');
                      }}>Generate PPTX</button>
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
