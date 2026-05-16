import React, { useState, useEffect } from 'react';
import { useGetTests } from '@workspace/api-client-react';
import { UserProfile } from '../lib/rag';

interface Session {
  topic: string;
  type: 'study' | 'practice' | 'review' | 'project' | 'rest';
  durationMinutes: number;
  description: string;
  resources?: string;
}

interface DayPlan {
  day: string;
  date: string | null;
  totalMinutes: number;
  tip: string;
  sessions: Session[];
}

interface StudyPlan {
  planTitle: string;
  totalHours: number;
  focus: string;
  days: DayPlan[];
}

interface StudyPlanViewProps {
  profile: UserProfile | null;
}

const SESSION_COLORS: Record<string, { bg: string; border: string; label: string; emoji: string }> = {
  study:    { bg: 'rgba(0,212,212,0.1)',    border: 'var(--sp-accent-teal)',   label: 'Study',    emoji: '📖' },
  practice: { bg: 'rgba(255,140,66,0.1)',   border: 'var(--sp-accent-orange)', label: 'Practice', emoji: '💻' },
  review:   { bg: 'rgba(150,120,255,0.1)',  border: '#9678ff',                 label: 'Review',   emoji: '🔁' },
  project:  { bg: 'rgba(80,200,120,0.1)',   border: '#50c878',                 label: 'Project',  emoji: '🛠️' },
  rest:     { bg: 'rgba(160,160,180,0.08)', border: 'var(--sp-border-color)',  label: 'Rest',     emoji: '😴' },
};

