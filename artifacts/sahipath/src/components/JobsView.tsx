import React, { useState, useEffect } from 'react';
import { UserProfile } from '../lib/rag';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  url: string;
  source: string;
  description?: string;
  salary?: string;
}

interface JobsViewProps {
  profile: UserProfile | null;
}

const JOB_BOARDS = [
  { name: 'LinkedIn', icon: '💼', color: '#0077B5', baseUrl: 'https://www.linkedin.com/jobs/search/?keywords=' },
  { name: 'Naukri', icon: '🏢', color: '#FF7555', baseUrl: 'https://www.naukri.com/' },
  { name: 'Internshala', icon: '🎓', color: '#019EBF', baseUrl: 'https://internshala.com/internships/' },
  { name: 'Indeed', icon: '🔍', color: '#003A9B', baseUrl: 'https://in.indeed.com/jobs?q=' },
];

function buildSearchUrl(board: typeof JOB_BOARDS[0], skill: string, location: string) {
  const q = encodeURIComponent(skill.trim());
  const loc = encodeURIComponent(location?.split(',')[0]?.trim() || 'India');
  if (board.name === 'LinkedIn') return `${board.baseUrl}${q}&location=${loc}`;
  if (board.name === 'Naukri') {
    const slug = skill.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `https://www.naukri.com/${slug}-jobs-in-india`;
  }
  if (board.name === 'Internshala') {
    const slug = skill.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `https://internshala.com/internships/${slug}-internship`;
  }
  if (board.name === 'Indeed') return `${board.baseUrl}${q}&l=${loc}`;
  return board.baseUrl + q;
}

async function fetchRealJobs(skills: string[], interests: string[]): Promise<Job[]> {
  const query = [...skills.slice(0, 2), ...interests.slice(0, 2)].filter(Boolean).join(' ').trim() || 'software developer';
  const jobs: Job[] = [];

  try {
    const res = await fetch(`https://remoteok.com/api?tag=${encodeURIComponent(skills[0] || 'developer')}`, {
      headers: { 'User-Agent': 'SahiPath/1.0' }
    });
    if (res.ok) {
      const data = await res.json();
      const listings = Array.isArray(data) ? data.filter((j: any) => j.id && j.position) : [];
      listings.slice(0, 5).forEach((j: any) => {
        jobs.push({
          id: String(j.id),
          title: j.position,
          company: j.company || 'Remote Company',
          location: j.location || 'Remote',
          type: 'Remote / Full-time',
          url: j.url || `https://remoteok.com/remote-jobs/${j.id}`,
          source: 'RemoteOK',
          description: j.description?.replace(/<[^>]*>/g, '').slice(0, 120) + '...',
          salary: j.salary_min ? `$${j.salary_min}–$${j.salary_max}` : undefined,
        });
      });
    }
  } catch {}

  try {
    const res2 = await fetch(`https://himalayas.app/api/v2/jobs?q=${encodeURIComponent(query)}&limit=5`);
    if (res2.ok) {
      const d2 = await res2.json();
      const jobs2 = Array.isArray(d2.jobs) ? d2.jobs : [];
      jobs2.slice(0, 5).forEach((j: any) => {
        jobs.push({
          id: `hm-${j.id || Math.random()}`,
          title: j.title || j.position,
          company: j.company?.name || 'Company',
          location: j.location || 'Remote',
          type: j.type || 'Full-time',
          url: j.applicationUrl || j.url || 'https://himalayas.app/jobs',
          source: 'Himalayas',
          description: j.description?.replace(/<[^>]*>/g, '').slice(0, 120) + '...',
        });
      });
    }
  } catch {}

  return jobs;
}

