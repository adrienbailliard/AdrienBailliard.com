type CTAProps = {
    title: React.ReactNode;
    paragraph: string;
    variant: "light" | "dark";
    children: React.ReactNode;
    className?: string;
}


export default function CTA({ title, paragraph, variant, children, className }: CTAProps)
{
    const oppositeColor = variant == "dark" ? "light" : "dark";

    return (
        <section id="cta" className={ "bg-" + oppositeColor + "-bg " + className }>
            <div className={ "text-" + oppositeColor + "-fg bg-" + variant + "-bg text-center rounded-md p-8 sm:p-12 lg:p-16" }>
                <h3>
                    { title }
                </h3>
                <p className={"text-" + oppositeColor + "-muted-text max-w-md mx-auto"}>
                    { paragraph }
                </p>
                { children }
            </div>
        </section>
    );
}