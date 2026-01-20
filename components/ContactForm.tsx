"use client";
import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

import Button from "@/components/ui/Button";
import fieldMaxLengths from "@/config/fieldMaxLengths";

import { EMAIL_PATTERN, ERROR_MESSAGE } from "@/lib/constants";
import { handleSubmit } from "@/lib/form/handlers";
import { contact } from "@/lib/actions/message";



const INITIAL_VALUES = {
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    category: "",
    content: ""
};


export default function ContactForm()
{
    const [hasError, setHasError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [values, setValues] = useState(INITIAL_VALUES);

    const categories = ["Projet", "Collaboration", "Question"];

    const handleReset = () => {
        if (!hasError)
            setValues(INITIAL_VALUES); 

        setIsSubmitted(false);
        setHasError(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };


    return (
        <section className="bg-light-bg">
            <div>
            { isSubmitted ? (
                <Button
                    onClick={ handleReset }
                    variant={ hasError ? "light-error" : "light-primary" }
                    className="block mx-auto"
                >
                    { hasError ? ERROR_MESSAGE : "Merci ! À très vite" }
                </Button>
            ) : (
                <form onSubmit={(e) => handleSubmit(e, contact, setIsSubmitted, setHasError)} className="flex justify-between gap-7 sm:gap-9 flex-wrap items-start">
                    <div className="w-full max-w-xl mx-auto contact">
                        <h5>
                            Coordonnées
                        </h5>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                            <div>
                                <label htmlFor="firstName">Prénom</label>
                                <input id="firstName" name="firstName" type="text" autoComplete="given-name" maxLength={fieldMaxLengths.firstName} required
                                    value={values.firstName} onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName">Nom</label>
                                <input id="lastName" name="lastName" type="text" autoComplete="family-name" maxLength={fieldMaxLengths.lastName} required
                                    value={values.lastName} onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input id="email" name="email" type="email" autoComplete="email" pattern={EMAIL_PATTERN} maxLength={fieldMaxLengths.email} required
                                    value={values.email} onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="company">Entreprise</label>
                                <input id="company" name="company" type="text" autoComplete="organization" maxLength={fieldMaxLengths.company} required
                                    value={values.company} onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-xl mx-auto">
                        <div className="mb-7 sm:mb-9 contact">
                            <h5>
                                Ta Demande
                            </h5>
                            <div className="flex justify-between gap-4 max-sm:flex-wrap">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setValues(prev => ({ ...prev, category }))}
                                        className={ "inset-border " + (values.category === category ? "text-light-fg" : "bg-light-bg text-dark-fg") }
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                            <input name="category" type="hidden" value={values.category}/>
                            <div className={ "transition-opacity duration-300 " + (values.category == "" ? "h-0 overflow-hidden opacity-0" : "mt-8 opacity-100") }>
                                <label htmlFor="content">Message</label>
                                <TextareaAutosize id="content" name="content" maxLength={fieldMaxLengths.content} required
                                    value={values.content} onChange={handleChange} className="resize-none" minRows={6}
                                />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            name="submitButton"
                            variant="light-primary"
                        >
                            { "Lance l'Échange" }
                        </Button>
                    </div>
                </form>
            )}
            </div>
        </section>
    );
}