export function JobsView({ profile }: JobsViewProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'internship' | 'fulltime'>('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  const skills = profile?.skills || [];
  const interests = profile?.careerInterests || [];
  const location = profile?.location || 'India';

  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetched = await fetchRealJobs(skills, interests);
      setJobs(fetched);
      if (fetched.length === 0) setError('No live listings found right now. Try the direct search links below.');
    } catch {
      setError('Failed to fetch jobs. Use the direct search links below.');
    }
    setFetched(true);
    setLoading(false);
  };

  const mainSkill = skills[0] || interests[0] || 'developer';
  const mainInterest = interests[0] || skills[0] || 'software';

  const filteredJobs = jobs.filter(j => {
    if (filterType === 'internship') return j.type.toLowerCase().includes('intern');
    if (filterType === 'fulltime') return !j.type.toLowerCase().includes('intern');
    return true;
  }).filter(j =>
    !searchKeyword || j.title.toLowerCase().includes(searchKeyword.toLowerCase()) || j.company.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div style={{ padding: '1.5rem', overflowY: 'auto', height: '100%' }}>
      <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Jobs & Internships</h3>
      <p style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem', marginBottom: '1.2rem' }}>
        Real listings based on your skills: <strong style={{ color: 'var(--sp-accent-teal)' }}>{skills.slice(0, 3).join(', ') || 'none set'}</strong>
      </p>

      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ color: 'var(--sp-text-secondary)', fontSize: '0.9rem', marginBottom: '0.8rem', marginTop: 0 }}>🔗 Search Directly On</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
          {JOB_BOARDS.map(board => (
            <a
              key={board.name}
              href={buildSearchUrl(board, mainSkill, location)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.7rem 1rem',
                background: 'var(--sp-bg-tertiary)',
                border: '1px solid var(--sp-border-color)',
                borderRadius: 8,
                textDecoration: 'none',
                color: 'var(--sp-text-primary)',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = board.color)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--sp-border-color)')}
            >
              <span style={{ fontSize: '1.2rem' }}>{board.icon}</span>
              <div>
                <div>{board.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--sp-text-secondary)' }}>Search for "{mainSkill}"</div>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--sp-text-secondary)' }}>↗</span>
            </a>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', marginTop: '0.6rem' }}>
          {[
            { name: 'Internshala Internships', url: `https://internshala.com/internships/${mainInterest.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-internship`, icon: '🎓' },
            { name: 'Naukri Freshers', url: `https://www.naukri.com/fresher-${mainSkill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-jobs`, icon: '🆕' },
            { name: 'AngelList / Wellfound', url: `https://wellfound.com/role/r/${mainSkill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, icon: '🚀' },
            { name: 'Shine.com', url: `https://www.shine.com/job-search/${mainSkill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-jobs`, icon: '⭐' },
          ].map(l => (
            <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.8rem', background: 'var(--sp-bg-tertiary)', border: '1px solid var(--sp-border-color)', borderRadius: 8, textDecoration: 'none', color: 'var(--sp-text-secondary)', fontSize: '0.8rem', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sp-accent-teal)'; e.currentTarget.style.color = 'var(--sp-text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--sp-border-color)'; e.currentTarget.style.color = 'var(--sp-text-secondary)'; }}
            >
              {l.icon} {l.name} ↗
            </a>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Filter by title or company..."
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.target.value)}
          style={{ flex: 1, minWidth: 150, background: 'var(--sp-bg-tertiary)', border: '1px solid var(--sp-border-color)', borderRadius: 6, padding: '0.5rem 0.8rem', color: 'var(--sp-text-primary)', fontSize: '0.85rem' }}
        />
        {(['all', 'internship', 'fulltime'] as const).map(f => (
          <button key={f} onClick={() => setFilterType(f)}
            className={filterType === f ? 'sp-btn-primary' : 'sp-btn-secondary'}
            style={{ padding: '0.5rem 0.8rem', fontSize: '0.8rem' }}>
            {f === 'all' ? 'All' : f === 'internship' ? '🎓 Internships' : '💼 Full-time'}
          </button>
        ))}
        <button className="sp-btn-secondary" onClick={loadJobs} disabled={loading} style={{ padding: '0.5rem 0.8rem', fontSize: '0.8rem' }}>
          {loading ? '⏳ Fetching...' : fetched ? '🔄 Refresh' : '🌐 Fetch Live Jobs'}
        </button>
      </div>

      {error && (
        <div style={{ padding: '0.8rem', background: 'rgba(255,107,107,0.1)', border: '1px solid var(--sp-accent-coral)', borderRadius: 8, color: 'var(--sp-accent-coral)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {filteredJobs.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {filteredJobs.map(j => (
            <div key={j.id} style={{
              background: 'var(--sp-bg-tertiary)',
              borderRadius: 8,
              padding: '1rem',
              borderLeft: '3px solid var(--sp-accent-teal)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{j.title}</div>
                  <div style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}>
                    🏢 {j.company} · 📍 {j.location} · {j.type}
                    {j.salary && <span style={{ color: 'var(--sp-accent-orange)', marginLeft: '0.5rem' }}>💰 {j.salary}</span>}
                  </div>
                  {j.description && <div style={{ fontSize: '0.8rem', color: 'var(--sp-text-secondary)', marginTop: '0.4rem' }}>{j.description}</div>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flexShrink: 0 }}>
                  <a href={j.url} target="_blank" rel="noopener noreferrer"
                    style={{ background: 'linear-gradient(135deg, var(--sp-accent-teal), var(--sp-accent-orange))', color: '#0a0e27', padding: '0.5rem 1rem', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    Apply Now ↗
                  </a>
                  <div style={{ fontSize: '0.7rem', color: 'var(--sp-text-secondary)', textAlign: 'center' }}>via {j.source}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : fetched && !loading ? (
        <div style={{ color: 'var(--sp-text-secondary)', textAlign: 'center', padding: '2rem', background: 'var(--sp-bg-tertiary)', borderRadius: 8 }}>
          No live listings found. Use the direct search links above — they'll show real openings on major platforms.
        </div>
      ) : !fetched ? (
        <div style={{ color: 'var(--sp-text-secondary)', textAlign: 'center', padding: '2rem', background: 'var(--sp-bg-tertiary)', borderRadius: 8 }}>
          Click "Fetch Live Jobs" to load real openings from RemoteOK and Himalayas, or use the direct links above to search on LinkedIn, Naukri, and Internshala.
        </div>
      ) : null}
    </div>
  );
}
