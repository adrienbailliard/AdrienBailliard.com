"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

import Popup from "@/components/header/Popup";
import DesktopMenu from "@/components/header/DesktopMenu";
import MobileMenu from "@/components/header/MobileMenu";
import BurgerButton from "@/components/header/BurgerButton";

import pageMapping from "@/config/pageMapping";
import site from "@/config/site";

import { useAuth } from '@/context/authentification';



function handleScrollLock(isPopupOpen: boolean)
{
    if (isPopupOpen) {
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
    }
    else {
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
    }

    return () => {
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
    };
}



export default function Header()
{
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const pathname = usePathname();
    const { isAdmin, logout } = useAuth();
    const pageEntries = useMemo(() => Array.from(pageMapping.entries()), []);

    const [ctaHref, ctaPage] = pageEntries[pageEntries.length - 2];
    const actionButtonText = isAdmin ? "Quitter" : "S'inscrire";
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

    useEffect(() => handleScrollLock(isPopupOpen), [isPopupOpen]);


    return (
        <>
            <header className="fixed w-full top-0 bg-dark-bg z-20">
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
                            <Link href={ctaHref} className="max-[520px]:hidden px-4 xl:px-6 h-8.5 xl:h-11 inline-flex items-center rounded-lg inset-border">
                                { ctaPage.name }
                            </Link>
                            <button
                                onClick={actionButton}
                                className="px-4 xl:px-6 h-8.5 xl:h-11 bg-light-fg text-dark-fg rounded-lg"
                            >
                                {actionButtonText}
                            </button>
                        </div>

                        <BurgerButton isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}/>
                    </div>
                </nav>
            </header>
            <Popup
                isOpen={isPopupOpen}
                setIsOpen={setIsPopupOpen}
            />
        </>
    );
}