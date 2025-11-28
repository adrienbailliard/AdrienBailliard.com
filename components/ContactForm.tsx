"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import fieldMaxLengths from "@/config/fieldMaxLengths";
import site from "@/config/site";
import { EMAIL_PATTERN } from "@/lib/constants";
import { handleSubmit } from "@/lib/form/handlers";
import { contact } from "@/app/actions/message";



export default function ContactForm()
{
    const [hasError, setHasError] = useState(false);
    const [selected, setSelected] = useState("");
    const categories = ["Projet", "Collaboration", "Question"];
    const [isSubmitted, setIsSubmitted] = useState(false);


    return (
        <>
            {
                isSubmitted ?
                (
                    <Button
                        onClick={ () => {
                            setIsSubmitted(false);
                            setHasError(false);
                        }}
                        variant={ hasError ? "light-error" : "light-primary" }
                        className="block mx-auto"
                    >
                        { hasError ? site.errorMessage : "Merci ! Je reviens très vite vers toi." }
                    </Button>
                ) :
                (
                    <form onSubmit={(e) => handleSubmit(e, contact, setIsSubmitted, setHasError)} className="flex justify-between gap-8 flex-wrap items-start">
                        <div className="w-full max-w-xl mx-auto contact">
                            <h5>
                                Coordonnées
                            </h5>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                                <div>
                                    <p>Prénom</p>
                                    <input name="firstName" type="text" autoComplete="given-name" maxLength={fieldMaxLengths.firstName} required/>
                                </div>
                                <div>
                                    <p>Nom</p>
                                    <input name="lastName" type="text" autoComplete="family-name" maxLength={fieldMaxLengths.lastName} required/>
                                </div>
                                <div>
                                    <p>Email</p>
                                    <input name="email" type="email" autoComplete="email" pattern={EMAIL_PATTERN} maxLength={fieldMaxLengths.email} required/>
                                </div>
                                <div>
                                    <p>Entreprise</p>
                                    <input name="company" type="text" autoComplete="organization" maxLength={fieldMaxLengths.company} required/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full max-w-xl mx-auto">
                            <div className="mb-8 contact">
                                <h5>
                                    Ta Demande
                                </h5>
                                <div className="flex justify-between gap-4 max-sm:flex-wrap">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            type="button"
                                            onClick={() => setSelected(category)}
                                            className={ "inset-border " + (selected === category ? "text-light-fg" : "bg-light-bg text-dark-fg") }
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                                <input name="category" type="hidden" value={selected}/>
                                <div className={ "transition-opacity duration-300 " + (selected == "" ? "h-0 overflow-hidden opacity-0" : "mt-8 opacity-100") }>
                                    <p>Message</p>
                                    <textarea name="message" maxLength={fieldMaxLengths.message} required/>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                name="submitButton"
                                variant="light-primary"
                            >
                                { "Démarrer l'échange" }
                            </Button>
                        </div>
                    </form>
                )
            }
        </>
    );
}