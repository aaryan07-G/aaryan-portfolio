import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  label: string;
  name: string;
  error?: string;
  hint?: string;
}

type InputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & { as?: "input" };
type TextareaProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" };

type FormFieldProps = InputProps | TextareaProps;

const fieldStyles =
  "w-full rounded-lg bg-glass-fill/[0.06] border border-glass-border/[0.14] px-4 py-3 text-text-primary placeholder:text-text-tertiary outline-none transition-colors focus:border-accent/60 focus:bg-glass-fill/[0.09]";

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  ({ label, name, error, hint, className, ...props }, ref) => {
    const errorId = error ? `${name}-error` : undefined;
    const hintId = hint ? `${name}-hint` : undefined;

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-sm font-medium text-text-secondary">
          {label}
        </label>

        {props.as === "textarea" ? (
          <textarea
            id={name}
            name={name}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            aria-invalid={Boolean(error)}
            aria-describedby={cn(errorId, hintId) || undefined}
            className={cn(fieldStyles, "min-h-40 resize-y", className)}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={name}
            name={name}
            ref={ref as React.Ref<HTMLInputElement>}
            aria-invalid={Boolean(error)}
            aria-describedby={cn(errorId, hintId) || undefined}
            className={cn(fieldStyles, className)}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {hint && !error && (
          <p id={hintId} className="text-xs text-text-tertiary">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
