"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Popup from "@/components/header/Popup";
import DesktopMenu from "@/components/header/DesktopMenu";
import MobileMenu from "@/components/header/MobileMenu";
import BurgerButton from "@/components/header/BurgerButton";
import { handleScrollLock } from "@/components/header/utils";

import site from "@/config/site";



export default function Header({ isAdmin }: { isAdmin: boolean })
{
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const pathname = usePathname();

    const closeMenuAndHandlePopup = () => {
        setIsMenuOpen(false);
        setIsPopupOpen(!isPopupOpen);
    };

    const logoutAdmin = () => {
        document.cookie = `${site.adminCookie.name}=; path=${site.adminCookie.path}; max-age=0`;
        window.location.reload();
    };

    const getLinkClass = (href: string) => pathname === href ? " underline" : "";
    const actionButton = isAdmin ? logoutAdmin : closeMenuAndHandlePopup;
    const actionButtonText = isAdmin ? "Quitter" : "S'inscrire";


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
                    <Link href="/" className="text-base xl:text-lg font-medium">
                        ADRIEN BAILLIARD
                    </Link>

                    <MobileMenu
                        setIsOpen={setIsMenuOpen}
                        actionButton={actionButton}
                        getLinkClass={getLinkClass}
                        isOpen={isMenuOpen}
                        actionButtonText={actionButtonText}
                    />

                    <div className="flex items-center max-[520px]:gap-2 gap-5 lg:gap-8 xl:gap-11">
                        <DesktopMenu getLinkClass={getLinkClass}/>

                        <div className="flex gap-4 max-[360px]:hidden m-auto">
                            <Link href="/contact/" className="max-[520px]:hidden px-4 xl:px-6 h-8.5 xl:h-11 inline-flex items-center rounded-lg inset-border">
                                Contact
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