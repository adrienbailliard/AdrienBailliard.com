export default function Dustbin({ className }: { className?: string })
{
  return (
    <svg viewBox="0 0 38 37" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_180_58)">
        <mask id="mask0_180_58" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="38" height="37">
          <path d="M38 0H0V37H38V0Z" fill="white"/>
        </mask>
        <g mask="url(#mask0_180_58)">
          <path d="M31.443 5.65L29.2428 34.0542C29.1581 35.1466 28.2411 35.99 27.1381 35.99H10.3049C9.20184 35.99 8.28479 35.1466 8.20013 34.0542L6 5.65H31.443Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M23.0981 15.17V27.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M15.1504 15.17V27.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M1 5.65H37" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M26.7165 5.6L25.7955 2.48762C25.5348 1.6067 24.7077 1.00004 23.7671 1H13.3492C12.4087 1.00004 11.5815 1.6067 11.3209 2.48762L10.3999 5.6H26.7165Z" stroke="currentColor" strokeWidth="2"/>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_180_58">
          <rect width="38" height="37" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}