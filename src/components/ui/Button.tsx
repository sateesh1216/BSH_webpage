import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "gradient";

const variantClasses: Record<Variant, string> = {
  // Solid #155EEF - used for main CTAs
  primary: "bg-primary text-white hover:bg-primary-hover shadow-sm shadow-primary/20",
  // White + border - secondary actions
  outline: "bg-white text-slate-800 border border-slate-200 hover:border-primary/40 hover:text-primary",
  // linear-gradient(135deg, #EFF5FF, #DCEAFF) - only for "Our Taxi Fleet -> Book Now"
  gradient: "bg-fleet-btn text-primary hover:opacity-90",
};

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export default function Button(props: ButtonProps) {
  const { variant = "primary", children, className = "", icon } = props;
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 ${variantClasses[variant]} ${className}`;

  if (props.as === "a") {
    const { as: _as, variant: _v, children: _c, className: _cl, icon: _i, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {icon}
        {children}
      </a>
    );
  }

  const { as: _as, variant: _v, children: _c, className: _cl, icon: _i, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {icon}
      {children}
    </button>
  );
}