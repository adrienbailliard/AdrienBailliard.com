"use client"
import { useState, useTransition } from 'react';

import { submitDraft, deleteDraft } from "@/lib/actions/newsletter";

import Button from "@/components/ui/Button";
import BlockScroll from "@/components/ui/BlockScroll";
import Calendar from "@/components/ui/Calendar";
import Modal from "@/components/ui/Modal";



type NewsletterDraftActionsProps = {
    id: number;
    scheduledFor: Date | null;
};


export default function DraftActions({ id, scheduledFor }: NewsletterDraftActionsProps)
{
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [isPending, startTransition] = useTransition();
    const [ isActiveModal, setIsActiveModal ] = useState(false);
    const [ modalType, setModalType ] = useState<"publish" | "delete" | "unschedule">('publish');

    const removeActionKey = scheduledFor ? "unschedule" : "delete";

    const modalConfig = {
        publish: {
            cta: 'Publier',
            confirmText: selectedDate ? "Programmer" : "Publier",
            loadingText: selectedDate ? "Programmation..." : 'Publication...',
            action: async () => submitDraft(id, selectedDate)
        },
        unschedule: {
            cta: 'Déprogrammer',
            confirmText: 'Déprogrammer',
            loadingText: 'Déprogrammation...',
            action: async () => submitDraft(id, null)
        },
        delete: {
            cta: 'Supprimer',
            confirmText: 'Supprimer',
            loadingText: 'Suppression...',
            action: async () => deleteDraft(id)
        },
    };


    const executeAction = () =>
        startTransition(async () => {
            try {
                await modalConfig[modalType].action();
            }
            catch {}
        });


    return (
        <>
            <section className="bg-dark-bg text-light-fg">
                <div className="flex gap-7 justify-center flex-wrap">
                    <BlockScroll isEnabled={ isActiveModal }/>

                    <Button
                        variant="light-primary"
                        onClick={ () => {
                            setIsActiveModal(true);
                            setModalType(removeActionKey);
                        }}
                    >
                        { modalConfig[removeActionKey].cta }
                    </Button>
                    <Button
                        variant="dark-primary"
                        onClick={ () => {
                            setIsActiveModal(true);
                            setModalType("publish");
                        }}
                    >
                        { modalConfig.publish.cta }
                    </Button>
                </div>
            </section>

            <Modal
                isEnabled={ isActiveModal }
                setIsEnabled={ setIsActiveModal }
            >
                <h3 className="mb-8 md:mb-10" id="modal-title">
                    { modalConfig[modalType].cta } le brouillon
                </h3>

                { modalType === "publish" && <Calendar
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    className="mb-7 md:mb-9 m-auto"
                /> }

                <div className='flex gap-5.5 md:gap-7 justify-center'>
                    <Button
                        variant="light-primary"
                        className='button-compact py-0'
                        onClick={ () => setIsActiveModal(false)}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="dark-primary"
                        className='button-compact py-0'
                        disabled={ isPending }
                        onClick={ executeAction }
                    >
                        { isPending
                            ? modalConfig[modalType].loadingText
                            : modalConfig[modalType].confirmText }
                    </Button>
                </div>
            </Modal>
        </>
    );
}