import Link from "@/components/ui/Link";


type ServicePreviewProps = {
  Icon: React.ElementType;
  title: string;
  paragraph: string;
  href: string;
  cta: string;
  className?: string;
}


export default function ServicePreview({ Icon, title, paragraph, href, cta, className }: ServicePreviewProps)
{
  return (
    <div className={ "flex flex-col items-center " + className }>
        <Icon className="h-15 text-primary"/>
        <h4>
            {title}
        </h4>
        <p className="text-light-muted-text max-w-[352px]">
            {paragraph}
        </p>
        <Link href={href} variant="primary">
            {cta}
        </Link>
    </div>
  );
}