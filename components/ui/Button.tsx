type ButtonProps = {
  type?: "submit" | "button";
  variant: "dark-primary" | "light-primary" | "light-error";
  children: React.ReactNode;
  name?: string;
  onClick?: () => void;
  className?: string;
}


export default function Button({ children, variant, type = "button", name, onClick, className }: ButtonProps)
{
  const baseStyles = " base-button " + className;

  const variantStyles = {
    "dark-primary": "bg-primary text-dark-fg",
    "light-primary": "inset-border text-primary",
    "light-error": "inset-border text-error"
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={variantStyles[variant] + baseStyles}
      name={name}
    >
      {children}
    </button>
  );
}