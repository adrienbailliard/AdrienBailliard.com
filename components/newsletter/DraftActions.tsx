"use client"

import { useState, useTransition } from 'react';

import { useNewsletterEditor } from '@/contexts/newsletterEditor';
import { publishDraft, scheduleDraft, deleteDraft } from "@/lib/actions/newsletter";

import Button from "@/components/ui/Button";
import BlockScroll from "@/components/ui/BlockScroll";
import Calendar from "@/components/ui/Calendar";
import Modal from "@/components/ui/Modal";

import { ACTION_RETRY_LABEL } from "@/lib/constants";
import { Newsletter } from "@/lib/types";



type ModalType = "primary" | "delete" | "unschedule";


const modalConfig = {
    publish: {
        cta: 'Publier',
        loadingText: 'Publication...',
        action: (id: number) => publishDraft(id)
    },
    schedule: {
        cta: 'Programmer',
        loadingText: "Programmation...",
        action: (id: number, selectedDate: Date) => scheduleDraft(id, selectedDate)
    },
    unschedule: {
        cta: 'Déprogrammer',
        loadingText: 'Déprogrammation...',
        action: (id: number) => scheduleDraft(id, null)
    },
    delete: {
        cta: 'Supprimer',
        loadingText: 'Suppression...',
        action: (id: number) => deleteDraft(id)
    },
};



export default function DraftActions()
{
    const { newsletter, selectedEditors } = useNewsletterEditor();

    const [isActionPending, startTransition] = useTransition();
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [isModalActive, setIsModalActive] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [modal, setModal] = useState<ModalType>("delete");

    const hasId = "id" in newsletter;
    const isSubmitDisabled = selectedEditors.size > 0 || !hasId;

    const leftAction = !hasId || !newsletter.scheduled_for ? "delete" : "unschedule";
    const rightAction = selectedDate ? "schedule" : "publish";

    const config = modal === "primary"
        ? modalConfig[rightAction]
        : modalConfig[modal];


    const closeModal = () => setIsModalActive(false);

    const executeAction = (id: number) =>
        startTransition(async () => {
            try {
                await config.action(id, selectedDate!);
                setHasError(false);
                closeModal();
            }
            catch {
                setHasError(true);
            }
        });
    
    const openModal = (modalType: ModalType) => {
        setHasError(false);
        setModal(modalType);
        setIsModalActive(true);
    };


    return (
        <>
            <section className="bg-dark-bg text-light-fg">
                <div className="flex gap-7 justify-center flex-wrap">
                    <BlockScroll isEnabled={isModalActive}/>

                    <Button
                        variant="light-primary"
                        disabled={ !hasId }
                        className={ !hasId ? "!text-dark-muted-fg" : "" }
                        onClick={ () => openModal(leftAction) }
                    >
                        { modalConfig[leftAction].cta }
                    </Button>
                    <Button
                        variant="dark-primary"
                        disabled={ isSubmitDisabled }
                        className={ isSubmitDisabled ? "!bg-dark-muted-fg" : "" }
                        onClick={ () => openModal("primary") }
                    >
                        { modalConfig[rightAction].cta }
                    </Button>
                </div>
            </section>

            <Modal
                isEnabled={isModalActive}
                onClose={closeModal}
            >
                <h3 className="mb-8 md:mb-10" id="modal-title">
                    { config.cta } le brouillon
                </h3>

                { modal === "primary" && <Calendar
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    className="mb-7 md:mb-9 m-auto"
                /> }

                <div className='flex gap-5.5 md:gap-7 justify-center'>
                    <Button
                        variant="light-primary"
                        className='button-compact py-0'
                        onClick={closeModal}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant={ hasError && !isActionPending ? "dark-error" : "dark-primary" }
                        className='button-compact py-0'
                        disabled={ isActionPending }
                        onClick={ () =>
                            executeAction((newsletter as Newsletter).id) }
                    >
                        { isActionPending
                            ? config.loadingText
                            : hasError
                                ? ACTION_RETRY_LABEL
                                : config.cta }
                    </Button>
                </div>
            </Modal>
        </>
    );
}