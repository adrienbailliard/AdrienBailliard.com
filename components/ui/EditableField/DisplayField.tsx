type DisplayFieldProps = {
  children: React.ReactNode;
  onEdit: (value: boolean) => void;
  isDisabled: boolean;
  variant: "light" | "dark";
}


export default function DisplayField({ children, onEdit, isDisabled, variant }: DisplayFieldProps)
{
    return (
        <>
            <button
                className={ `${isDisabled ? `text-${variant}-muted-text` : "text-primary"} font-medium self-end` }
                onClick={ () => onEdit(true) }
                disabled={isDisabled}
            >
                Modifier
            </button>
            { children }
        </>
    );
}