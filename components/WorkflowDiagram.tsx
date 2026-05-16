"use client";

export default function WorkflowDiagram() {
  const steps = [
    {
      title: 'Find people',
      sub: 'Source',
      meta: '12,175 rows',
      iconBg: 'linear-gradient(135deg,#f5d0fe,#e879f9)',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7e22ce" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    },
    {
      title: 'Enrich leads',
      sub: 'Table',
      meta: '12,175 rows, 12 cols',
      badge: '1',
      iconBg: 'linear-gradient(135deg,#bfdbfe,#60a5fa)',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>,
    },
    {
      title: 'Spring 2025 campaign',
      sub: 'Campaign',
      meta: '12,175 rows',
      badge: '1.1/row',
      iconBg: 'linear-gradient(135deg,#bbf7d0,#4ade80)',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    },
    {
      title: 'Campaign events',
      sub: 'Table',
      meta: '12,175 rows, 12 cols',
      iconBg: 'linear-gradient(135deg,#fef3c7,#fbbf24)',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    },
  ];

  return (
    <div className="bg-[#0d0d14] rounded-xl p-7 w-full">
      <style>{`
        @keyframes wf-flow{0%{stroke-dashoffset:24}100%{stroke-dashoffset:0}}
        @keyframes wf-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes wf-pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes wf-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes wf-slide{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
        .wf-line{stroke-dasharray:4 3;animation:wf-flow .7s linear infinite}
        .wf-panel{animation:wf-slide .6s .9s both,wf-float 3s 1.5s ease-in-out infinite}
        .wf-dot{animation:wf-pulse 2s ease-in-out infinite}
        .wf-s1{animation:wf-in .5s .1s both}
        .wf-s2{animation:wf-in .5s .3s both}
        .wf-s3{animation:wf-in .5s .5s both}
        .wf-s4{animation:wf-in .5s .7s both}
      `}</style>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: 16, alignItems: 'start' }}>

        {/* LEFT — steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.title} className={`wf-s${i + 1}`}>
              <div style={{ background: '#fff', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#111', lineHeight: 1.2 }}>{s.title}</div>
                  <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{s.sub}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 10, color: '#aaa' }}>{s.meta}</span>
                  {s.badge && (
                    <span style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 5, padding: '1px 5px', fontSize: 10, color: '#16a34a', fontWeight: 600 }}>{s.badge}</span>
                  )}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: 26, height: 26, alignItems: 'center' }}>
                  <svg width="2" height="26" style={{ overflow: 'visible' }} aria-hidden="true">
                    <line className="wf-line" x1="1" y1="0" x2="1" y2="26" stroke="#ccc" strokeWidth="1.5"/>
                    <circle cx="1" cy="13" r="3.5" fill="#fff" stroke="#ddd" strokeWidth="1.5"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT — floating message panel */}
        <div className="wf-panel" style={{ background: '#fff', borderRadius: 12, padding: 14, boxShadow: '0 4px 24px rgba(0,0,0,0.35)' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>Message draft</div>

          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#444', marginBottom: 4 }}>Email name</div>
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 8px', fontSize: 11, color: '#374151' }}>First message</div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#444', marginBottom: 4 }}>Subject</div>
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, padding: '5px 7px', display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' as const }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: 4, padding: '1px 5px', fontSize: 10, color: '#1d4ed8', fontWeight: 500 }}>
                T Firstname <span style={{ color: '#93c5fd' }}>×</span>
              </span>
              <span style={{ fontSize: 11, color: '#374151' }}>, quick question</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#444', marginBottom: 4 }}>Body</div>
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 6, padding: '7px 8px', fontSize: 11, color: '#374151', lineHeight: 1.6 }}>
              Hello{' '}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: 4, padding: '1px 4px', fontSize: 10, color: '#1d4ed8', fontWeight: 500 }}>
                T Firstname <span style={{ color: '#93c5fd' }}>×</span>
              </span>
              ,
              <div style={{ marginTop: 3, color: '#6b7280', fontSize: 10 }}>I'm working with technology companies...</div>
            </div>
          </div>

          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
            <div className="wf-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ fontSize: 10, color: '#9ca3af' }}>Auto-personalized</span>
          </div>
        </div>

      </div>
    </div>
  );
}