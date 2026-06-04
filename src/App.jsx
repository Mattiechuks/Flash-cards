import { useState } from 'react'
import GNS303 from './courses/GNS303'
import PET303 from './courses/PET303'
import MTH311 from './courses/MTH311'
import AIT313 from './courses/AIT313'
import AIT311 from './courses/AIT311'
import SWD315 from './courses/SWD315'

const courses = [
  { code: 'SWD 311', title: 'Operating System',                    color: '#7c3aed', bg: '#ede9fe', dark: '#3b1f6e', starred: true  },
  { code: 'SWD 312', title: 'Database Design I',                   color: '#0891b2', bg: '#e0f2fe', dark: '#0c3a50', starred: false },
  { code: 'SWD 313', title: 'C++ Programming',                     color: '#dc2626', bg: '#fee2e2', dark: '#5a1010', starred: true  },
  { code: 'SWD 314', title: 'Operation Research',                  color: '#d97706', bg: '#fef3c7', dark: '#5a3206', starred: false },
  { code: 'SWD 315', title: 'Data Comms & Network',                color: '#059669', bg: '#d1fae5', dark: '#063d29', starred: false },
  { code: 'SWD 316', title: 'Intro to Software Engineering',       color: '#2563eb', bg: '#dbeafe', dark: '#1e3a8a', starred: false },
  { code: 'AIT 311', title: 'Computer Architecture',               color: '#0f766e', bg: '#ccfbf1', dark: '#134e4a', starred: false },
  { code: 'AIT 313', title: 'Artificial Intelligence',             color: '#9333ea', bg: '#f3e8ff', dark: '#4a1d96', starred: false },
  { code: 'GNS 303', title: 'Use of English III',                  color: '#16a34a', bg: '#dcfce7', dark: '#14532d', starred: false },
  { code: 'PET 303', title: 'Advance Petroleum Tech',              color: '#b45309', bg: '#fef9c3', dark: '#451a03', starred: false },
  { code: 'MTH 311', title: 'Advance Algebra',                     color: '#e11d48', bg: '#ffe4e6', dark: '#4c0519', starred: false },
]

