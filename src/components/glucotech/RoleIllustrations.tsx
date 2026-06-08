export function PatientIllustration() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="pat-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E1F5EE" />
          <stop offset="100%" stopColor="#9FE1CB" />
        </linearGradient>
        <linearGradient id="pat-shirt" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1D9E75" />
          <stop offset="100%" stopColor="#0F6E56" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#pat-bg)" className="animate-pulse" style={{ animationDuration: "3s" }} />
      <g className="origin-center animate-[float_3s_ease-in-out_infinite]" style={{ transformOrigin: "60px 60px" }}>
        <ellipse cx="60" cy="98" rx="28" ry="6" fill="#085041" opacity="0.12" />
        <circle cx="60" cy="38" r="18" fill="#F4D0B0" />
        <path d="M42 38 C42 28 50 22 60 22 C70 22 78 28 78 38" fill="#2C1810" />
        <rect x="38" y="54" width="44" height="36" rx="10" fill="url(#pat-shirt)" />
        <rect x="48" y="68" width="24" height="4" rx="2" fill="#E1F5EE" opacity="0.6" />
        <circle cx="60" cy="76" r="6" fill="#E1F5EE" opacity="0.4" />
        <rect x="30" y="58" width="12" height="28" rx="6" fill="url(#pat-shirt)" />
        <rect x="78" y="58" width="12" height="28" rx="6" fill="url(#pat-shirt)" />
        <rect x="46" y="88" width="12" height="22" rx="6" fill="#2C3E50" />
        <rect x="62" y="88" width="12" height="22" rx="6" fill="#2C3E50" />
        <rect x="72" y="62" width="18" height="24" rx="4" fill="#fff" stroke="#0F6E56" strokeWidth="2" />
        <line x1="76" y1="70" x2="86" y2="70" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" />
        <line x1="76" y1="76" x2="84" y2="76" stroke="#5DCAA5" strokeWidth="2" strokeLinecap="round" />
        <circle cx="81" cy="82" r="3" fill="#A32D2D" className="animate-pulse" />
      </g>
      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
    </svg>
  );
}

export function DoctorIllustration() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="doc-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E1F5EE" />
          <stop offset="100%" stopColor="#C0DD97" />
        </linearGradient>
        <linearGradient id="doc-coat" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#E8F6F0" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#doc-bg)" className="animate-pulse" style={{ animationDuration: "3.5s" }} />
      <g className="origin-center animate-[float_3.5s_ease-in-out_infinite]" style={{ transformOrigin: "60px 60px" }}>
        <ellipse cx="60" cy="98" rx="28" ry="6" fill="#085041" opacity="0.12" />
        <circle cx="60" cy="36" r="17" fill="#E8C4A8" />
        <path d="M43 36 C43 26 50 20 60 20 C70 20 77 26 77 36" fill="#4A3728" />
        <rect x="36" y="52" width="48" height="40" rx="8" fill="url(#doc-coat)" stroke="#0F6E56" strokeWidth="1.5" />
        <path d="M52 52 L60 64 L68 52" fill="none" stroke="#085041" strokeWidth="2" />
        <rect x="54" y="64" width="12" height="20" rx="2" fill="#085041" />
        <circle cx="60" cy="72" r="4" fill="#1D9E75" />
        <rect x="28" y="56" width="10" height="26" rx="5" fill="url(#doc-coat)" stroke="#0F6E56" strokeWidth="1" />
        <rect x="82" y="56" width="10" height="26" rx="5" fill="url(#doc-coat)" stroke="#0F6E56" strokeWidth="1" />
        <circle cx="33" cy="84" r="5" fill="#1D9E75" className="animate-pulse" style={{ animationDuration: "2s" }} />
        <rect x="46" y="90" width="13" height="20" rx="6" fill="#2C3E50" />
        <rect x="61" y="90" width="13" height="20" rx="6" fill="#2C3E50" />
        <rect x="78" y="48" width="16" height="20" rx="3" fill="#085041" opacity="0.9" />
        <circle cx="86" cy="54" r="4" fill="#5DCAA5" className="animate-pulse" />
        <path d="M82 62 L90 62" stroke="#9FE1CB" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
