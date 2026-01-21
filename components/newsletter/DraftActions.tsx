"use client"

import { useState, useTransition } from 'react';

import { useNewsletterEditor } from '@/contexts/newsletterEditor';
import { submitDraft, deleteDraft } from "@/lib/actions/newsletter";

import Button from "@/components/ui/Button";
import BlockScroll from "@/components/ui/BlockScroll";
import Calendar from "@/components/ui/Calendar";
import Modal from "@/components/ui/Modal";

import { Newsletter } from "@/lib/types";



export default function DraftActions()
{
    const { optimisticNewsletter, savingTransition } = useNewsletterEditor();
    const [ isSavingPending ] = savingTransition;

    const [selectedDate, setSelectedDate] = useState<Date>();
    const [isActionPending, startTransition] = useTransition();
    const [ isActiveModal, setIsActiveModal ] = useState(false);
    const [ modalType, setModalType ] = useState<"publish" | "delete" | "unschedule">('publish');

    const hasId = "id" in optimisticNewsletter;
    const removeActionKey = hasId && optimisticNewsletter.scheduled_for ? "unschedule" : "delete";

    const modalConfig = {
        publish: {
            cta: 'Publier',
            confirmText: selectedDate ? "Programmer" : "Publier",
            loadingText: selectedDate ? "Programmation..." : 'Publication...',
            action: async (id: number) => submitDraft(id, selectedDate)
        },
        unschedule: {
            cta: 'Déprogrammer',
            confirmText: 'Déprogrammer',
            loadingText: 'Déprogrammation...',
            action: async (id: number) => submitDraft(id, null)
        },
        delete: {
            cta: 'Supprimer',
            confirmText: 'Supprimer',
            loadingText: 'Suppression...',
            action: async (id: number) => deleteDraft(id)
        },
    };


    const executeAction = (id: number) =>
        startTransition(async () => {
            try {
                await modalConfig[modalType].action(id);
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
                        disabled={ !hasId }
                        className={ !hasId ? "!text-dark-muted-fg" : "" }
                        onClick={ () => {
                            setIsActiveModal(true);
                            setModalType(removeActionKey);
                        }}
                    >
                        { modalConfig[removeActionKey].cta }
                    </Button>
                    <Button
                        variant="dark-primary"
                        disabled={ !hasId || isSavingPending }
                        className={ !hasId || isSavingPending ? "!bg-dark-muted-fg" : "" }
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
                        disabled={ isActionPending }
                        onClick={ () =>
                            executeAction((optimisticNewsletter as Newsletter).id) }
                    >
                        { isActionPending
                            ? modalConfig[modalType].loadingText
                            : modalConfig[modalType].confirmText }
                    </Button>
                </div>
            </Modal>
        </>
    );
}