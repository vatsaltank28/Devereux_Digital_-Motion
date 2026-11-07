"use client";

import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { ArrowRight } from "./Icons";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
  /** Where the CTA sits — sent with the `cta_click` event (no personal data). */
  location?: string;
  onClick?: () => void;
}

const classes = (variant: "primary" | "secondary", size: "md" | "sm", className?: string) =>
  cn("btn", variant === "primary" ? "btn-primary" : "btn-secondary", size === "sm" && "btn-sm", className);

/** Link styled as a button. Internal routes use next/link; mailto:/tel:/external use a plain anchor. */
export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  location,
  onClick,
}: LinkButtonProps) {
  const handle = () => {
    track("cta_click", { location: location ?? "unspecified", label: typeof children === "string" ? children : undefined });
    onClick?.();
  };
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight />}
    </>
  );
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} className={classes(variant, size, className)} onClick={handle}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes(variant, size, className)} onClick={handle}>
      {content}
    </a>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  arrow?: boolean;
}

export function Button({ variant = "primary", size = "md", arrow = false, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={classes(variant, size, className)} {...rest}>
      <span>{children}</span>
      {arrow && <ArrowRight />}
    </button>
  );
}
