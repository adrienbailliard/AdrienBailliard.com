"use client";

import { useState, useEffect } from "react";
import Cross from "@/components/icons/cross";



type ModalProps = {
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
  children: React.ReactNode;
};



export default function Modal({ isEnabled, setIsEnabled, children }: ModalProps)
{
    const animationDuration = 500;
    const [ isClosed, setIsClosed ] = useState(true);


    useEffect(() =>
    {
        if (isEnabled)
            setIsClosed(false);
        else
        {
            const timeout = setTimeout(() => setIsClosed(true), animationDuration);
            return () => clearTimeout(timeout);
        }
    }, [isEnabled]);



    return (
        <>
            <div
                onClick={ () => setIsEnabled(false) }
                className={ "duration-300 bg-black/55 fixed inset-0 z-50 "
                + ( isEnabled
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                )
            }/>
            <div
                role="dialog"
                aria-labelledby="modal-title"
                aria-modal={isEnabled}
                className={
                    "fixed flex flex-col items-center z-50 left-1/2 -translate-y-1/2 -translate-x-1/2 max-h-[100dvh] overflow-y-auto bg-dark-elevated-bg max-[540px]:px-5 py-12 px-16 md:py-14 md:px-18 w-dvw sm:max-w-xl md:max-w-2xl sm:rounded-lg text-center duration-" + animationDuration
                    + ( isEnabled
                        ? " visible opacity-100 top-1/2"
                        : " invisible opacity-0 " + (isClosed ? "top-[53%]" : "top-1/2")
                    )
                }
            >
                <button
                    aria-label="Fermer"
                    onClick={() => setIsEnabled(false)}
                    className="absolute top-3 right-3 flex justify-center h-10.5 w-10.5 "
                >
                    <Cross className="w-4.5"/>
                </button>
                { children }
            </div>
        </>
    );
}