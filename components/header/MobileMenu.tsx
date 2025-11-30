import Link from "next/link";
import { PageEntries } from "@/config/pageMapping";


interface MobileMenuProps
{
  getLinkClass: (href: string) => string;
  actionButton: () => void;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  actionButtonText: string;
  pageEntries: PageEntries;
}


export default function MobileMenu({ pageEntries, actionButtonText, actionButton, getLinkClass, isOpen, setIsOpen }: MobileMenuProps)
{
    const fadeSlideUp = () => isOpen ? "duration-350 visible opacity-100 " : "-translate-y-2 invisible opacity-0 ";
    const delayInc = 40;

    return (
        <>
            <div
                onClick={() => setIsOpen(false)}
                className={ "absolute inset-0 top-full h-[100dvh] "
                + ( isOpen
                    ? "visible"
                    : "invisible"
                )
            }/>
            <div className=
                {
                    "hidden duration-250 absolute top-full left-0 w-full flex-col bg-dark-bg pt-6 pb-8 max-lg:flex items-center gap-7 max-h-[calc(100dvh-var(--spacing-header))] overflow-y-auto "
                    + (isOpen
                        ? "visible opacity-100"
                        : "-translate-y-3.5 invisible opacity-0"
                    )
                }
            >
                {
                    pageEntries.map(([key, value], index) =>
                        index > 0 && index < pageEntries.length - 1
                        ? (
                            <Link
                                key={key}
                                href={key}
                                className={
                                    fadeSlideUp() + getLinkClass(key)
                                    + (index === pageEntries.length - 2 ? " min-[520px]:hidden" : "")
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
                    style={{ transitionDelay: ((pageEntries.length + 1) * delayInc) + 'ms' }}
                >
                    {actionButtonText}
                </button>
            </div>
        </>
    );
}