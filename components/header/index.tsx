"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

import Popup from "@/components/header/Popup";
import DesktopMenu from "@/components/header/DesktopMenu";
import MobileMenu from "@/components/header/MobileMenu";
import BurgerButton from "@/components/header/BurgerButton";
import BlockScroll from "@/components/ui/BlockScroll";

import pages from "@/config/navigation";
import site from "@/config/site";

import { useAuth } from '@/contexts/authentification';



export default function Header()
{
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const pathname = usePathname();
    const { isAdmin, logout } = useAuth();
    const pageEntries = useMemo(() => Array.from(pages.entries()), []);

    const [ctaHref, ctaPage] = pageEntries[pageEntries.length - 2];
    const actionButtonText = isAdmin ? "Quitter" : "Inscris-Toi";
    const getLinkClass = (href: string) => pathname === href ? " underline" : "";

    const closeMenuAndHandlePopup = () => {
        setIsMenuOpen(false);
        setIsPopupOpen(!isPopupOpen);
    };

    const actionButton = isAdmin ? logout : closeMenuAndHandlePopup;


    useEffect(() => {
        setIsMenuOpen(false);
        setIsPopupOpen(false);
    }, [pathname]);


    return (
        <>
            <header className="fixed w-full top-0 bg-dark-bg z-20">
                <BlockScroll isEnabled={isPopupOpen}/>

                <nav
                    role="navigation"
                    className="flex justify-between items-center h-header xl:h-header-xl underline-offset-10"
                >
                    <Link href="/" className="text-base xl:text-lg font-medium uppercase">
                        { site.name }
                    </Link>

                    <MobileMenu
                        setIsOpen={setIsMenuOpen}
                        actionButton={actionButton}
                        getLinkClass={getLinkClass}
                        isOpen={isMenuOpen}
                        actionButtonText={actionButtonText}
                        pageEntries={pageEntries}
                    />

                    <div className="flex items-center max-[520px]:gap-2 gap-5 lg:gap-8 xl:gap-11">
                        <DesktopMenu
                            getLinkClass={getLinkClass}
                            pageEntries={pageEntries}
                        />

                        <div className="flex gap-4 max-[360px]:hidden m-auto">
                            <Link href={ctaHref} className="max-[520px]:hidden button-compact inline-flex items-center rounded-lg inset-border font-medium">
                                { ctaPage }
                            </Link>
                            <button
                                onClick={actionButton}
                                className="button-compact bg-light-fg text-dark-fg rounded-lg font-medium"
                            >
                                {actionButtonText}
                            </button>
                        </div>

                        <BurgerButton isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}/>
                    </div>
                </nav>
            </header>
            <Popup
                isEnabled={isPopupOpen}
                setIsEnabled={setIsPopupOpen}
            />
        </>
    );
}