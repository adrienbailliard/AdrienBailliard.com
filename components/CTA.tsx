type CTAProps =
{
    title: React.ReactNode;
    paragraph: string;
    variant: "light" | "dark";
    children: React.ReactNode;
    className?: string;
}


export default function CTA({ title, paragraph, variant, children, className }: CTAProps)
{
    const oppositeColor = {
        "light": "dark",
        "dark": "light"
    }

    return (
        <section id="cta" className={ "bg-" + oppositeColor[variant] + "-bg " + className }>
            <div className={ "text-" + oppositeColor[variant] + "-fg bg-" + variant + "-bg text-center rounded-md p-8 sm:p-12 lg:p-16" }>
                <h3>
                    { title }
                </h3>
                <p className={"text-" + oppositeColor[variant] + "-muted-text max-w-md mx-auto"}>
                    { paragraph }
                </p>
                { children }
            </div>
        </section>
    );
}