import Link from "next/link";
import pageMapping from "@/config/pageMapping";


interface DesktopNavProps
{
  getLinkClass: (href: string) => string;
  actionButton: () => void;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  actionButtonText: string;
}


export default function MobileMenu({ actionButtonText, actionButton, getLinkClass, isOpen, setIsOpen }: DesktopNavProps)
{
    const fadeSlideUp = () => isOpen ? "duration-350 visible opacity-100 " : "-translate-y-2 invisible opacity-0 ";
    const delayInc = 40;

    return (
        <>
            <div
                onClick={() => setIsOpen(false)}
                className={ "absolute inset-0 top-full h-[100vh] "
                + ( isOpen
                    ? "visible"
                    : "invisible"
                )
            }/>
            <div className=
                {
                    "hidden duration-250 absolute top-full left-0 w-full flex-col bg-dark-bg pt-6 pb-8 max-lg:flex items-center gap-7 max-h-[calc(100vh-var(--spacing-header))] overflow-y-auto "
                    + (isOpen
                        ? "visible opacity-100"
                        : "-translate-y-3.5 invisible opacity-0"
                    )
                }
            >
                {
                    Array.from(pageMapping.entries()).map(([key, value], index) =>
                        index > 0 && index < pageMapping.size - 1
                        ? (
                            <Link
                                key={key}
                                href={key}
                                className={
                                    fadeSlideUp() + getLinkClass(key)
                                    + (index == pageMapping.size - 2 ?  " min-[520px]:hidden" : "")
                                }
                                style={{ transitionDelay: (index * delayInc) + 'ms' }}
                            >
                                {value.name}
                            </Link>
                        )
                        : null
                    )
                }
                <button
                    onClick={ actionButton }
                    className={fadeSlideUp() + "min-[360px]:hidden px-4 h-8 inset-border rounded-lg"}
                    style={{ transitionDelay: ((pageMapping.size + 1) * delayInc) + 'ms' }}
                >
                    {actionButtonText}
                </button>
            </div>
        </>
    );
}