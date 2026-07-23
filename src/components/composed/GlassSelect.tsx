"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { springSnappy } from "@/lib/motion/transitions";

interface GlassSelectOption {
  value: string;
  label: string;
}

interface GlassSelectProps {
  id: string;
  label: string;
  placeholder: string;
  options: GlassSelectOption[];
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
}

/**
 * A theme-consistent replacement for the native <select>, whose dropdown
 * list renders with the OS/browser's own white background regardless of
 * CSS on the trigger — impossible to fully reconcile with the dark glass
 * theme. This is a real listbox (keyboard-navigable, ARIA-compliant), so it
 * behaves like a native select everywhere it matters except that one visual
 * inconsistency.
 */
export function GlassSelect({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  optional,
}: GlassSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const openAndHighlightCurrent = () => {
    const currentIndex = options.findIndex((option) => option.value === value);
    setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
    setIsOpen(true);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openAndHighlightCurrent();
    }
  };

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setHighlightedIndex(0);
        break;
      case "End":
        event.preventDefault();
        setHighlightedIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
      if (
    highlightedIndex >= 0 &&
    highlightedIndex < options.length
) {
    onChange(options[highlightedIndex]!.value);
    setIsOpen(false);
}
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <label htmlFor={id} className="text-sm font-medium text-text-secondary">
        {label}
        {optional && <span className="ml-1 font-normal text-text-tertiary">(optional)</span>}
      </label>

      <div className="relative">
        <button
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={`${id}-listbox`}
          onClick={() => (isOpen ? setIsOpen(false) : openAndHighlightCurrent())}
          onKeyDown={handleTriggerKeyDown}
          className="flex w-full items-center justify-between rounded-lg border border-glass-border/[0.14] bg-glass-fill/[0.06] px-4 py-3 text-left text-text-primary outline-none transition-colors focus-visible:border-accent/60 focus-visible:outline-2 focus-visible:outline-accent"
        >
          <span className={selected ? "text-text-primary" : "text-text-tertiary"}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            size={16}
            className={cn("text-text-tertiary transition-transform duration-200", isOpen && "rotate-180")}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              id={`${id}-listbox`}
              role="listbox"
              tabIndex={-1}
              aria-labelledby={id}
              onKeyDown={handleListKeyDown}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={springSnappy}
              className="glass-surface absolute left-0 right-0 top-[calc(100%+8px)] z-20 max-h-64 overflow-auto rounded-xl border-glass-border/[0.16] bg-bg-secondary/95 p-1.5 shadow-glass-lg backdrop-blur-glass-lg"
            >
              {options.map((option, index) => {
                const isSelected = option.value === value;
                const isHighlighted = index === highlightedIndex;
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      isHighlighted ? "bg-glass-fill/[0.1] text-text-primary" : "text-text-secondary",
                      isSelected && "text-accent"
                    )}
                  >
                    {option.label}
                    {isSelected && <Check size={14} className="shrink-0" />}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