const sections = [
  {
    id: 'flashcards',
    icon: '⚡',
    label: 'Flash Cards',
    desc: 'Active recall cards — flip, self-grade, and track your score per topic.',
    stats: key => flashcardPages[key] ? (key === 'SWD 311' ? 100 : key === 'SWD 313' ? 80 : 60) + ' cards' : 'Coming soon',
    action: key => flashcardPages[key] ? 'Study now' : 'Not available',
    tag: 'Active recall',
  },
  {
    id: 'notes',
    icon: '📖',
    label: 'Notes',
    desc: 'All lecture notes organised by topic and date. Searchable and always available.',
    stats: () => 'Coming soon',
    action: 'Coming soon',
    tag: 'Lecture notes',
    disabled: true,
  },
  {
    id: 'practicals',
    icon: '🔬',
    label: 'Practical Reports',
    desc: 'Lab write-ups with aims, procedures, observations and conclusions.',
    stats: () => 'Coming soon',
    action: 'Coming soon',
    tag: 'Lab work',
    disabled: true,
  },
  {
    id: 'cbt',
    icon: '🎯',
    label: 'CBT Testing',
    desc: 'Mock exams — Objective (MCQ), German-style, and Theory. Timed and scored.',
    stats: () => 'Coming soon',
    action: 'Coming soon',
    tag: 'Exam practice',
    disabled: true,
  },
]
function getGreeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}
const flashcardPages = {
  'GNS 303': GNS303,
  'PET 303': PET303,
  'MTH 311': MTH311,
  'AIT 313': AIT313,
  'AIT 311': AIT311,
  'SWD 315': SWD315,
}
export default function App() {
  const [selectedPage, setSelectedPage] = useState(null)
  const [activeCourse, setActiveCourse] = useState('AIT 311')
  const [hovered, setHovered] = useState(null)
  const [dark, setDark] = useState(false)

  const course = courses.find(c => c.code === activeCourse) || courses[0]
  const FlashcardPage = selectedPage ? flashcardPages[selectedPage] : null

  if (FlashcardPage) {
  return <FlashcardPage onBack={() => setSelectedPage(null)} />
  }
  // token aliases
  const T = {
    bg:         dark ? '#0f0f13' : '#f5f4f0',
    surface:    dark ? '#18181f' : '#ffffff',
    surface2:   dark ? '#22222c' : '#f9f8f5',
    border:     dark ? 'rgba(255,255,255,0.08)' : '#e6e4dc',
    border2:    dark ? 'rgba(255,255,255,0.14)' : '#d4d2c8',
    text:       dark ? '#f0eef8' : '#111111',
    text2:      dark ? '#9994b4' : '#6b7280',
    text3:      dark ? '#555070' : '#9ca3af',
    navBg:      dark ? '#13131a' : '#ffffff',
    cardHover:  dark ? '#1e1e28' : '#fafaf8',
    toggleBg:   dark ? '#2d2b40' : '#e9e8e2',
    toggleThumb:dark ? '#a78bfa' : '#7c3aed',
  }

  const accentColor  = course.color
  const accentLight  = dark ? course.dark : course.bg

  return (
    <div style={{ minHeight:'100vh', background:T.bg, color:T.text, fontFamily:"'Segoe UI',system-ui,sans-serif", transition:'background 0.25s, color 0.25s' }}>

      {/* ── Top Nav ── */}
      <nav style={{
        background: T.navBg,
        borderBottom: `1px solid ${T.border}`,
        padding: '0 24px', height:'58px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        position:'sticky', top:0, zIndex:100,
        transition:'background 0.25s',
      }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{
            width:'34px', height:'34px', borderRadius:'10px',
            background:`linear-gradient(135deg, ${accentColor}, ${accentColor}99)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'16px', fontWeight:'900', color:'#fff', letterSpacing:'-1px',
          }}>O</div>
          <div>
            <span style={{ fontWeight:'800', fontSize:'15px', color:accentColor, letterSpacing:'-0.3px' }}>Olise</span>
            <span style={{ fontWeight:'400', fontSize:'15px', color:T.text2, letterSpacing:'-0.3px' }}>Desk</span>
          </div>
          <span style={{
            fontSize:'10px', fontWeight:'700', letterSpacing:'1.5px',
            color: dark ? '#a78bfa' : '#7c3aed',
            background: dark ? '#2d2b40' : '#ede9fe',
            padding:'2px 8px', borderRadius:'20px', marginLeft:'4px',
          }}>BETA</span>
        </div>

        {/* Right side */}
        <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
          <span style={{ fontSize:'13px', color:T.text3, display:'none' }}>SWD · 300L</span>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(d => !d)}
            aria-label="Toggle dark mode"
            style={{
              width:'48px', height:'26px', borderRadius:'13px',
              background: T.toggleBg,
              border: `1px solid ${T.border2}`,
              cursor:'pointer', position:'relative',
              transition:'background 0.25s', flexShrink:0,
              padding:0,
            }}
          >
            <div style={{
              position:'absolute', top:'3px',
              left: dark ? '23px' : '3px',
              width:'18px', height:'18px', borderRadius:'50%',
              background: T.toggleThumb,
              transition:'left 0.22s ease',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'10px',
            }}>
              {dark ? '🌙' : '☀️'}
            </div>
          </button>

          {/* Avatar */}
          <div style={{
            width:'34px', height:'34px', borderRadius:'50%',
            background: `${accentColor}25`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'13px', fontWeight:'800', color:accentColor,
            border:`1.5px solid ${accentColor}44`,
          }}>OL</div>
        </div>
      </nav>

      <div style={{ maxWidth:'1120px', margin:'0 auto', padding:'36px 24px' }}>

        {/* ── Greeting ── */}
        <div style={{ marginBottom:'36px' }}>
          <p style={{ fontSize:'13px', color:T.text3, marginBottom:'4px', letterSpacing:'0.3px' }}>
            {new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long' })}
          </p>
          <h1 style={{ fontSize:'clamp(22px,4vw,32px)', fontWeight:'800', margin:'0 0 6px', color:T.text }}>
            {getGreeting()}, Scholar 👋
          </h1>
          <p style={{ fontSize:'15px', color:T.text2, margin:0 }}>
            Select a course, then choose what you want to do.
          </p>
        </div>

        {/* ── Course Selector ── */}
        <div style={{ marginBottom:'32px' }}>
          <p style={{ fontSize:'11px', fontWeight:'700', color:T.text3, letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'12px' }}>
            300 Level · Software &amp; Web Development
          </p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {courses.map(c => {
              const isActive = activeCourse === c.code
              return (
                <button
                  key={c.code}
                  onClick={() => setActiveCourse(c.code)}
                  style={{
                    padding:'9px 16px',
                    borderRadius:'12px',
                    border: isActive ? `2px solid ${c.color}` : `1.5px solid ${T.border}`,
                    background: isActive ? (dark ? c.dark : c.bg) : T.surface,
                    cursor:'pointer',
                    transition:'all 0.15s ease',
                    display:'flex', flexDirection:'column', gap:'2px',
                    textAlign:'left',
                  }}
                >
                  <span style={{ fontSize:'12px', fontWeight:'700', color: isActive ? c.color : T.text, display:'flex', alignItems:'center', gap:'4px' }}>
                    {c.code}
                    {c.starred && <span style={{ fontSize:'9px', color: isActive ? c.color : T.text3 }}>★</span>}
                  </span>
                  <span style={{ fontSize:'11px', color: isActive ? c.color+'bb' : T.text3, maxWidth:'130px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                    {c.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Active Course Banner ── */}
        <div style={{
          background: dark
            ? `linear-gradient(135deg, ${accentColor}30, ${accentColor}15)`
            : accentColor,
          border: dark ? `1px solid ${accentColor}40` : 'none',
          borderRadius:'18px',
          padding:'26px 28px',
          marginBottom:'32px',
          display:'flex', justifyContent:'space-between', alignItems:'center',
          flexWrap:'wrap', gap:'16px',
        }}>
          <div>
            <div style={{ fontSize:'11px', color: dark ? accentColor + 'aa' : 'rgba(255,255,255,0.7)', marginBottom:'6px', letterSpacing:'1.2px', textTransform:'uppercase' }}>
              Active course
            </div>
            <div style={{ fontSize:'26px', fontWeight:'900', color: dark ? accentColor : '#fff', marginBottom:'4px', letterSpacing:'-0.5px' }}>
              {course.code}
              {course.starred && <span style={{ fontSize:'16px', marginLeft:'8px' }}>⭐</span>}
            </div>
            <div style={{ fontSize:'15px', color: dark ? T.text2 : 'rgba(255,255,255,0.85)' }}>
              {course.title}
            </div>
          </div>
          <div style={{ display:'flex', gap:'24px' }}>
            {[{ label:'Cards', val:'—' },{ label:'Notes', val:'—' },{ label:'Tests', val:'—' }].map(s => (
              <div key={s.label} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'22px', fontWeight:'800', color: dark ? accentColor : '#fff' }}>{s.val}</div>
                <div style={{ fontSize:'11px', color: dark ? T.text3 : 'rgba(255,255,255,0.6)', marginTop:'2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4 Section Cards ── */}
        <p style={{ fontSize:'11px', fontWeight:'700', color:T.text3, letterSpacing:'1.2px', textTransform:'uppercase', marginBottom:'14px' }}>
          What would you like to do?
        </p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))', gap:'14px', marginBottom:'36px' }}>
          {sections.map(sec => {
            const isHov = hovered === sec.id
            const isDisabled = sec.disabled || (sec.id === 'flashcards' && !flashcardPages[activeCourse])
            return (
              <div
                  key={sec.id}
                  onMouseEnter={() => !isDisabled && setHovered(sec.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => {
                    if (sec.id === 'flashcards' && flashcardPages[activeCourse]) {
                      setSelectedPage(activeCourse)
                    }
                  }}
                  style={{
                    background: isDisabled ? T.surface2 : isHov ? (dark ? '#1e1e2a' : accentLight) : T.surface,
                    border: isDisabled ? `1.5px solid ${T.border}` : isHov ? `2px solid ${accentColor}` : `1.5px solid ${T.border}`,
                    borderRadius:'16px',
                    padding:'22px 20px',
                    cursor: isDisabled ? 'default' : 'pointer',
                    transition:'all 0.18s ease',
                    transform: isHov && !isDisabled ? 'translateY(-3px)' : 'none',
                    display:'flex',
                    flexDirection:'column',
                    gap:'14px',
                    opacity: isDisabled ? 0.55 : 1,
                    boxShadow: isHov && !isDisabled ? (dark ? `0 8px 30px ${accentColor}20` : `0 8px 24px ${accentColor}18`) : 'none',
                  }}
                >
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div style={{
                    width:'46px', height:'46px', borderRadius:'13px',
                    background: dark ? accentColor + '25' : accentLight,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'22px',
                  }}>{sec.icon}</div>
                  <span style={{
                    fontSize:'11px', fontWeight:'700',
                    color: isDisabled ? T.text3 : accentColor,
                    background: isDisabled ? T.surface2 : dark ? accentColor+'18' : accentLight,
                    padding:'4px 10px', borderRadius:'20px', letterSpacing:'0.3px',
                    border:`1px solid ${isDisabled ? T.border : accentColor+'30'}`,
                  }}>{sec.tag}</span>
                </div>
                <div>
                  <h3 style={{ fontSize:'16px', fontWeight:'700', margin:'0 0 6px', color:T.text }}>{sec.label}</h3>
                  <p style={{ fontSize:'13px', color:T.text2, margin:0, lineHeight:'1.6' }}>{sec.desc}</p>
                </div>
                <div style={{
                  display:'flex', justifyContent:'space-between', alignItems:'center',
                  marginTop:'auto', paddingTop:'10px',
                  borderTop:`1px solid ${T.border}`,
                }}>
                  <span style={{ fontSize:'12px', color:T.text3, fontWeight:'500' }}>{sec.stats(activeCourse)}</span>
                  <span style={{ fontSize:'13px', fontWeight:'700', color: isDisabled ? T.text3 : accentColor }}>
                    {typeof sec.action === 'function' ? sec.action(activeCourse) : sec.action} {isDisabled ? '' : '→'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── CBT Banner ── */}
        <div style={{
          background: dark ? '#13131e' : '#1a1a2e',
          borderRadius:'18px',
          padding:'28px',
          marginTop:'20px',
          display:'flex', justifyContent:'space-between', alignItems:'center',
          flexWrap:'wrap', gap:'18px',
          border: dark ? '1px solid rgba(255,255,255,0.07)' : 'none',
        }}>
          <div style={{ maxWidth:'420px' }}>
            <div style={{ fontSize:'11px', color:'#6b7280', marginBottom:'6px', letterSpacing:'1.2px', textTransform:'uppercase' }}>Exam simulation</div>
            <h2 style={{ fontSize:'20px', fontWeight:'800', color:'#fff', margin:'0 0 8px' }}>CBT Practice Centre</h2>
            <p style={{ fontSize:'13px', color:'#9ca3af', margin:0, lineHeight:'1.6' }}>
              Three test modes — Objective (MCQ), German-style (true/false with penalty), and full Theory. Timed. Scored. Reviewed.
            </p>
          </div>
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
            {[
              { label:'Objective', sub:'MCQ format',       color:'#818cf8', bg:'rgba(79,70,229,0.2)' },
              { label:'German',    sub:'With penalty',      color:'#fbbf24', bg:'rgba(217,119,6,0.2)'  },
              { label:'Theory',    sub:'Full essays',       color:'#34d399', bg:'rgba(5,150,105,0.2)'  },
            ].map(m => (
              <div key={m.label} style={{
                padding:'12px 20px', borderRadius:'12px', textAlign:'center',
                background:m.bg, border:`1px solid ${m.color}30`, cursor:'pointer',
                minWidth:'90px',
              }}>
                <div style={{ fontSize:'13px', fontWeight:'700', color:m.color }}>{m.label}</div>
                <div style={{ fontSize:'11px', color:'#6b7280', marginTop:'3px' }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign:'center', padding:'32px 0 12px', color:T.text3, fontSize:'12px' }}>
          OliseDesk · Software &amp; Web Development · HND 1 <br />
        </div>

      </div>
    </div>
  )
}
