import NextLink from "next/link";
import Arrow from "@/components/icons/arrow";


type LinkProps = {
  href: string;
  variant: "button-primary" | "primary";
  children: React.ReactNode;
  className?: string;
}


export default function Link({ children, variant, href, className }: LinkProps)
{
  const linkVariantStyles = {
    "primary": "text-primary base-link group ",
    "button-primary": "text-primary base-button inset-border inline-block "
  };


  return (
    <NextLink
        href={href}
        className={linkVariantStyles[variant] + className}
    >
      {children}
      {(variant === "primary") && (
        <Arrow className="base-arrow group-hover:translate-x-0.5"/>
      )}
    </NextLink>
  );
}