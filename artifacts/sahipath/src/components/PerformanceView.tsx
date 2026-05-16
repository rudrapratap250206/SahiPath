import React, { useEffect, useState } from 'react';
import { useGetTests } from '@workspace/api-client-react';

interface PerformanceReview {
  message: string;
  type: 'good' | 'average' | 'needsWork';
}

interface PerformanceViewProps {
  newTestAlert?: { topic: string; score: number } | null;
  onAlertDismissed?: () => void;
}

function computeReview(tests: any[]): PerformanceReview | null {
  if (tests.length < 2) return null;
  const sorted = [...tests].sort((a, b) => new Date(a.date || a.createdAt || 0).getTime() - new Date(b.date || b.createdAt || 0).getTime());
  const recent3 = sorted.slice(-3);
  const prev3 = sorted.length >= 6 ? sorted.slice(-6, -3) : sorted.slice(0, Math.max(1, sorted.length - 3));
  const recentAvg = recent3.reduce((s, t) => s + t.score, 0) / recent3.length;
  const prevAvg = prev3.reduce((s, t) => s + t.score, 0) / prev3.length;
  const diff = recentAvg - prevAvg;

  if (recentAvg >= 75) {
    return { message: `Excellent! Your recent average is ${Math.round(recentAvg)}%. You're performing strongly — keep it up!`, type: 'good' };
  } else if (diff > 5) {
    return { message: `Great progress! Your scores improved by ${Math.round(diff)} points recently. Keep the momentum going!`, type: 'good' };
  } else if (diff < -5) {
    return { message: `Your scores dropped by ${Math.round(Math.abs(diff))} points recently. Review the topics where you scored below 60% and try again.`, type: 'needsWork' };
  } else if (recentAvg >= 60) {
    return { message: `You're in good shape with an average of ${Math.round(recentAvg)}%. Push to get above 80% consistently!`, type: 'average' };
  } else {
    return { message: `Your recent average is ${Math.round(recentAvg)}%. Focus on weak topics and try to score above 70%. You can do it!`, type: 'needsWork' };
  }
}

