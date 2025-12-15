"use client";

import Form from '@/components/ui/BaseForm';
import Modal from "@/components/ui/Modal";


type PopupProps = {
  isEnabled: boolean;
  setIsEnabled: (isEnabled: boolean) => void;
};


export default function Popup({ isEnabled, setIsEnabled }: PopupProps)
{
    return (
        <Modal
            isEnabled={isEnabled}
            setIsEnabled={setIsEnabled}
        >
            <h2>
                Reçois <span className="[letter-spacing:-0.04em]">AUTO <span className="font-extralight">MONDAY</span></span>
            </h2>
            <p className='max-w-xs md:max-w-sm mx-auto'>
                Accède chaque lundi aux meilleurs systèmes pour automatiser comme le top 1%.
            </p>
            <Form>
                Reçois-La
            </Form>
        </Modal>
    );
}