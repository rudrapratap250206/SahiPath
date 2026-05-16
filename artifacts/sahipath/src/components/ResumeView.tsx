import React, { useState, useEffect } from 'react';
import { UserProfile } from '../lib/rag';

interface ResumeViewProps {
  profile: UserProfile | null;
}

interface EducationEntry {
  degree: string;
  institution: string;
  duration: string;
  grade: string;
}

interface ExperienceEntry {
  role: string;
  company: string;
  duration: string;
  bullets: string;
}

interface ProjectEntry {
  name: string;
  description: string;
}

interface ResumeData {
  phone: string;
  linkedin: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skillsLanguages: string;
  skillsCore: string;
  skillsTools: string;
  _profileSkillsSnapshot?: string;
}

const defaultResumeData = (profile: UserProfile | null): ResumeData => ({
  phone: '',
  linkedin: '',
  education: [{ degree: profile?.educationLevel || "Bachelor's", institution: '', duration: '', grade: '' }],
  experience: [{ role: profile?.currentRole || '', company: '', duration: '', bullets: profile?.currentGoals || '' }],
  projects: [{ name: '', description: '' }],
  skillsLanguages: profile?.skills?.join(', ') || '',
  skillsCore: profile?.careerInterests?.join(', ') || '',
  skillsTools: '',
  _profileSkillsSnapshot: profile?.skills?.join(',') || '',
});

const loadResumeData = (profile: UserProfile | null): ResumeData => {
  try {
    const saved = localStorage.getItem('sp_resume_data');
    if (saved) {
      const parsed: ResumeData = JSON.parse(saved);
      // Auto-sync skills from profile if they changed or weren't manually overridden
      if (profile?.skills?.length) {
        const currentProfileSkills = profile.skills.join(',');
        const snapshot = parsed._profileSkillsSnapshot || '';
        // If skills haven't been manually edited (snapshot matches parsed skills) OR snapshot differs from current profile
        if (snapshot !== currentProfileSkills) {
          parsed.skillsLanguages = profile.skills.join(', ');
          parsed._profileSkillsSnapshot = currentProfileSkills;
        }
      }
      if (profile?.careerInterests?.length && !parsed.skillsCore) {
        parsed.skillsCore = profile.careerInterests.join(', ');
      }
      return parsed;
    }
  } catch {}
  return defaultResumeData(profile);
};

