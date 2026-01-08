"use client";


type DisplayFieldProps = {
  children: React.ReactNode;
  setIsEditing: (value: boolean) => void;
}


export default function DisplayField({ children, setIsEditing }: DisplayFieldProps)
{
    return (
        <>
            <button
                className='text-primary font-medium self-end'
                onClick={ () => setIsEditing(true) }
            >
                Modifier
            </button>
            { children }
        </>
    );
}