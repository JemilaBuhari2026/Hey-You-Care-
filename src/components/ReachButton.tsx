import type { ButtonHTMLAttributes } from "react";
import { btnPrimary, btnSecondary, chip } from "@/components/AppShell";

export function ReachButton({ variant = "primary", className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "tone" }) {
  return <button type="button" className={`${variant === "tone" ? chip : variant === "secondary" ? btnSecondary : btnPrimary} ${className}`} {...props} />;
}