export function ResumeView({ profile }: ResumeViewProps) {
  const [generating, setGenerating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [savedData, setSavedData] = useState<ResumeData>(() => loadResumeData(profile));
  const [draftData, setDraftData] = useState<ResumeData>(() => loadResumeData(profile));
  const [hasUnsaved, setHasUnsaved] = useState(false);

  // Auto-sync profile skills whenever profile changes
  useEffect(() => {
    if (!profile?.skills?.length) return;
    const currentProfileSkills = profile.skills.join(',');
    setSavedData(prev => {
      if (prev._profileSkillsSnapshot !== currentProfileSkills) {
        const updated = { ...prev, skillsLanguages: profile.skills.join(', '), _profileSkillsSnapshot: currentProfileSkills };
        try { localStorage.setItem('sp_resume_data', JSON.stringify(updated)); } catch {}
        return updated;
      }
      return prev;
    });
    setDraftData(prev => {
      if (prev._profileSkillsSnapshot !== currentProfileSkills) {
        return { ...prev, skillsLanguages: profile.skills.join(', '), _profileSkillsSnapshot: currentProfileSkills };
      }
      return prev;
    });
  }, [profile?.skills?.join(',')]);

  const startEditing = () => {
    setDraftData({ ...savedData });
    setHasUnsaved(false);
    setEditing(true);
  };

  const cancelEditing = () => {
    setDraftData({ ...savedData });
    setHasUnsaved(false);
    setEditing(false);
  };

  const saveChanges = () => {
    setSavedData(draftData);
    try { localStorage.setItem('sp_resume_data', JSON.stringify(draftData)); } catch {}
    setHasUnsaved(false);
    setEditing(false);
  };

  const updateDraft = (partial: Partial<ResumeData>) => {
    setDraftData(prev => ({ ...prev, ...partial }));
    setHasUnsaved(true);
  };

  const data = editing ? draftData : savedData;

  const generatePDF = async () => {
    if (!profile) return;
    setGenerating(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = 210;
      const margin = 18;
      const contentW = pageW - margin * 2;
      let y = 0;

      const checkPage = (needed: number) => { if (y + needed > 275) { doc.addPage(); y = 18; } };

      const addText = (text: string, opts: { fontSize?: number; bold?: boolean; italic?: boolean; color?: [number, number, number]; align?: 'left' | 'center' | 'right'; marginTop?: number; maxWidth?: number } = {}) => {
        const { fontSize = 11, bold = false, italic = false, color = [30, 30, 60], align = 'left', marginTop = 0, maxWidth = contentW } = opts;
        y += marginTop;
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', bold ? 'bold' : italic ? 'italic' : 'normal');
        doc.setTextColor(...color);
        const lines = doc.splitTextToSize(text, maxWidth);
        checkPage(lines.length * (fontSize * 0.35 + 1.5));
        doc.text(lines, align === 'center' ? pageW / 2 : align === 'right' ? pageW - margin : margin, y, { align });
        y += (fontSize * 0.35 + 1.5) * lines.length;
      };

      const addLine = () => { y += 1; doc.setDrawColor(0, 180, 200); doc.setLineWidth(0.4); doc.line(margin, y, pageW - margin, y); y += 3; };
      const addSection = (title: string) => { checkPage(12); y += 4; addText(title.toUpperCase(), { fontSize: 9.5, bold: true, color: [0, 140, 170] }); addLine(); };

      doc.setFillColor(10, 15, 45);
      doc.rect(0, 0, pageW, 40, 'F');
      y = 13;
      addText(`${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'Your Name', { fontSize: 20, bold: true, color: [255, 255, 255], align: 'center' });
      y += 1;
      const contacts = [profile.email, data.phone, profile.location, data.linkedin].filter(Boolean);
      if (contacts.length) addText(contacts.join('  |  '), { fontSize: 8.5, color: [180, 210, 230], align: 'center' });
      y = 48;

      if (profile.currentGoals) { addSection('Professional Summary'); addText(profile.currentGoals, { fontSize: 10, color: [40, 40, 70], maxWidth: contentW }); }

      if (data.education.some(e => e.degree || e.institution)) {
        addSection('Education');
        for (const edu of data.education) {
          if (!edu.degree && !edu.institution) continue;
          addText(`${edu.degree}${edu.institution ? ` — ${edu.institution}` : ''}`, { fontSize: 10.5, bold: true, color: [30, 30, 60] });
          if (edu.duration || edu.grade) addText([edu.duration, edu.grade ? `GPA: ${edu.grade}` : ''].filter(Boolean).join('  |  '), { fontSize: 9.5, italic: true, color: [80, 80, 110] });
          y += 2;
        }
      }

      if (data.experience.some(e => e.role || e.company)) {
        addSection('Experience');
        for (const exp of data.experience) {
          if (!exp.role && !exp.company) continue;
          addText(`${exp.role}${exp.company ? ` — ${exp.company}` : ''}`, { fontSize: 10.5, bold: true, color: [30, 30, 60] });
          if (exp.duration) addText(exp.duration, { fontSize: 9.5, italic: true, color: [80, 80, 110] });
          if (exp.bullets) for (const b of exp.bullets.split('\n').filter(Boolean)) { addText(`• ${b.trim().replace(/^[-•]\s*/, '')}`, { fontSize: 10, color: [50, 50, 80], maxWidth: contentW - 4 }); y += 0.5; }
          y += 2;
        }
      }

      if (data.projects.some(p => p.name)) {
        addSection('Projects');
        for (const proj of data.projects) {
          if (!proj.name) continue;
          addText(proj.name, { fontSize: 10.5, bold: true, color: [30, 30, 60] });
          if (proj.description) for (const b of proj.description.split('\n').filter(Boolean)) { addText(`• ${b.trim().replace(/^[-•]\s*/, '')}`, { fontSize: 10, color: [50, 50, 80], maxWidth: contentW - 4 }); y += 0.5; }
          y += 2;
        }
      }

      const langs = data.skillsLanguages || profile.skills?.join(', ') || '';
      const core = data.skillsCore || profile.careerInterests?.join(', ') || '';
      if (langs || core || data.skillsTools) {
        addSection('Technical Skills');
        if (langs) addText(`Languages / Stack: ${langs}`, { fontSize: 10, color: [40, 40, 70] });
        if (core) { y += 1; addText(`Core: ${core}`, { fontSize: 10, color: [40, 40, 70] }); }
        if (data.skillsTools) { y += 1; addText(`Tools: ${data.skillsTools}`, { fontSize: 10, color: [40, 40, 70] }); }
      }

      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8); doc.setTextColor(160, 160, 180);
        doc.text(`Generated by SahiPath · Page ${i} of ${totalPages}`, pageW / 2, 290, { align: 'center' });
      }
      doc.save(`${profile.firstName || 'Resume'}_Resume.pdf`.replace(/\s+/g, '_'));
    } catch (err) {
      console.error('PDF error', err);
      alert('PDF generation failed. Please try again.');
    }
    setGenerating(false);
  };

  if (!profile?.firstName) {
    return <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--sp-text-secondary)' }}>Complete your profile first to generate a resume.</div>;
  }

  return (
    <div style={{ padding: '1.5rem', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3 style={{ margin: 0 }}>📄 Resume Builder</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {editing ? (
            <>
              {hasUnsaved && <span style={{ fontSize: '0.78rem', color: 'var(--sp-accent-orange)', display: 'flex', alignItems: 'center' }}>● Unsaved changes</span>}
              <button className="sp-btn-secondary" onClick={cancelEditing} style={{ padding: '0.5rem 0.9rem', fontSize: '0.82rem' }}>✕ Cancel</button>
              <button className="sp-btn-primary" onClick={saveChanges} style={{ padding: '0.5rem 1rem', fontSize: '0.82rem', background: 'var(--sp-accent-teal)', color: '#0a0f2d' }}>💾 Save Changes</button>
            </>
          ) : (
            <button className="sp-btn-secondary" onClick={startEditing} style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}>✏️ Edit Resume</button>
          )}
          <button className="sp-btn-primary" onClick={generatePDF} disabled={generating} style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}>
            {generating ? '⏳ Generating...' : '⬇️ Download PDF'}
          </button>
        </div>
      </div>

      {profile.skills?.length > 0 && (
        <div style={{ marginBottom: '0.8rem', padding: '0.6rem 0.8rem', background: 'rgba(0,212,212,0.07)', border: '1px solid rgba(0,212,212,0.2)', borderRadius: 8, fontSize: '0.8rem', color: 'var(--sp-text-secondary)' }}>
          ✅ Skills auto-synced from your profile: <strong style={{ color: 'var(--sp-accent-teal)' }}>{profile.skills.slice(0, 5).join(', ')}{profile.skills.length > 5 ? ` +${profile.skills.length - 5} more` : ''}</strong>
        </div>
      )}

      <div style={{ background: 'var(--sp-bg-tertiary)', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--sp-border-color)' }}>
        <div style={{ background: 'rgba(10,15,45,0.9)', padding: '1.2rem 1.5rem', borderBottom: '2px solid var(--sp-accent-teal)' }}>
          <div style={{ fontWeight: 700, fontSize: '1.3rem' }}>{profile.firstName} {profile.lastName}</div>
          <div style={{ color: 'var(--sp-accent-teal)', fontSize: '0.9rem', margin: '0.2rem 0' }}>{profile.currentRole}</div>
          <div style={{ fontSize: '0.8rem', color: '#aac', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {profile.email && <span>✉ {profile.email}</span>}
            {data.phone && <span>📞 {data.phone}</span>}
            {profile.location && <span>📍 {profile.location}</span>}
            {data.linkedin && <span>🔗 {data.linkedin}</span>}
          </div>
        </div>

        <div style={{ padding: '1rem 1.5rem' }}>
          {editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

              <SectionEdit title="Contact Info">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <input placeholder="Phone (e.g. +91 9876543210)" value={draftData.phone} onChange={e => updateDraft({ phone: e.target.value })} style={inputStyle} />
                  <input placeholder="LinkedIn URL" value={draftData.linkedin} onChange={e => updateDraft({ linkedin: e.target.value })} style={inputStyle} />
                </div>
              </SectionEdit>

              <SectionEdit title="Education"
                onAdd={() => updateDraft({ education: [...draftData.education, { degree: '', institution: '', duration: '', grade: '' }] })}>
                {draftData.education.map((edu, i) => (
                  <EntryWrapper key={i} onDelete={() => updateDraft({ education: draftData.education.filter((_, j) => j !== i) })}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <input placeholder="Degree (e.g. B.E. Computer Engineering)" value={edu.degree} onChange={e => { const ed = [...draftData.education]; ed[i] = { ...ed[i], degree: e.target.value }; updateDraft({ education: ed }); }} style={inputStyle} />
                      <input placeholder="Institution / University" value={edu.institution} onChange={e => { const ed = [...draftData.education]; ed[i] = { ...ed[i], institution: e.target.value }; updateDraft({ education: ed }); }} style={inputStyle} />
                      <input placeholder="Duration (e.g. Aug 2024 – Jun 2028)" value={edu.duration} onChange={e => { const ed = [...draftData.education]; ed[i] = { ...ed[i], duration: e.target.value }; updateDraft({ education: ed }); }} style={inputStyle} />
                      <input placeholder="Grade / GPA (e.g. 9.27/10)" value={edu.grade} onChange={e => { const ed = [...draftData.education]; ed[i] = { ...ed[i], grade: e.target.value }; updateDraft({ education: ed }); }} style={inputStyle} />
                    </div>
                  </EntryWrapper>
                ))}
              </SectionEdit>

              <SectionEdit title="Experience"
                onAdd={() => updateDraft({ experience: [...draftData.experience, { role: '', company: '', duration: '', bullets: '' }] })}>
                {draftData.experience.map((exp, i) => (
                  <EntryWrapper key={i} onDelete={() => updateDraft({ experience: draftData.experience.filter((_, j) => j !== i) })}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input placeholder="Role / Title" value={exp.role} onChange={e => { const ex = [...draftData.experience]; ex[i] = { ...ex[i], role: e.target.value }; updateDraft({ experience: ex }); }} style={inputStyle} />
                      <input placeholder="Company" value={exp.company} onChange={e => { const ex = [...draftData.experience]; ex[i] = { ...ex[i], company: e.target.value }; updateDraft({ experience: ex }); }} style={inputStyle} />
                      <input placeholder="Duration (e.g. Jan 2025 – Mar 2025)" value={exp.duration} onChange={e => { const ex = [...draftData.experience]; ex[i] = { ...ex[i], duration: e.target.value }; updateDraft({ experience: ex }); }} style={{ ...inputStyle, gridColumn: 'span 2' }} />
                    </div>
                    <textarea placeholder="Bullet points — one per line (e.g. Built REST API for authentication)" value={exp.bullets} rows={3} onChange={e => { const ex = [...draftData.experience]; ex[i] = { ...ex[i], bullets: e.target.value }; updateDraft({ experience: ex }); }} style={{ ...inputStyle, resize: 'vertical', width: '100%' }} />
                  </EntryWrapper>
                ))}
              </SectionEdit>

              <SectionEdit title="Projects"
                onAdd={() => updateDraft({ projects: [...draftData.projects, { name: '', description: '' }] })}>
                {draftData.projects.map((proj, i) => (
                  <EntryWrapper key={i} onDelete={() => updateDraft({ projects: draftData.projects.filter((_, j) => j !== i) })}>
                    <input placeholder="Project Name" value={proj.name} onChange={e => { const pr = [...draftData.projects]; pr[i] = { ...pr[i], name: e.target.value }; updateDraft({ projects: pr }); }} style={{ ...inputStyle, marginBottom: '0.5rem', width: '100%' }} />
                    <textarea placeholder="Description — one bullet per line" value={proj.description} rows={3} onChange={e => { const pr = [...draftData.projects]; pr[i] = { ...pr[i], description: e.target.value }; updateDraft({ projects: pr }); }} style={{ ...inputStyle, resize: 'vertical', width: '100%' }} />
                  </EntryWrapper>
                ))}
              </SectionEdit>

              <SectionEdit title="Technical Skills">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>
                    <label style={labelStyle}>Languages / Stack (auto-synced from your profile)</label>
                    <input value={draftData.skillsLanguages} onChange={e => updateDraft({ skillsLanguages: e.target.value, _profileSkillsSnapshot: draftData._profileSkillsSnapshot })} style={inputStyle} placeholder="e.g. Java, JavaScript, MERN Stack" />
                  </div>
                  <div>
                    <label style={labelStyle}>Core (e.g. DSA, OOPs, Web Development)</label>
                    <input value={draftData.skillsCore} onChange={e => updateDraft({ skillsCore: e.target.value })} style={inputStyle} placeholder="e.g. DSA, OOPs, Web Development" />
                  </div>
                  <div>
                    <label style={labelStyle}>Tools (e.g. VS Code, Git, GitHub)</label>
                    <input value={draftData.skillsTools} onChange={e => updateDraft({ skillsTools: e.target.value })} style={inputStyle} placeholder="e.g. VS Code, Git, GitHub, Postman" />
                  </div>
                </div>
              </SectionEdit>

              <div style={{ display: 'flex', gap: '0.6rem', paddingTop: '0.5rem' }}>
                <button className="sp-btn-secondary" onClick={cancelEditing} style={{ flex: 1, padding: '0.7rem' }}>✕ Cancel</button>
                <button className="sp-btn-primary" onClick={saveChanges} style={{ flex: 2, padding: '0.7rem', background: 'var(--sp-accent-teal)', color: '#0a0f2d', fontWeight: 700 }}>💾 Save Changes</button>
              </div>
            </div>
          ) : (
            <PreviewMode data={savedData} profile={profile} />
          )}
        </div>
      </div>

      {!editing && (
        <div style={{ marginTop: '0.8rem', padding: '0.7rem', background: 'var(--sp-bg-tertiary)', borderRadius: 8, fontSize: '0.8rem', color: 'var(--sp-text-secondary)' }}>
          💡 Click "✏️ Edit Resume" to add your college, GPA, company, projects, and tools. Skills are auto-synced from your profile.
        </div>
      )}
    </div>
  );
}

function SectionEdit({ title, children, onAdd }: { title: string; children: React.ReactNode; onAdd?: () => void }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--sp-accent-teal)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</div>
        {onAdd && (
          <button onClick={onAdd} className="sp-btn-secondary" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>+ Add</button>
        )}
      </div>
      {children}
    </div>
  );
}

function EntryWrapper({ children, onDelete }: { children: React.ReactNode; onDelete: () => void }) {
  return (
    <div style={{ marginBottom: '0.8rem', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', borderRadius: 8, position: 'relative' }}>
      <button
        onClick={onDelete}
        title="Remove this entry"
        style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'transparent', border: '1px solid var(--sp-accent-coral)', borderRadius: 4, color: 'var(--sp-accent-coral)', cursor: 'pointer', fontSize: '0.72rem', padding: '0.1rem 0.4rem', lineHeight: 1.5 }}
      >
        ✕ Remove
      </button>
      <div style={{ paddingRight: '5.5rem' }}>{children}</div>
    </div>
  );
}

function PreviewMode({ data, profile }: { data: ResumeData; profile: UserProfile }) {
  const sectionHead = (label: string) => (
    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--sp-accent-teal)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem', borderBottom: '1px solid rgba(0,212,212,0.2)', paddingBottom: '0.3rem' }}>
      {label}
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
      {profile.currentGoals && (
        <div>{sectionHead('Professional Summary')}<p style={{ margin: 0, color: 'var(--sp-text-secondary)' }}>{profile.currentGoals}</p></div>
      )}
      {data.education.some(e => e.degree || e.institution) && (
        <div>{sectionHead('Education')}
          {data.education.map((e, i) => (e.degree || e.institution) && (
            <div key={i} style={{ marginBottom: '0.4rem' }}>
              <div style={{ fontWeight: 600 }}>{e.degree}{e.institution ? ` — ${e.institution}` : ''}</div>
              {(e.duration || e.grade) && <div style={{ color: 'var(--sp-text-secondary)', fontSize: '0.82rem' }}>{[e.duration, e.grade].filter(Boolean).join(' · ')}</div>}
            </div>
          ))}
        </div>
      )}
      {data.experience.some(e => e.role || e.company) && (
        <div>{sectionHead('Experience')}
          {data.experience.map((e, i) => (e.role || e.company) && (
            <div key={i} style={{ marginBottom: '0.6rem' }}>
              <div style={{ fontWeight: 600 }}>{e.role}{e.company ? ` — ${e.company}` : ''}</div>
              {e.duration && <div style={{ color: 'var(--sp-text-secondary)', fontSize: '0.82rem' }}>{e.duration}</div>}
              {e.bullets && e.bullets.split('\n').filter(b => b.trim()).map((b, j) => <div key={j} style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}>• {b.trim().replace(/^[-•]\s*/, '')}</div>)}
            </div>
          ))}
        </div>
      )}
      {data.projects.some(p => p.name) && (
        <div>{sectionHead('Projects')}
          {data.projects.map((p, i) => p.name && (
            <div key={i} style={{ marginBottom: '0.6rem' }}>
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              {p.description && p.description.split('\n').filter(b => b.trim()).map((b, j) => <div key={j} style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}>• {b.trim().replace(/^[-•]\s*/, '')}</div>)}
            </div>
          ))}
        </div>
      )}
      {(data.skillsLanguages || data.skillsCore || data.skillsTools || profile.skills?.length) && (
        <div>{sectionHead('Technical Skills')}
          {(data.skillsLanguages || profile.skills?.join(', ')) && <div style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}><strong>Languages:</strong> {data.skillsLanguages || profile.skills?.join(', ')}</div>}
          {(data.skillsCore || profile.careerInterests?.join(', ')) && <div style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}><strong>Core:</strong> {data.skillsCore || profile.careerInterests?.join(', ')}</div>}
          {data.skillsTools && <div style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}><strong>Tools:</strong> {data.skillsTools}</div>}
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: 'var(--sp-bg-secondary)',
  border: '1px solid var(--sp-border-color)',
  borderRadius: 6,
  padding: '0.55rem 0.7rem',
  color: 'var(--sp-text-primary)',
  fontSize: '0.85rem',
  width: '100%',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.78rem',
  color: 'var(--sp-text-secondary)',
  marginBottom: '0.3rem',
};
