"use client";

import Button from "@/components/ui/Button";
import fieldMaxLengths from "@/config/fieldMaxLengths";
import { EMAIL_PATTERN, FORM_RETRY_LABEL, PENDING_MESSAGE } from "@/lib/constants";

import { useFormAction } from "@/lib/form/hooks";
import { request } from "@/lib/actions/guide";
import { subscribe } from "@/lib/actions/subscribers";



type FormProps = {
  children: React.ReactNode;
  className?: string;
  isForNewsletter?: boolean;
}


export default function BaseForm({ children, className, isForNewsletter = true }: FormProps)
{
  const action = isForNewsletter ? subscribe : request;
  const [isSubmit, setIsSubmit, onSubmit, isPending] = useFormAction(action);


  if (isSubmit === true)
  {
    return (
      <Button
        variant="dark-primary"
        onClick={ () => setIsSubmit(null) }
        className={"w-full " + className}
      >
        { "Tu es dans la boucle\u00A0!" }
      </Button>
    )
  }


  return (
    <form
      onSubmit={onSubmit}
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
              variant={ isSubmit === false && !isPending ? "dark-error" : "dark-primary" }
              className="shrink-0"
              disabled={isPending}
          >
            { isPending
              ? PENDING_MESSAGE
              : isSubmit === false
                ? FORM_RETRY_LABEL
                : children }
          </Button>
      </div>
    </form>
  );
}