export function PerformanceView({ newTestAlert, onAlertDismissed }: PerformanceViewProps) {
  const { data: testsData, isLoading, refetch } = useGetTests();
  const tests = (testsData as any)?.tests || [];
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (newTestAlert) {
      setShowAlert(true);
      refetch();
    }
  }, [newTestAlert]);

  const average = tests.length > 0
    ? Math.round(tests.reduce((acc: number, t: any) => acc + t.score, 0) / tests.length)
    : null;

  const passing = tests.filter((t: any) => t.score >= 60).length;
  const failing = tests.filter((t: any) => t.score < 60).length;

  const byTopic = tests.reduce((acc: Record<string, number[]>, t: any) => {
    if (!acc[t.name]) acc[t.name] = [];
    acc[t.name].push(t.score);
    return acc;
  }, {});

  const topicStats = Object.entries(byTopic).map(([topic, scores]) => ({
    topic,
    avg: Math.round((scores as number[]).reduce((a, b) => a + b, 0) / (scores as number[]).length),
    count: (scores as number[]).length,
    best: Math.max(...(scores as number[])),
    latest: (scores as number[])[(scores as number[]).length - 1],
  }));

  const review = computeReview(tests);
  const reviewColorMap = { good: 'var(--sp-accent-teal)', average: 'var(--sp-accent-orange)', needsWork: 'var(--sp-accent-coral)' };

  return (
    <div style={{ padding: '1.5rem', overflowY: 'auto', height: '100%' }}>
      <h3 style={{ marginTop: 0, marginBottom: '1.2rem' }}>📈 Performance Dashboard</h3>

      {showAlert && newTestAlert && (
        <div style={{ marginBottom: '1.2rem', padding: '1rem', background: 'rgba(0,212,212,0.1)', border: '1px solid var(--sp-accent-teal)', borderRadius: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--sp-accent-teal)', marginBottom: '0.3rem' }}>
                ✅ Test Recorded: {newTestAlert.topic}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--sp-text-secondary)' }}>
                Score: <strong style={{ color: newTestAlert.score >= 70 ? 'var(--sp-accent-teal)' : newTestAlert.score >= 50 ? 'var(--sp-accent-orange)' : 'var(--sp-accent-coral)' }}>{newTestAlert.score}%</strong>
                {newTestAlert.score >= 80 ? ' — Excellent work! 🎉' : newTestAlert.score >= 60 ? ' — Good job, keep practicing!' : ' — Review this topic and try again soon.'}
              </div>
            </div>
            <button onClick={() => { setShowAlert(false); onAlertDismissed?.(); }} style={{ background: 'transparent', border: 'none', color: 'var(--sp-text-secondary)', cursor: 'pointer', fontSize: '1.1rem' }}>✕</button>
          </div>
        </div>
      )}

      {review && (
        <div style={{ marginBottom: '1.2rem', padding: '0.9rem 1rem', background: `${reviewColorMap[review.type]}18`, border: `1px solid ${reviewColorMap[review.type]}`, borderRadius: 10, fontSize: '0.88rem', color: 'var(--sp-text-primary)', lineHeight: 1.5 }}>
          <strong style={{ color: reviewColorMap[review.type] }}>
            {review.type === 'good' ? '🌟 ' : review.type === 'average' ? '📊 ' : '⚠️ '}
            Performance Review
          </strong>
          <div style={{ marginTop: '0.3rem' }}>{review.message}</div>
        </div>
      )}

      {isLoading ? (
        <div style={{ color: 'var(--sp-text-secondary)' }}>Loading...</div>
      ) : tests.length === 0 ? (
        <div style={{ color: 'var(--sp-text-secondary)', textAlign: 'center', padding: '3rem', background: 'var(--sp-bg-tertiary)', borderRadius: 8 }}>
          No tests yet. Complete a test to see your performance analytics!
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Tests Taken', value: tests.length, color: 'var(--sp-accent-teal)' },
              { label: 'Average Score', value: `${average}%`, color: average! >= 60 ? 'var(--sp-accent-teal)' : 'var(--sp-accent-coral)' },
              { label: 'Pass Rate', value: `${tests.length ? Math.round((passing / tests.length) * 100) : 0}%`, color: 'var(--sp-accent-orange)' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--sp-bg-tertiary)', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sp-text-secondary)', marginTop: '0.3rem' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--sp-bg-tertiary)', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--sp-accent-teal)' }}>{passing}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--sp-text-secondary)' }}>Passed (≥60%)</div>
            </div>
            <div style={{ background: 'var(--sp-bg-tertiary)', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--sp-accent-coral)' }}>{failing}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--sp-text-secondary)' }}>Needs Work (&lt;60%)</div>
            </div>
          </div>

          {topicStats.length > 0 && (
            <>
              <h3 style={{ marginBottom: '0.8rem' }}>Performance by Topic</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {topicStats.sort((a, b) => b.avg - a.avg).map(ts => (
                  <div key={ts.topic} style={{ background: 'var(--sp-bg-tertiary)', borderRadius: 8, padding: '0.8rem 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{ts.topic}</span>
                      <span style={{ color: ts.avg >= 70 ? 'var(--sp-accent-teal)' : ts.avg >= 50 ? 'var(--sp-accent-orange)' : 'var(--sp-accent-coral)', fontWeight: 700 }}>
                        {ts.avg}% avg
                      </span>
                    </div>
                    <div style={{ background: 'var(--sp-bg-secondary)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${ts.avg}%`, background: ts.avg >= 70 ? 'linear-gradient(90deg, var(--sp-accent-teal), var(--sp-accent-orange))' : 'var(--sp-accent-coral)', transition: 'width 0.5s ease', borderRadius: 4 }} />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--sp-text-secondary)', marginTop: '0.3rem' }}>
                      {ts.count} attempt{ts.count !== 1 ? 's' : ''} · Best: {ts.best}%
                      {ts.avg < 60 && <span style={{ color: 'var(--sp-accent-coral)', marginLeft: '0.5rem' }}>⚠️ Needs review</span>}
                      {ts.avg >= 80 && <span style={{ color: 'var(--sp-accent-teal)', marginLeft: '0.5rem' }}>✅ Strong</span>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <h3 style={{ marginBottom: '0.8rem' }}>Score Timeline</h3>
          <div style={{ background: 'var(--sp-bg-tertiary)', borderRadius: 8, padding: '1rem', display: 'flex', alignItems: 'flex-end', gap: 6, height: 120, overflowX: 'auto' }}>
            {tests.slice().reverse().map((t: any, i: number) => (
              <div key={t.id || i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 32, flex: 1 }} title={`${t.name}: ${t.score}%`}>
                <div style={{ fontSize: '0.6rem', color: 'var(--sp-text-secondary)', marginBottom: 2 }}>{t.score}%</div>
                <div style={{ width: '100%', height: `${t.score}%`, background: t.score >= 70 ? 'var(--sp-accent-teal)' : t.score >= 50 ? 'var(--sp-accent-orange)' : 'var(--sp-accent-coral)', borderRadius: '3px 3px 0 0', minHeight: 4, maxHeight: 90, transition: 'height 0.5s ease' }} />
              </div>
            ))}
          </div>

          {topicStats.filter(ts => ts.avg < 60).length > 0 && (
            <div style={{ marginTop: '1.2rem', padding: '0.9rem 1rem', background: 'rgba(255,107,107,0.08)', border: '1px solid var(--sp-accent-coral)', borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: 'var(--sp-accent-coral)', marginBottom: '0.4rem' }}>⚠️ Topics Needing Attention</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {topicStats.filter(ts => ts.avg < 60).map(ts => (
                  <span key={ts.topic} style={{ background: 'rgba(255,107,107,0.15)', border: '1px solid var(--sp-accent-coral)', borderRadius: 12, padding: '0.2rem 0.6rem', fontSize: '0.78rem', color: 'var(--sp-accent-coral)' }}>
                    {ts.topic} ({ts.avg}%)
                  </span>
                ))}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--sp-text-secondary)', marginTop: '0.5rem' }}>
                Ask your AI mentor for focused study help on these topics.
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
