import React, { useState, useEffect } from 'react';
import { useGetTests, useRecordTest } from '@workspace/api-client-react';

interface Notification {
  id: string;
  topic: string;
  scheduledAt: number;
}

interface TestsViewProps {
  pendingTopic?: string | null;
  onTopicHandled?: () => void;
}

export function TestsView({ pendingTopic, onTopicHandled }: TestsViewProps) {
  const { data: testsData, refetch } = useGetTests();
  const recordMutation = useRecordTest();
  const [form, setForm] = useState({ name: pendingTopic || '', score: '', notes: '' });
  const [upcoming, setUpcoming] = useState<Notification[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (pendingTopic) setForm(f => ({ ...f, name: pendingTopic }));
  }, [pendingTopic]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sp_upcoming_tests');
      if (saved) setUpcoming(JSON.parse(saved));
    } catch {}
  }, []);

  const dismissNotification = (id: string) => {
    const next = upcoming.filter(u => u.id !== id);
    setUpcoming(next);
    localStorage.setItem('sp_upcoming_tests', JSON.stringify(next));
    if (id === pendingTopic && onTopicHandled) onTopicHandled();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const score = parseFloat(form.score);
    if (!form.name.trim()) { setSubmitError('Test name is required'); return; }
    if (isNaN(score) || score < 0 || score > 100) { setSubmitError('Score must be between 0 and 100'); return; }

    try {
      await recordMutation.mutateAsync({ data: { name: form.name.trim(), score, notes: form.notes.trim() } });
      setForm({ name: '', score: '', notes: '' });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
      refetch();
      if (pendingTopic && form.name === pendingTopic && onTopicHandled) onTopicHandled();
    } catch (err: any) {
      setSubmitError(err?.data?.error || 'Failed to record test');
    }
  };

  const tests = (testsData as any)?.tests || [];
  const average = tests.length > 0 ? Math.round(tests.reduce((acc: number, t: any) => acc + t.score, 0) / tests.length) : null;

  return (
    <div style={{ padding: '1.5rem', overflowY: 'auto', height: '100%' }}>
      {upcoming.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: 'var(--sp-accent-orange)', marginBottom: '0.8rem' }}>
            🔔 Upcoming Tests ({upcoming.length})
          </h3>
          {upcoming.map(n => (
            <div key={n.id} style={{
              background: 'rgba(255, 140, 66, 0.1)',
              border: '1px solid var(--sp-accent-orange)',
              borderRadius: 8,
              padding: '0.8rem 1rem',
              marginBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <strong>Test due:</strong> {n.topic}
                <div style={{ fontSize: '0.8rem', color: 'var(--sp-text-secondary)', marginTop: '0.2rem' }}>
                  Scheduled {new Date(n.scheduledAt).toLocaleString()}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="sp-btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                  onClick={() => {
                    setForm(f => ({ ...f, name: n.topic }));
                    dismissNotification(n.id);
                  }}>Take Test</button>
                <button className="sp-btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                  onClick={() => dismissNotification(n.id)}>Dismiss</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'var(--sp-bg-tertiary)', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--sp-accent-teal)' }}>{tests.length}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--sp-text-secondary)' }}>Total Tests</div>
        </div>
        <div style={{ background: 'var(--sp-bg-tertiary)', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: average !== null && average >= 60 ? 'var(--sp-accent-teal)' : 'var(--sp-accent-coral)' }}>
            {average !== null ? `${average}%` : '—'}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--sp-text-secondary)' }}>Average Score</div>
        </div>
      </div>

      <div style={{ background: 'var(--sp-bg-tertiary)', borderRadius: 8, padding: '1.2rem', marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', marginTop: 0 }}>+ Record a Test</h3>
        {pendingTopic && (
          <div style={{ padding: '0.5rem', background: 'rgba(0,212,212,0.1)', borderRadius: 6, marginBottom: '0.8rem', fontSize: '0.85rem', color: 'var(--sp-accent-teal)' }}>
            📚 You studied <strong>{pendingTopic}</strong> — take a test to track progress!
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <input
            type="text"
            placeholder="Topic / Test Name (e.g. React Hooks)"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            style={{ background: 'var(--sp-bg-secondary)', border: '1px solid var(--sp-border-color)', borderRadius: 6, padding: '0.6rem', color: 'var(--sp-text-primary)' }}
            required
          />
          <input
            type="number"
            placeholder="Score (0–100)"
            value={form.score}
            min={0}
            max={100}
            onChange={e => setForm(f => ({ ...f, score: e.target.value }))}
            style={{ background: 'var(--sp-bg-secondary)', border: '1px solid var(--sp-border-color)', borderRadius: 6, padding: '0.6rem', color: 'var(--sp-text-primary)' }}
            required
          />
          <input
            type="text"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            style={{ background: 'var(--sp-bg-secondary)', border: '1px solid var(--sp-border-color)', borderRadius: 6, padding: '0.6rem', color: 'var(--sp-text-primary)' }}
          />
          {submitError && <div style={{ color: 'var(--sp-accent-coral)', fontSize: '0.85rem' }}>{submitError}</div>}
          {submitSuccess && <div style={{ color: 'var(--sp-accent-teal)', fontSize: '0.85rem' }}>✓ Test recorded successfully!</div>}
          <button type="submit" className="sp-btn-primary" disabled={recordMutation.isPending} style={{ padding: '0.7rem' }}>
            {recordMutation.isPending ? 'Recording...' : 'Record Test'}
          </button>
        </form>
      </div>

      <h3 style={{ marginBottom: '0.8rem' }}>Test History</h3>
      {tests.length === 0 ? (
        <div style={{ color: 'var(--sp-text-secondary)', textAlign: 'center', padding: '2rem', background: 'var(--sp-bg-tertiary)', borderRadius: 8 }}>
          No tests recorded yet. Start studying and track your progress!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {tests.map((t: any) => (
            <div key={t.id} style={{
              background: 'var(--sp-bg-tertiary)',
              borderRadius: 8,
              padding: '0.8rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderLeft: `3px solid ${t.score >= 70 ? 'var(--sp-accent-teal)' : t.score >= 50 ? 'var(--sp-accent-orange)' : 'var(--sp-accent-coral)'}`,
            }}>
              <div>
                <div style={{ fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sp-text-secondary)' }}>
                  {t.date ? new Date(t.date).toLocaleDateString() : 'No date'}
                  {t.notes ? ` · ${t.notes}` : ''}
                </div>
              </div>
              <div style={{
                fontWeight: 700,
                fontSize: '1.2rem',
                color: t.score >= 70 ? 'var(--sp-accent-teal)' : t.score >= 50 ? 'var(--sp-accent-orange)' : 'var(--sp-accent-coral)',
              }}>
                {t.score}%
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
