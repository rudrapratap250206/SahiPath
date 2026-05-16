import React from 'react';
import { useGetTests } from '@workspace/api-client-react';

export function PerformanceView() {
  const { data: testsData, isLoading } = useGetTests();
  const tests = (testsData as any)?.tests || [];

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
  }));

  return (
    <div style={{ padding: '1.5rem', overflowY: 'auto', height: '100%' }}>
      <h3 style={{ marginTop: 0, marginBottom: '1.2rem' }}>Performance Summary</h3>

      {isLoading ? (
        <div style={{ color: 'var(--sp-text-secondary)' }}>Loading...</div>
      ) : tests.length === 0 ? (
        <div style={{ color: 'var(--sp-text-secondary)', textAlign: 'center', padding: '3rem', background: 'var(--sp-bg-tertiary)', borderRadius: 8 }}>
          No tests yet. Record your first test to see performance analytics!
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {topicStats.sort((a, b) => b.avg - a.avg).map(ts => (
                  <div key={ts.topic} style={{ background: 'var(--sp-bg-tertiary)', borderRadius: 8, padding: '0.8rem 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{ts.topic}</span>
                      <span style={{ color: ts.avg >= 70 ? 'var(--sp-accent-teal)' : ts.avg >= 50 ? 'var(--sp-accent-orange)' : 'var(--sp-accent-coral)', fontWeight: 700 }}>
                        {ts.avg}% avg
                      </span>
                    </div>
                    <div style={{ background: 'var(--sp-bg-secondary)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${ts.avg}%`,
                        background: ts.avg >= 70 ? 'linear-gradient(90deg, var(--sp-accent-teal), var(--sp-accent-orange))' : 'var(--sp-accent-coral)',
                        transition: 'width 0.5s ease',
                        borderRadius: 4,
                      }} />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--sp-text-secondary)', marginTop: '0.3rem' }}>
                      {ts.count} attempt{ts.count !== 1 ? 's' : ''} · Best: {ts.best}%
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.8rem' }}>Score Timeline</h3>
          <div style={{ background: 'var(--sp-bg-tertiary)', borderRadius: 8, padding: '1rem', display: 'flex', alignItems: 'flex-end', gap: 6, height: 120, overflowX: 'auto' }}>
            {tests.slice().reverse().map((t: any, i: number) => (
              <div key={t.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 32, flex: 1 }} title={`${t.name}: ${t.score}%`}>
                <div style={{ fontSize: '0.6rem', color: 'var(--sp-text-secondary)', marginBottom: 2 }}>{t.score}%</div>
                <div style={{
                  width: '100%',
                  height: `${t.score}%`,
                  background: t.score >= 70 ? 'var(--sp-accent-teal)' : t.score >= 50 ? 'var(--sp-accent-orange)' : 'var(--sp-accent-coral)',
                  borderRadius: '3px 3px 0 0',
                  minHeight: 4,
                  maxHeight: 90,
                  transition: 'height 0.5s ease',
                }} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
