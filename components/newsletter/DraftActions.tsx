"use client"
import { useState } from 'react';

import { publishDraft, deleteDraft } from "@/lib/actions/newsletter";

import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import BlockScroll from "@/components/ui/BlockScroll";
import Modal from "@/components/ui/Modal";



type NewsletterDraftActionsProps = {
    id: number;
    slug: string;
};


const modalConfig = {
    publish: {
        confirmText: 'Publier',
        loadingText: 'Publication...',
        action: publishDraft
    },
    delete: {
        confirmText: 'Supprimer',
        loadingText: 'Suppression...',
        action: deleteDraft
    },
};



export default function DraftActions({ id, slug }: NewsletterDraftActionsProps)
{
    const [ isActiveModal, setIsActiveModal ] = useState(false);
    const [ isActionPending, setIsActionPending ] = useState(false);
    const [ modalType, setModalType ] = useState<"publish" | "delete">('publish');


    return (
        <>
            <section className="bg-dark-bg text-light-fg">
                <div className="flex gap-7 justify-center flex-wrap">
                    <BlockScroll isEnabled={ isActiveModal }/>

                    <Link
                        variant="light-primary"
                        href={ `/admin/newsletter/modifier?slug=${slug}`
                    }>
                        Modifier
                    </Link>
                    <Button
                        variant="light-primary"
                        onClick={ () => {
                            setIsActiveModal(true);
                            setModalType("delete");
                        }}
                    >
                        { modalConfig.delete.confirmText }
                    </Button>
                    <Button
                        variant="dark-primary"
                        onClick={ () => {
                            setIsActiveModal(true);
                            setModalType("publish");
                        }}
                    >
                        { modalConfig.publish.confirmText }
                    </Button>
                </div>
            </section>

            <Modal
                isEnabled={ isActiveModal }
                setIsEnabled={ setIsActiveModal }
            >
                <h3 className='mb-7 md:mb-11'>
                    { modalConfig[modalType].confirmText } ce brouillon ?
                </h3>
                <div>
                    <Button
                        variant="light-primary"
                        className='button-compact py-0 mr-5 md:mr-8'
                        onClick={ () => setIsActiveModal(false)}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="dark-primary"
                        className='button-compact py-0'
                        onClick={ () => {
                            modalConfig[modalType].action(id, slug);
                            setIsActionPending(true);
                        }}
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