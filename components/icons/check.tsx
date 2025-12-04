export default function Check({ className }: { className?: string })
{
  return (
    <svg viewBox="0 0 44 30" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_180_2)">
        <mask id="mask0_180_2" style={{maskType: "luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="30">
          <path d="M44 0H0V30H44V0Z" fill="white"/>
        </mask>
        <g mask="url(#mask0_180_2)">
          <path d="M3 15.6158L13.4244 26.129C14.5758 27.2903 16.4426 27.2903 17.5941 26.129L40.5277 2.99998" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_180_2">
          <rect width="44" height="30" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}