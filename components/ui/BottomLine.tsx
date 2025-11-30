"use client";
import { useEffect, useState } from "react";


export default function BottomLine()
{
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() =>
    {
        const handleScroll = () => setHasScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div 
            className={ "absolute inset-x-0 bottom-0 h-[0.5svh] bg-light-fg "
              + (hasScrolled ? "opacity-0" : "opacity-100 duration-1000")
            }
        />
    );
}