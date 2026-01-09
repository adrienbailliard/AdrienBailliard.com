type BurgerButtonProps =
{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}


export default function BurgerButton({ isOpen, setIsOpen }: BurgerButtonProps)
{
    return (
        <button
            aria-expanded={ isOpen }
            aria-label="Menu"
            onClick={ () => setIsOpen(!isOpen)}
            className={`flex justify-center items-center flex-col -mr-3 w-12 lg:hidden h-12 ${
                isOpen ? "" : "space-y-1.5"
            }`}
        >
            <span className={`duration-300 w-6 h-0.5 bg-light-fg rounded-full ${ isOpen ? "rotate-45 translate-y-0.5" : "" }`}></span>
            <span className={`duration-300 w-6 h-0.5 bg-light-fg rounded-full ${ isOpen ? "opacity-0" : "" }`}></span>
            <span className={`duration-300 w-4 h-0.5 bg-light-fg rounded-full ${ isOpen ? "-rotate-45 w-6 -translate-y-0.5" : "mr-2" }`}></span>
        </button>
    );
}