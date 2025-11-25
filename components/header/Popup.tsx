"use client";

import Cross from "@/components/icons/cross";

import Form from '@/components/ui/BaseForm';
import { useState, useEffect } from "react";


type PopupProps = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};


export default function Popup({ isOpen, setIsOpen }: PopupProps)
{
    const animationDuration = 300;
    const [ isClosed, setIsClosed ] = useState(true);


    useEffect(() =>
    {
        if (isOpen)
            setIsClosed(false);
        else
        {
            const timeout = setTimeout(() => setIsClosed(true), animationDuration);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);


    return (
        <>
            <div
                onClick={() => setIsOpen(false)}
                className={ "duration-200 bg-black/55 fixed inset-0 z-50 "
                + ( isOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                )
            }/>
            <div
                role="dialog"
                aria-modal={isOpen}
                className={
                    "fixed z-50 left-1/2 -translate-y-1/2 -translate-x-1/2 max-h-[100vh] overflow-y-auto bg-dark-elevated-bg max-[540px]:px-5 py-12 px-16 md:py-14 md:px-18 w-screen sm:max-w-xl md:max-w-2xl sm:rounded-lg text-center duration-" + animationDuration
                    + ( isOpen
                        ? " visible opacity-100 top-1/2"
                        : " invisible opacity-0 " + (isClosed ? "top-[53%]" : "top-1/2")
                    )
                }
            >
                <button
                    aria-label="Fermer"
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 flex justify-center items-center h-10.5 w-10.5 "
                >
                    <Cross className="w-4.5"/>
                </button>
                <h2>
                    Reçois <span className="[letter-spacing:-0.04em]">AUTO <span className="font-extralight">MONDAY</span></span>
                </h2>
                <p className='max-w-xs md:max-w-sm mx-auto'>
                    Accède chaque lundi aux meilleurs systèmes pour automatiser comme le top 1%.
                </p>
                <Form>
                    Reçois-La
                </Form>
            </div>
        </>
    );
}