function formatDuration(mins: number) {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function StudyPlanView({ profile }: StudyPlanViewProps) {
  const { data: testsData } = useGetTests();
  const tests = (testsData as any)?.tests || [];

  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sp_study_plan');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPlan(parsed.plan);
        setGeneratedAt(parsed.generatedAt);
      }
    } catch {}
  }, []);

  const getWeakTopics = () => {
    const byTopic: Record<string, number[]> = {};
    for (const t of tests) {
      if (!byTopic[t.name]) byTopic[t.name] = [];
      byTopic[t.name].push(t.score);
    }
    return Object.entries(byTopic)
      .map(([topic, scores]) => ({ topic, avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) }))
      .filter(t => t.avg < 75)
      .sort((a, b) => a.avg - b.avg);
  };

  const generatePlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const weakTopics = getWeakTopics();
      const res = await fetch('/api/studyplan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          weakTopics,
          availableHoursPerWeek: profile?.availableHoursPerWeek || 10,
          goals: profile?.currentGoals || '',
          skills: profile?.skills || [],
          currentRole: profile?.currentRole || '',
          preferredLearningStyle: profile?.preferredLearningStyle || '',
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Generation failed. Please try again.'); return; }
      setPlan(data.plan);
      setGeneratedAt(data.generatedAt);
      localStorage.setItem('sp_study_plan', JSON.stringify({ plan: data.plan, generatedAt: data.generatedAt }));
      setExpandedDay(data.plan.days[0]?.day || null);
    } catch {
      setError('Network error. Please check your connection and try again.');
    }
    setLoading(false);
  };

  const weakTopics = getWeakTopics();

  const totalHoursInPlan = plan
    ? Math.round(plan.days.reduce((s, d) => s + (d.totalMinutes || d.sessions.reduce((ss, se) => ss + se.durationMinutes, 0)), 0) / 60 * 10) / 10
    : 0;

  return (
    <div style={{ padding: '1.5rem', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.8rem' }}>
        <div>
          <h3 style={{ margin: 0 }}>📅 Smart Study Planner</h3>
          {generatedAt && (
            <div style={{ fontSize: '0.75rem', color: 'var(--sp-text-secondary)', marginTop: '0.3rem' }}>
              Last generated: {new Date(generatedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
        <button
          className="sp-btn-primary"
          onClick={generatePlan}
          disabled={loading}
          style={{ padding: '0.6rem 1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          {loading ? '⏳ Generating...' : plan ? '🔄 Regenerate Plan' : '✨ Generate My Plan'}
        </button>
      </div>

      {error && (
        <div style={{ marginBottom: '1rem', padding: '0.8rem 1rem', background: 'rgba(255,107,107,0.1)', border: '1px solid var(--sp-accent-coral)', borderRadius: 8, color: 'var(--sp-accent-coral)', fontSize: '0.88rem' }}>
          ❌ {error}
        </div>
      )}

      {weakTopics.length > 0 && (
        <div style={{ marginBottom: '1.2rem', padding: '0.8rem 1rem', background: 'rgba(255,140,66,0.08)', border: '1px solid var(--sp-accent-orange)', borderRadius: 8 }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--sp-accent-orange)', marginBottom: '0.4rem' }}>
            ⚠️ Topics getting priority in your plan (avg score &lt;75%):
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {weakTopics.map(t => (
              <span key={t.topic} style={{ background: 'rgba(255,140,66,0.15)', border: '1px solid var(--sp-accent-orange)', borderRadius: 12, padding: '0.2rem 0.6rem', fontSize: '0.78rem', color: 'var(--sp-accent-orange)' }}>
                {t.topic} ({t.avg}%)
              </span>
            ))}
          </div>
        </div>
      )}

      {!plan && !loading && (
        <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--sp-bg-tertiary)', borderRadius: 12, border: '1px dashed var(--sp-border-color)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>📅</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Your personalized study plan is ready to generate</div>
          <div style={{ color: 'var(--sp-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            Based on your <strong>{profile?.availableHoursPerWeek || '?'} hrs/week</strong> availability, career goals, and weak test topics — the AI will build a realistic 7-day schedule just for you.
          </div>
          <button className="sp-btn-primary" onClick={generatePlan} style={{ padding: '0.8rem 2rem', fontWeight: 700, fontSize: '1rem' }}>
            ✨ Generate My Plan
          </button>
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--sp-bg-tertiary)', borderRadius: 12 }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.8rem', animation: 'spin 1.5s linear infinite' }}>⏳</div>
          <div style={{ fontWeight: 600 }}>AI is crafting your personalized plan...</div>
          <div style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem', marginTop: '0.4rem' }}>This takes about 5–10 seconds</div>
        </div>
      )}

      {plan && !loading && (
        <>
          <div style={{ background: 'linear-gradient(135deg, rgba(0,212,212,0.15), rgba(150,120,255,0.1))', border: '1px solid rgba(0,212,212,0.3)', borderRadius: 10, padding: '1rem 1.2rem', marginBottom: '1.2rem' }}>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.3rem' }}>{plan.planTitle}</div>
            <div style={{ color: 'var(--sp-text-secondary)', fontSize: '0.88rem', marginBottom: '0.6rem' }}>{plan.focus}</div>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--sp-text-secondary)' }}>Total scheduled: </span>
                <strong style={{ color: 'var(--sp-accent-teal)' }}>{totalHoursInPlan}h</strong>
              </div>
              <div style={{ fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--sp-text-secondary)' }}>Days: </span>
                <strong style={{ color: 'var(--sp-accent-teal)' }}>{plan.days.length}</strong>
              </div>
              {weakTopics.length > 0 && (
                <div style={{ fontSize: '0.82rem' }}>
                  <span style={{ color: 'var(--sp-text-secondary)' }}>Priority topics: </span>
                  <strong style={{ color: 'var(--sp-accent-orange)' }}>{weakTopics.length}</strong>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
            {Object.entries(SESSION_COLORS).map(([type, cfg]) => (
              <span key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 12, padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
                {cfg.emoji} {cfg.label}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {plan.days.map((day, di) => {
              const isExpanded = expandedDay === day.day;
              const dayMins = day.totalMinutes || day.sessions.reduce((s, se) => s + se.durationMinutes, 0);
              const isRest = day.sessions.every(s => s.type === 'rest') || dayMins === 0;
              return (
                <div key={di} style={{ background: 'var(--sp-bg-tertiary)', borderRadius: 10, border: `1px solid ${isExpanded ? 'var(--sp-accent-teal)' : 'var(--sp-border-color)'}`, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                  <div
                    onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                    style={{ padding: '0.85rem 1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.8rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', minWidth: '80px' }}>{day.day}</div>
                      {isRest ? (
                        <span style={{ fontSize: '0.8rem', color: 'var(--sp-text-secondary)' }}>😴 Rest day</span>
                      ) : (
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', flex: 1 }}>
                          {day.sessions.slice(0, 3).map((s, si) => {
                            const cfg = SESSION_COLORS[s.type] || SESSION_COLORS.study;
                            return (
                              <span key={si} style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 10, padding: '0.15rem 0.5rem', fontSize: '0.74rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                {cfg.emoji} {s.topic}
                              </span>
                            );
                          })}
                          {day.sessions.length > 3 && <span style={{ fontSize: '0.74rem', color: 'var(--sp-text-secondary)' }}>+{day.sessions.length - 3} more</span>}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
                      {!isRest && <span style={{ fontSize: '0.8rem', color: 'var(--sp-accent-teal)', fontWeight: 600 }}>{formatDuration(dayMins)}</span>}
                      <span style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}>{isExpanded ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{ borderTop: '1px solid var(--sp-border-color)', padding: '0.8rem 1rem' }}>
                      {day.tip && (
                        <div style={{ marginBottom: '0.8rem', padding: '0.6rem 0.8rem', background: 'rgba(0,212,212,0.07)', border: '1px solid rgba(0,212,212,0.2)', borderRadius: 8, fontSize: '0.83rem', color: 'var(--sp-text-secondary)', fontStyle: 'italic' }}>
                          💡 {day.tip}
                        </div>
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {day.sessions.map((s, si) => {
                          const cfg = SESSION_COLORS[s.type] || SESSION_COLORS.study;
                          return (
                            <div key={si} style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 8, padding: '0.7rem 0.9rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                                <div style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                  <span>{cfg.emoji}</span>
                                  <span>{s.topic}</span>
                                  <span style={{ fontSize: '0.74rem', background: `${cfg.border}20`, border: `1px solid ${cfg.border}`, borderRadius: 10, padding: '0.1rem 0.4rem', fontWeight: 500, color: cfg.border }}>{cfg.label}</span>
                                </div>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: cfg.border }}>{formatDuration(s.durationMinutes)}</span>
                              </div>
                              <div style={{ fontSize: '0.84rem', color: 'var(--sp-text-secondary)', lineHeight: 1.5 }}>{s.description}</div>
                              {s.resources && (
                                <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--sp-text-secondary)' }}>
                                  📌 <em>{s.resources}</em>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '1rem', padding: '0.8rem 1rem', background: 'var(--sp-bg-tertiary)', borderRadius: 8, fontSize: '0.8rem', color: 'var(--sp-text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span>🤖 AI-generated based on your profile, goals, and test performance</span>
            <button className="sp-btn-secondary" onClick={generatePlan} style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem' }}>🔄 Regenerate</button>
          </div>
        </>
      )}
    </div>
  );
}
