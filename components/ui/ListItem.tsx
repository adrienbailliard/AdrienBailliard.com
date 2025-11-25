import BulletList from "@/components/icons/bulletList";


export default function ListItem({ children }: { children: React.ReactNode })
{
  return (
    <li className="flex items-center gap-3.5">
        <BulletList className="w-3.5 text-primary"/>
        {children}
    </li>
  );
}