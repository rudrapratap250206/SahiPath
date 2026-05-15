import React, { useState, useRef } from 'react';

interface VoiceFillButtonProps {
  onTranscript: (text: string) => void;
  lang?: string;
  fieldName?: string;
}

export function VoiceFillButton({ onTranscript, lang = 'en-US', fieldName }: VoiceFillButtonProps) {
  const [listening, setListening] = useState(false);
  const recogRef = useRef<any>(null);
  const listeningRef = useRef(false);
  const accumulatedRef = useRef('');

  const stop = () => {
    listeningRef.current = false;
    setListening(false);
    try { recogRef.current?.stop(); } catch {}
    recogRef.current = null;
    accumulatedRef.current = '';
  };

  const start = () => {
    const w: any = window;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) { alert('Speech recognition not supported in this browser'); return; }

    accumulatedRef.current = '';
    const recog = new SR();
    recog.lang = lang;
    recog.continuous = true;
    recog.interimResults = true;
    recog.maxAlternatives = 1;

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
      accumulatedRef.current = finals;
      onTranscript((finals + (interim ? ' ' + interim : '')).trim());
    };

    recog.onerror = (e: any) => {
      if (e.error === 'no-speech') return;
      stop();
    };

    recog.onend = () => {
      if (listeningRef.current) {
        try { recog.start(); } catch {}
      } else {
        setListening(false);
        recogRef.current = null;
      }
    };

    recogRef.current = recog;
    listeningRef.current = true;
    setListening(true);
    recog.start();
  };

  const toggle = () => {
    if (listening) {
      stop();
    } else {
      start();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title={listening ? `Stop recording${fieldName ? ' ' + fieldName : ''}` : `Speak${fieldName ? ': ' + fieldName : ''} — mic stays on until you tap again`}
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
        position: 'relative',
      }}
    >
      {listening ? '🔴' : '🎤'}
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
