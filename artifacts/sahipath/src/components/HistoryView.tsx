import React, { useState, useEffect } from 'react';

interface Session {
  id: string;
  title: string;
  createdAt: string;
}

interface Message {
  role: string;
  text: string;
  createdAt?: string;
}

export function HistoryView() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [loadingMsgs, setLoadingMsgs] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/mentor/sessions', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setSessions(Array.isArray(data.sessions) ? data.sessions : []);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchSessions(); }, []);

  const toggleSession = async (sessionId: string) => {
    if (expandedId === sessionId) { setExpandedId(null); return; }
    setExpandedId(sessionId);
    if (messages[sessionId]) return;
    setLoadingMsgs(sessionId);
    try {
      const res = await fetch(`/api/mentor/sessions/${sessionId}/messages`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setMessages(prev => ({ ...prev, [sessionId]: data.messages || [] }));
      }
    } catch {}
    setLoadingMsgs(null);
  };

  const deleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Delete this chat? This cannot be undone.')) return;
    setDeletingId(sessionId);
    try {
      await fetch(`/api/mentor/sessions/${sessionId}`, { method: 'DELETE', credentials: 'include' });
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      setMessages(prev => { const n = { ...prev }; delete n[sessionId]; return n; });
      if (expandedId === sessionId) setExpandedId(null);
    } catch {}
    setDeletingId(null);
  };

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) +
        ' · ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    } catch { return iso; }
  };

  if (loading) return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--sp-text-secondary)' }}>
      Loading chat history...
    </div>
  );

  return (
    <div style={{ padding: '1.5rem', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <h3 style={{ margin: 0 }}>📜 Chat History</h3>
        <div style={{ fontSize: '0.82rem', color: 'var(--sp-text-secondary)' }}>
          {sessions.length} conversation{sessions.length !== 1 ? 's' : ''} saved
        </div>
      </div>

      {sessions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--sp-bg-tertiary)', borderRadius: 10, color: 'var(--sp-text-secondary)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
          <div>No past conversations yet.</div>
          <div style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>Start chatting with your mentor to see history here.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {sessions.map(s => (
            <div key={s.id} style={{ background: 'var(--sp-bg-tertiary)', borderRadius: 10, border: `1px solid ${expandedId === s.id ? 'var(--sp-accent-teal)' : 'var(--sp-border-color)'}`, overflow: 'hidden', transition: 'border-color 0.2s' }}>
              <div
                onClick={() => toggleSession(s.id)}
                style={{ padding: '0.9rem 1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    💬 {s.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--sp-text-secondary)', marginTop: '0.2rem' }}>
                    {formatDate(s.createdAt)}
                    {messages[s.id] && ` · ${messages[s.id].length} message${messages[s.id].length !== 1 ? 's' : ''}`}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                  <button
                    onClick={e => deleteSession(s.id, e)}
                    disabled={deletingId === s.id}
                    style={{ background: 'transparent', border: '1px solid var(--sp-accent-coral)', borderRadius: 6, padding: '0.3rem 0.6rem', color: 'var(--sp-accent-coral)', cursor: 'pointer', fontSize: '0.75rem' }}
                    title="Delete this chat"
                  >
                    {deletingId === s.id ? '...' : '🗑️'}
                  </button>
                  <span style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}>
                    {expandedId === s.id ? '▲' : '▼'}
                  </span>
                </div>
              </div>

              {expandedId === s.id && (
                <div style={{ borderTop: '1px solid var(--sp-border-color)', maxHeight: '400px', overflowY: 'auto' }}>
                  {loadingMsgs === s.id ? (
                    <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}>Loading messages...</div>
                  ) : (messages[s.id] || []).length === 0 ? (
                    <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}>No messages found.</div>
                  ) : (
                    <div style={{ padding: '0.8rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {(messages[s.id] || []).map((m, i) => (
                        <div key={i} style={{
                          display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
                          flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                        }}>
                          <div style={{ fontSize: '1rem', flexShrink: 0, marginTop: '0.1rem' }}>
                            {m.role === 'user' ? '👤' : '🤖'}
                          </div>
                          <div style={{
                            background: m.role === 'user' ? 'rgba(0,212,212,0.12)' : 'var(--sp-bg-secondary)',
                            border: `1px solid ${m.role === 'user' ? 'rgba(0,212,212,0.3)' : 'var(--sp-border-color)'}`,
                            borderRadius: 10, padding: '0.6rem 0.8rem', fontSize: '0.85rem',
                            maxWidth: '85%', lineHeight: 1.5, color: 'var(--sp-text-primary)',
                            whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                          }}>
                            {m.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
