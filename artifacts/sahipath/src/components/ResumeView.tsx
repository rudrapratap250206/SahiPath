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
}

const defaultResumeData = (profile: UserProfile | null): ResumeData => ({
  phone: '',
  linkedin: '',
  education: [
    {
      degree: profile?.educationLevel || "Bachelor's",
      institution: '',
      duration: '',
      grade: '',
    }
  ],
  experience: [
    {
      role: profile?.currentRole || '',
      company: '',
      duration: '',
      bullets: profile?.currentGoals || '',
    }
  ],
  projects: [{ name: '', description: '' }],
  skillsLanguages: profile?.skills?.join(', ') || '',
  skillsCore: profile?.careerInterests?.join(', ') || '',
  skillsTools: '',
});

export function ResumeView({ profile }: ResumeViewProps) {
  const [generating, setGenerating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('sp_resume_data');
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultResumeData(profile);
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sp_resume_data');
      if (!saved && profile) {
        setResumeData(defaultResumeData(profile));
      }
    } catch {}
  }, [profile]);

  const saveResumeData = (data: ResumeData) => {
    setResumeData(data);
    try { localStorage.setItem('sp_resume_data', JSON.stringify(data)); } catch {}
  };

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

      const checkPage = (neededSpace: number) => {
        if (y + neededSpace > 275) {
          doc.addPage();
          y = 18;
        }
      };

      const addText = (text: string, opts: { fontSize?: number; bold?: boolean; color?: [number, number, number]; align?: 'left' | 'center' | 'right'; marginTop?: number; maxWidth?: number; italic?: boolean } = {}) => {
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

      const addLine = () => {
        y += 1;
        doc.setDrawColor(0, 180, 200);
        doc.setLineWidth(0.4);
        doc.line(margin, y, pageW - margin, y);
        y += 3;
      };

      const addSection = (title: string) => {
        checkPage(12);
        y += 4;
        addText(title.toUpperCase(), { fontSize: 9.5, bold: true, color: [0, 140, 170] });
        addLine();
      };

      doc.setFillColor(10, 15, 45);
      doc.rect(0, 0, pageW, 40, 'F');

      y = 13;
      const name = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'Your Name';
      addText(name, { fontSize: 20, bold: true, color: [255, 255, 255], align: 'center' });
      y += 1;

      const contactParts = [
        profile.email,
        resumeData.phone,
        profile.location,
        resumeData.linkedin,
      ].filter(Boolean);

      if (contactParts.length) {
        addText(contactParts.join('  |  '), { fontSize: 8.5, color: [180, 210, 230], align: 'center' });
      }

      y = 48;

      if (profile.currentGoals) {
        addSection('Professional Summary');
        addText(profile.currentGoals, { fontSize: 10, color: [40, 40, 70], maxWidth: contentW });
      }

      if (resumeData.education.some(e => e.degree || e.institution)) {
        addSection('Education');
        for (const edu of resumeData.education) {
          if (!edu.degree && !edu.institution) continue;
          addText(`${edu.degree}${edu.institution ? ` — ${edu.institution}` : ''}`, { fontSize: 10.5, bold: true, color: [30, 30, 60] });
          if (edu.duration || edu.grade) {
            const detail = [edu.duration, edu.grade ? `GPA: ${edu.grade}` : ''].filter(Boolean).join('  |  ');
            addText(detail, { fontSize: 9.5, color: [80, 80, 110], italic: true });
          }
          y += 2;
        }
      }

      if (resumeData.experience.some(e => e.role || e.company)) {
        addSection('Experience');
        for (const exp of resumeData.experience) {
          if (!exp.role && !exp.company) continue;
          addText(`${exp.role}${exp.company ? ` — ${exp.company}` : ''}`, { fontSize: 10.5, bold: true, color: [30, 30, 60] });
          if (exp.duration) addText(exp.duration, { fontSize: 9.5, italic: true, color: [80, 80, 110] });
          if (exp.bullets) {
            const bullets = exp.bullets.split('\n').filter(b => b.trim());
            for (const b of bullets) {
              addText(`• ${b.trim().replace(/^[-•]\s*/, '')}`, { fontSize: 10, color: [50, 50, 80], maxWidth: contentW - 4 });
              y += 0.5;
            }
          }
          y += 2;
        }
      }

      if (resumeData.projects.some(p => p.name)) {
        addSection('Projects');
        for (const proj of resumeData.projects) {
          if (!proj.name) continue;
          addText(proj.name, { fontSize: 10.5, bold: true, color: [30, 30, 60] });
          if (proj.description) {
            const bullets = proj.description.split('\n').filter(b => b.trim());
            for (const b of bullets) {
              addText(`• ${b.trim().replace(/^[-•]\s*/, '')}`, { fontSize: 10, color: [50, 50, 80], maxWidth: contentW - 4 });
              y += 0.5;
            }
          }
          y += 2;
        }
      }

      const hasSkills = resumeData.skillsLanguages || resumeData.skillsCore || resumeData.skillsTools || profile.skills?.length;
      if (hasSkills) {
        addSection('Technical Skills');
        const langSkills = resumeData.skillsLanguages || profile.skills?.join(', ') || '';
        const coreSkills = resumeData.skillsCore || profile.careerInterests?.join(', ') || '';
        const tools = resumeData.skillsTools;
        if (langSkills) addText(`Languages / Stack: ${langSkills}`, { fontSize: 10, color: [40, 40, 70] });
        if (coreSkills) { y += 1; addText(`Core: ${coreSkills}`, { fontSize: 10, color: [40, 40, 70] }); }
        if (tools) { y += 1; addText(`Tools: ${tools}`, { fontSize: 10, color: [40, 40, 70] }); }
      }

      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(160, 160, 180);
        doc.text(`Generated by SahiPath · Page ${i} of ${totalPages}`, pageW / 2, 290, { align: 'center' });
      }

      doc.save(`${profile.firstName || 'Resume'}_Resume.pdf`.replace(/\s+/g, '_'));
    } catch (err) {
      console.error('PDF generation failed', err);
      alert('PDF generation failed. Please try again.');
    }
    setGenerating(false);
  };

  if (!profile?.firstName) {
    return (
      <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--sp-text-secondary)' }}>
        Complete your profile first to generate a resume.
      </div>
    );
  }

  return (
    <div style={{ padding: '1.5rem', overflowY: 'auto', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>📄 Resume Builder</h3>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button className="sp-btn-secondary" onClick={() => setEditing(!editing)} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            {editing ? '✅ Done Editing' : '✏️ Edit Details'}
          </button>
          <button className="sp-btn-primary" onClick={generatePDF} disabled={generating} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            {generating ? '⏳ Generating...' : '⬇️ Download PDF'}
          </button>
        </div>
      </div>

      <div style={{ background: 'var(--sp-bg-tertiary)', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--sp-border-color)' }}>
        <div style={{ background: 'rgba(10,15,45,0.9)', padding: '1.2rem 1.5rem', borderBottom: '2px solid var(--sp-accent-teal)' }}>
          <div style={{ fontWeight: 700, fontSize: '1.3rem' }}>{profile.firstName} {profile.lastName}</div>
          <div style={{ color: 'var(--sp-accent-teal)', fontSize: '0.9rem', margin: '0.2rem 0' }}>{profile.currentRole}</div>
          <div style={{ fontSize: '0.8rem', color: '#aac', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {profile.email && <span>✉ {profile.email}</span>}
            {resumeData.phone && <span>📞 {resumeData.phone}</span>}
            {profile.location && <span>📍 {profile.location}</span>}
            {resumeData.linkedin && <span>🔗 {resumeData.linkedin}</span>}
          </div>
        </div>

        <div style={{ padding: '1rem 1.5rem' }}>
          {editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--sp-accent-teal)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Contact Info</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <input placeholder="Phone (e.g. +91 9876543210)" value={resumeData.phone} onChange={e => saveResumeData({ ...resumeData, phone: e.target.value })} style={inputStyle} />
                  <input placeholder="LinkedIn URL" value={resumeData.linkedin} onChange={e => saveResumeData({ ...resumeData, linkedin: e.target.value })} style={inputStyle} />
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--sp-accent-teal)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Education</div>
                {resumeData.education.map((edu, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.6rem' }}>
                    <input placeholder="Degree (e.g. B.E. Computer Engineering)" value={edu.degree} onChange={e => { const ed = [...resumeData.education]; ed[i] = { ...ed[i], degree: e.target.value }; saveResumeData({ ...resumeData, education: ed }); }} style={inputStyle} />
                    <input placeholder="Institution" value={edu.institution} onChange={e => { const ed = [...resumeData.education]; ed[i] = { ...ed[i], institution: e.target.value }; saveResumeData({ ...resumeData, education: ed }); }} style={inputStyle} />
                    <input placeholder="Duration (e.g. Aug 2024 – Jun 2028)" value={edu.duration} onChange={e => { const ed = [...resumeData.education]; ed[i] = { ...ed[i], duration: e.target.value }; saveResumeData({ ...resumeData, education: ed }); }} style={inputStyle} />
                    <input placeholder="Grade / GPA (e.g. 9.27/10 or 85%)" value={edu.grade} onChange={e => { const ed = [...resumeData.education]; ed[i] = { ...ed[i], grade: e.target.value }; saveResumeData({ ...resumeData, education: ed }); }} style={inputStyle} />
                  </div>
                ))}
                <button className="sp-btn-secondary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }} onClick={() => saveResumeData({ ...resumeData, education: [...resumeData.education, { degree: '', institution: '', duration: '', grade: '' }] })}>+ Add Education</button>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--sp-accent-teal)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Experience</div>
                {resumeData.experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '0.8rem', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', borderRadius: 6 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input placeholder="Role / Title" value={exp.role} onChange={e => { const ex = [...resumeData.experience]; ex[i] = { ...ex[i], role: e.target.value }; saveResumeData({ ...resumeData, experience: ex }); }} style={inputStyle} />
                      <input placeholder="Company" value={exp.company} onChange={e => { const ex = [...resumeData.experience]; ex[i] = { ...ex[i], company: e.target.value }; saveResumeData({ ...resumeData, experience: ex }); }} style={inputStyle} />
                      <input placeholder="Duration (e.g. Jan 2025 – Mar 2025)" value={exp.duration} onChange={e => { const ex = [...resumeData.experience]; ex[i] = { ...ex[i], duration: e.target.value }; saveResumeData({ ...resumeData, experience: ex }); }} style={{ ...inputStyle, gridColumn: 'span 2' }} />
                    </div>
                    <textarea placeholder="Bullet points (one per line, e.g. Built REST API for authentication)" value={exp.bullets} rows={3} onChange={e => { const ex = [...resumeData.experience]; ex[i] = { ...ex[i], bullets: e.target.value }; saveResumeData({ ...resumeData, experience: ex }); }} style={{ ...inputStyle, resize: 'vertical', width: '100%' }} />
                  </div>
                ))}
                <button className="sp-btn-secondary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }} onClick={() => saveResumeData({ ...resumeData, experience: [...resumeData.experience, { role: '', company: '', duration: '', bullets: '' }] })}>+ Add Experience</button>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--sp-accent-teal)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Projects</div>
                {resumeData.projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: '0.8rem', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', borderRadius: 6 }}>
                    <input placeholder="Project Name" value={proj.name} onChange={e => { const pr = [...resumeData.projects]; pr[i] = { ...pr[i], name: e.target.value }; saveResumeData({ ...resumeData, projects: pr }); }} style={{ ...inputStyle, marginBottom: '0.5rem', width: '100%' }} />
                    <textarea placeholder="Description (one bullet per line, e.g. Built full-stack app using MERN stack)" value={proj.description} rows={3} onChange={e => { const pr = [...resumeData.projects]; pr[i] = { ...pr[i], description: e.target.value }; saveResumeData({ ...resumeData, projects: pr }); }} style={{ ...inputStyle, resize: 'vertical', width: '100%' }} />
                  </div>
                ))}
                <button className="sp-btn-secondary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }} onClick={() => saveResumeData({ ...resumeData, projects: [...resumeData.projects, { name: '', description: '' }] })}>+ Add Project</button>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--sp-accent-teal)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Technical Skills</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input placeholder="Languages / Stack (e.g. Java, JavaScript, MERN Stack)" value={resumeData.skillsLanguages} onChange={e => saveResumeData({ ...resumeData, skillsLanguages: e.target.value })} style={inputStyle} />
                  <input placeholder="Core (e.g. DSA, OOPs, Web Development)" value={resumeData.skillsCore} onChange={e => saveResumeData({ ...resumeData, skillsCore: e.target.value })} style={inputStyle} />
                  <input placeholder="Tools (e.g. VS Code, Git, GitHub)" value={resumeData.skillsTools} onChange={e => saveResumeData({ ...resumeData, skillsTools: e.target.value })} style={inputStyle} />
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
              {profile.currentGoals && (
                <div>
                  <div style={sectionHeadStyle}>Professional Summary</div>
                  <p style={{ margin: 0, color: 'var(--sp-text-secondary)' }}>{profile.currentGoals}</p>
                </div>
              )}
              {resumeData.education.some(e => e.degree || e.institution) && (
                <div>
                  <div style={sectionHeadStyle}>Education</div>
                  {resumeData.education.map((e, i) => (e.degree || e.institution) && (
                    <div key={i} style={{ marginBottom: '0.4rem' }}>
                      <div style={{ fontWeight: 600 }}>{e.degree}{e.institution ? ` — ${e.institution}` : ''}</div>
                      {(e.duration || e.grade) && <div style={{ color: 'var(--sp-text-secondary)', fontSize: '0.82rem' }}>{[e.duration, e.grade].filter(Boolean).join(' · ')}</div>}
                    </div>
                  ))}
                </div>
              )}
              {resumeData.experience.some(e => e.role || e.company) && (
                <div>
                  <div style={sectionHeadStyle}>Experience</div>
                  {resumeData.experience.map((e, i) => (e.role || e.company) && (
                    <div key={i} style={{ marginBottom: '0.6rem' }}>
                      <div style={{ fontWeight: 600 }}>{e.role}{e.company ? ` — ${e.company}` : ''}</div>
                      {e.duration && <div style={{ color: 'var(--sp-text-secondary)', fontSize: '0.82rem' }}>{e.duration}</div>}
                      {e.bullets && e.bullets.split('\n').filter(b => b.trim()).map((b, j) => <div key={j} style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}>• {b.trim().replace(/^[-•]\s*/, '')}</div>)}
                    </div>
                  ))}
                </div>
              )}
              {resumeData.projects.some(p => p.name) && (
                <div>
                  <div style={sectionHeadStyle}>Projects</div>
                  {resumeData.projects.map((p, i) => p.name && (
                    <div key={i} style={{ marginBottom: '0.6rem' }}>
                      <div style={{ fontWeight: 600 }}>{p.name}</div>
                      {p.description && p.description.split('\n').filter(b => b.trim()).map((b, j) => <div key={j} style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}>• {b.trim().replace(/^[-•]\s*/, '')}</div>)}
                    </div>
                  ))}
                </div>
              )}
              {(resumeData.skillsLanguages || resumeData.skillsCore || resumeData.skillsTools || profile.skills?.length) && (
                <div>
                  <div style={sectionHeadStyle}>Technical Skills</div>
                  {(resumeData.skillsLanguages || profile.skills?.join(', ')) && <div style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}><strong>Languages:</strong> {resumeData.skillsLanguages || profile.skills?.join(', ')}</div>}
                  {(resumeData.skillsCore || profile.careerInterests?.join(', ')) && <div style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}><strong>Core:</strong> {resumeData.skillsCore || profile.careerInterests?.join(', ')}</div>}
                  {resumeData.skillsTools && <div style={{ color: 'var(--sp-text-secondary)', fontSize: '0.85rem' }}><strong>Tools:</strong> {resumeData.skillsTools}</div>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {!editing && (
        <div style={{ marginTop: '0.8rem', padding: '0.7rem', background: 'var(--sp-bg-tertiary)', borderRadius: 8, fontSize: '0.8rem', color: 'var(--sp-text-secondary)' }}>
          💡 Click "✏️ Edit Details" to add your college name, GPA, company, projects, and tools before downloading.
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

const sectionHeadStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  color: 'var(--sp-accent-teal)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '0.4rem',
  borderBottom: '1px solid rgba(0,212,212,0.2)',
  paddingBottom: '0.3rem',
};
