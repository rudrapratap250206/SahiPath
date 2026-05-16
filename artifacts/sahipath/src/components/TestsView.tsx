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
  const [upcoming, setUpcoming] = useState<Notification[]>([]);
  const [activeTest, setActiveTest] = useState<{ topic: string; notifId?: string } | null>(null);
  const [scoreInput, setScoreInput] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sp_upcoming_tests');
      if (saved) setUpcoming(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (pendingTopic) {
      setActiveTest({ topic: pendingTopic });
      setScoreInput('');
      setSubmitError(null);
    }
  }, [pendingTopic]);

  const dismissNotification = (id: string) => {
    const next = upcoming.filter(u => u.id !== id);
    setUpcoming(next);
    localStorage.setItem('sp_upcoming_tests', JSON.stringify(next));
  };

  const handleTakeTest = (topic: string, notifId?: string) => {
    setActiveTest({ topic, notifId });
    setScoreInput('');
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  const handleSubmitScore = async () => {
    if (!activeTest) return;
    setSubmitError(null);
    const score = parseFloat(scoreInput);
    if (isNaN(score) || score < 0 || score > 100) {
      setSubmitError('Please enter a score between 0 and 100');
      return;
    }

    try {
      await recordMutation.mutateAsync({
        data: {
          name: activeTest.topic,
          score,
          date: new Date().toISOString(),
        }
      });

      if (activeTest.notifId) dismissNotification(activeTest.notifId);
      if (onTopicHandled) onTopicHandled();
      setSubmitSuccess(`✅ Score recorded: ${score}/100 for "${activeTest.topic}"`);
      setActiveTest(null);
      setScoreInput('');
      refetch();
    } catch (err: any) {
      setSubmitError(err?.data?.error || 'Failed to record score. Please try again.');
    }
  };

  const tests = (testsData as any)?.tests || [];
  const average = tests.length > 0
    ? Math.round(tests.reduce((acc: number, t: any) => acc + t.score, 0) / tests.length)
    : null;

  return (
    <div style={{ padding: '1.5rem', overflowY: 'auto', height: '100%' }}>

      {submitSuccess && (
        <div style={{ marginBottom: '1rem', padding: '0.8rem 1rem', background: 'rgba(0,212,212,0.1)', border: '1px solid var(--sp-accent-teal)', borderRadius: 8, color: 'var(--sp-accent-teal)', fontSize: '0.9rem' }}>
          {submitSuccess}
        </div>
      )}

      {activeTest && (
        <div style={{ marginBottom: '1.5rem', padding: '1.2rem', background: 'var(--sp-bg-tertiary)', borderRadius: 10, border: '1px solid var(--sp-accent-teal)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '0.3rem' }}>📝 Record Test Result</h3>
          <div style={{ marginBottom: '1rem', padding: '0.5rem 0.8rem', background: 'rgba(0,212,212,0.08)', borderRadius: 6, fontSize: '0.9rem', color: 'var(--sp-accent-teal)' }}>
            Topic: <strong>{activeTest.topic}</strong>
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '120px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--sp-text-secondary)', marginBottom: '0.4rem' }}>Your Score (0–100)</label>
              <input
                type="number"
                placeholder="e.g. 85"
                value={scoreInput}
                min={0}
                max={100}
                autoFocus
                onChange={e => setScoreInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSubmitScore(); }}
                style={{ width: '100%', background: 'var(--sp-bg-secondary)', border: `1px solid ${submitError ? 'var(--sp-accent-coral)' : 'var(--sp-border-color)'}`, borderRadius: 6, padding: '0.65rem', color: 'var(--sp-text-primary)', fontSize: '1rem' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="sp-btn-primary"
                disabled={recordMutation.isPending}
                onClick={handleSubmitScore}
                style={{ padding: '0.65rem 1.2rem' }}
              >
                {recordMutation.isPending ? '⏳ Saving...' : '✅ Submit Score'}
              </button>
              <button
                className="sp-btn-secondary"
                onClick={() => { setActiveTest(null); setSubmitError(null); }}
                style={{ padding: '0.65rem 1rem' }}
              >
                Cancel
              </button>
            </div>
          </div>
          {submitError && <div style={{ marginTop: '0.5rem', color: 'var(--sp-accent-coral)', fontSize: '0.85rem' }}>{submitError}</div>}
        </div>
      )}

      {upcoming.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: 'var(--sp-accent-orange)', marginBottom: '0.8rem' }}>
            🔔 Pending Tests ({upcoming.length})
          </h3>
          {upcoming.map(n => (
            <div key={n.id} style={{
              background: 'rgba(255, 140, 66, 0.08)',
              border: '1px solid var(--sp-accent-orange)',
              borderRadius: 8, padding: '0.8rem 1rem', marginBottom: '0.5rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontWeight: 600 }}>{n.topic}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sp-text-secondary)', marginTop: '0.2rem' }}>
                  Added {new Date(n.scheduledAt).toLocaleString()}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="sp-btn-primary"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                  onClick={() => handleTakeTest(n.topic, n.id)}
                >
                  📝 Take Test
                </button>
                <button
                  className="sp-btn-secondary"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                  onClick={() => dismissNotification(n.id)}
                >
                  Dismiss
                </button>
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <h3 style={{ margin: 0 }}>Test History</h3>
      </div>

      {tests.length === 0 ? (
        <div style={{ color: 'var(--sp-text-secondary)', textAlign: 'center', padding: '2rem', background: 'var(--sp-bg-tertiary)', borderRadius: 8 }}>
          No tests recorded yet. Your mentor will suggest topics to test — click "📝 Take Test" when prompted!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {tests.map((t: any) => (
            <div key={t.id} style={{
              background: 'var(--sp-bg-tertiary)', borderRadius: 8, padding: '0.8rem 1rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderLeft: `3px solid ${t.score >= 70 ? 'var(--sp-accent-teal)' : t.score >= 50 ? 'var(--sp-accent-orange)' : 'var(--sp-accent-coral)'}`,
            }}>
              <div>
                <div style={{ fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sp-text-secondary)' }}>
                  {t.date ? new Date(t.date).toLocaleDateString() : 'No date'}
                  {t.notes ? ` · ${t.notes}` : ''}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: t.score >= 70 ? 'var(--sp-accent-teal)' : t.score >= 50 ? 'var(--sp-accent-orange)' : 'var(--sp-accent-coral)' }}>
                  {t.score}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
