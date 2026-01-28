"use client";

import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

import Button from "@/components/ui/Button";
import fieldMaxLengths from "@/config/fieldMaxLengths";

import { EMAIL_PATTERN, ERROR_MESSAGE, PENDING_MESSAGE } from "@/lib/constants";
import { useFormAction } from "@/lib/form/hooks";
import { contact } from "@/lib/actions/message";



export default function ContactForm()
{
  const [category, setCategory] = useState("");
  const [isSubmit, setIsSubmit, onSubmit, isPending] = useFormAction(contact);

  const categories = ["Projet", "Collaboration", "Question"];


  if (isSubmit === true)
  {
    return (
      <section className="bg-light-bg">
        <Button
          onClick={ () => {
            setCategory("");
            setIsSubmit(null);
          }}
          variant="light-primary"
          className="block mx-auto"
        >
          { "Merci ! À très vite" }
        </Button>
      </section>
    );
  }

  
  return (
    <section className="bg-light-bg">
      <div>
        <form
          onSubmit={onSubmit}
          className="flex justify-between gap-7 sm:gap-9 flex-wrap items-start"
        >
          <div className="w-full max-w-xl mx-auto contact">
            <h5>
                Coordonnées
            </h5>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                <div>
                    <label htmlFor="firstName">Prénom</label>
                    <input id="firstName" name="firstName" type="text" autoComplete="given-name" maxLength={fieldMaxLengths.firstName} required/>
                </div>
                <div>
                    <label htmlFor="lastName">Nom</label>
                    <input id="lastName" name="lastName" type="text" autoComplete="family-name" maxLength={fieldMaxLengths.lastName} required/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" pattern={EMAIL_PATTERN} maxLength={fieldMaxLengths.email} required/>
                </div>
                <div>
                    <label htmlFor="company">Entreprise</label>
                    <input id="company" name="company" type="text" autoComplete="organization" maxLength={fieldMaxLengths.company} required/>
                </div>
            </div>
          </div>
          <div className="w-full max-w-xl mx-auto">
            <div className="mb-7 sm:mb-9 contact">
                <h5>
                    Ta Demande
                </h5>
                <div className="flex justify-between gap-4 max-sm:flex-wrap">
                    {categories.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setCategory(c)}
                            className={ "inset-border " + (category === c ? "text-light-fg" : "bg-light-bg text-dark-fg") }
                        >
                            {c}
                        </button>
                    ))}
                </div>
                <input name="category" type="hidden" value={category}/>
                <div className={ "transition-opacity duration-300 " + (category == "" ? "h-0 overflow-hidden opacity-0" : "mt-8 opacity-100") }>
                    <label htmlFor="content">Message</label>
                    <TextareaAutosize id="content" name="content" maxLength={fieldMaxLengths.content} required className="resize-none" minRows={6}/>
                </div>
            </div>
            <Button
                type="submit"
                variant={ isSubmit === false && !isPending ? "light-error" : "light-primary" }
                disabled={isPending}
            >
              { isPending
                ? PENDING_MESSAGE
                : isSubmit === false
                  ? ERROR_MESSAGE
                  : "Lance l'Échange" }
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}