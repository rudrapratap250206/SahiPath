import React, { useState, useRef } from 'react';

interface VoiceFillButtonProps {
  onTranscript: (text: string) => void;
  lang?: string;
  fieldName?: string;
}

export function VoiceFillButton({ onTranscript, lang = 'en-US', fieldName }: VoiceFillButtonProps) {
  const [listening, setListening] = useState(false);
  const recogRef = useRef<any>(null);

  const toggle = () => {
    const w: any = window;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) { alert('Speech recognition not supported in this browser'); return; }

    if (listening) {
      recogRef.current?.stop();
      setListening(false);
      return;
    }

    const recog = new SR();
    recog.lang = lang;
    recog.interimResults = false;
    recog.maxAlternatives = 1;
    recog.onresult = (e: any) => {
      const t = e.results[0][0].transcript.trim();
      onTranscript(t);
      setListening(false);
      recogRef.current = null;
    };
    recog.onerror = () => { setListening(false); recogRef.current = null; };
    recog.onend = () => { setListening(false); recogRef.current = null; };
    recogRef.current = recog;
    recog.start();
    setListening(true);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title={`Voice fill${fieldName ? ': ' + fieldName : ''}`}
      style={{
        background: listening ? 'var(--sp-accent-coral)' : 'var(--sp-bg-tertiary)',
        border: `1px solid ${listening ? 'var(--sp-accent-coral)' : 'var(--sp-border-color)'}`,
        borderRadius: 6,
        padding: '0.45rem 0.6rem',
        cursor: 'pointer',
        fontSize: '0.9rem',
        color: 'var(--sp-text-primary)',
        animation: listening ? 'spPulse 1s infinite' : 'none',
        flexShrink: 0,
      }}
    >
      🎤
    </button>
  );
}

interface VoiceRowProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  lang?: string;
  required?: boolean;
  as?: 'input' | 'textarea' | 'select';
  children?: React.ReactNode;
}

export function VoiceRow({ label, value, onChange, placeholder, type = 'text', lang = 'en-US', required, as: As = 'input', children }: VoiceRowProps) {
  return (
    <div style={{ display: 'flex', gap: '0.4rem', alignItems: As === 'textarea' ? 'flex-start' : 'center' }}>
      {As === 'textarea' ? (
        <textarea
          placeholder={placeholder || label}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          rows={2}
          style={{ flex: 1 }}
        />
      ) : As === 'select' ? (
        <select value={value} onChange={e => onChange(e.target.value)} style={{ flex: 1 }}>
          {children}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder || label}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          style={{ flex: 1 }}
        />
      )}
      {As !== 'select' && (
        <VoiceFillButton
          onTranscript={t => onChange(t)}
          lang={lang}
          fieldName={label}
        />
      )}
    </div>
  );
}
