export default function Arrow({ className }: { className: string })
{
  return (
    <svg viewBox="0 0 22 22" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_267_74)">
            <mask id="mask0_267_74" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="22" height="22">
                <path d="M22 0H0V22H22V0Z" fill="white"/>
            </mask>
            <g mask="url(#mask0_267_74)">
                <path d="M19.6501 0.503805L0.503849 19.6501C0.225581 19.9283 0.225581 20.3795 0.503849 20.6578L1.38559 21.5395C1.66385 21.8178 2.11502 21.8178 2.39328 21.5395L21.5396 2.39324C21.8178 2.11497 21.8178 1.66381 21.5396 1.38554L20.6578 0.503805C20.3796 0.225536 19.9284 0.225536 19.6501 0.503805Z" fill="currentColor"/>
                <path d="M21.5395 19.6501L2.39325 0.503849C2.11499 0.225581 1.66382 0.225581 1.38555 0.503849L0.503819 1.38559C0.22555 1.66385 0.22555 2.11502 0.503819 2.39328L19.6501 21.5396C19.9284 21.8178 20.3795 21.8178 20.6578 21.5396L21.5395 20.6578C21.8178 20.3796 21.8178 19.9284 21.5395 19.6501Z" fill="currentColor"/>
            </g>
        </g>
        <defs>
            <clipPath id="clip0_267_74">
                <rect width="22" height="22" fill="white"/>
            </clipPath>
        </defs>
    </svg>
  );
}