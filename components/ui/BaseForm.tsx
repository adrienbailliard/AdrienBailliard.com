"use client";

import Button from "@/components/ui/Button";
import fieldMaxLengths from "@/config/fieldMaxLengths";
import { EMAIL_PATTERN, ERROR_MESSAGE, PENDING_MESSAGE } from "@/lib/constants";

import { useFormAction } from "@/lib/form/hooks";
import { request } from "@/lib/actions/guide";
import { subscribe } from "@/lib/actions/newsletter";



type FormProps = {
  children: React.ReactNode;
  className?: string;
  isForNewsletter?: boolean;
}


export default function BaseForm({ children, className, isForNewsletter = true }: FormProps)
{
  const action = isForNewsletter ? subscribe : request;
  const [submissionSuccess, onSubmit, isPending, setIsReset] = useFormAction(action);


  if (submissionSuccess === true)
  {
    return (
      <Button
        variant="dark-primary"
        onClick={ () => setIsReset(true) }
        className={"w-full " + className}
      >
        { "Tu es dans la boucle !" }
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
              variant={ submissionSuccess === false && !isPending ? "dark-error" : "dark-primary" }
              className="shrink-0"
              disabled={isPending}
          >
            { isPending
              ? PENDING_MESSAGE
              : submissionSuccess === false
                ? ERROR_MESSAGE
                : children }
          </Button>
      </div>
    </form>
  );
}