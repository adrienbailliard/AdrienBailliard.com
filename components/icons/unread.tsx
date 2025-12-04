export default function Unread({ className }: { className: string })
{
  return (
    <svg viewBox="0 0 202 151" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="158.5" cy="42.5" r="37.5" fill="currentColor"/>
        <path d="M15.75 63.8L81.7888 101.155C86.8554 104.021 93.0787 103.91 98.0391 100.863L125.5 84" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <line x1="177" y1="109" x2="177" y2="92" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M87 40H104" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M99 43H12C8.68629 43 6 45.6863 6 49V139C6 142.314 8.68629 145 12 145H168C171.314 145 174 142.314 174 139V101H180V139L179.996 139.31C179.834 145.691 174.691 150.834 168.31 150.996L168 151H12L11.6904 150.996C5.30896 150.834 0.165501 145.691 0.00390625 139.31L0 139V49C9.66416e-07 42.3726 5.37258 37 12 37H99V43Z" fill="currentColor"/>
    </svg>
  );
}