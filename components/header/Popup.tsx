"use client";

import Form from '@/components/ui/BaseForm';
import Modal from "@/components/ui/Modal";


type PopupProps = {
  isEnabled: boolean;
  onClose: () => void;
};


export default function Popup({ isEnabled, onClose }: PopupProps)
{
    return (
        <Modal
            isEnabled={isEnabled}
            onClose={onClose}
        >
            <h2 id="modal-title">
                Reçois <span className="[letter-spacing:-0.04em]">AUTO <span className="font-extralight">MONDAY</span></span>
            </h2>
            <p className='max-w-xs md:max-w-sm mx-auto'>
                Accède chaque lundi à une clé pour automatiser comme le top 1%.
            </p>
            <Form>
                Inscris-Toi
            </Form>
        </Modal>
    );
}