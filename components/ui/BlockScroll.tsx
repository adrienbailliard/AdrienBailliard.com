'use client'
import { useEffect } from 'react';


type BlockScrollProps = {
  isEnabled: boolean
}


export default function BlockScroll({ isEnabled }: BlockScrollProps)
{
    useEffect(() => {
        if (isEnabled) {
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
    }, [isEnabled])

  return null;
}