"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import fieldMaxLengths from "@/config/fieldMaxLengths";
import { EMAIL_PATTERN } from "@/lib/constants";
import site from "@/config/site";
import { handleSubmit } from "@/lib/form/handlers";
import { request } from "@/lib/actions/guide";
import { subscribe } from "@/lib/actions/newsletter";



type FormProps = {
  children: React.ReactNode;
  className?: string;
  isForNewsletter?: boolean;
}


export default function BaseForm({ children, className, isForNewsletter = true }: FormProps)
{
  const [hasError, setHasError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const action = isForNewsletter ? subscribe : request;


  return (
    <>
      { isSubmitted ?
        (
          <Button
            variant={ hasError ? "light-error" : "light-primary" }
            onClick={ () => {
              setIsSubmitted(false);
              setHasError(false);
            }}
            className={"w-full " + className}
          >
            { hasError ? site.errorMessage : "Tu es dans la boucle !" }
          </Button>
        ) :
        (
          <form
            onSubmit={(e) => handleSubmit(e, action, setIsSubmitted, setHasError)}
            className={className}
          >
            <div className="flex max-sm:flex-col max-sm:gap-5 gap-4">
                <input
                    className="flex-grow md:w-sm min-sm:w-2xs max-sm:h-11 h-12 md:h-13 px-4"
                    placeholder="Email"
                    name="email"
                    type="email"
                    pattern={EMAIL_PATTERN}
                    autoComplete="email"
                    maxLength={fieldMaxLengths.email}
                    required
                />
                <Button
                    type="submit"
                    name="submitButton"
                    variant="dark-primary"
                    className="shrink-0"
                >
                    { children }
                </Button>
            </div>
          </form>
        )
      }
    </>
  );
}