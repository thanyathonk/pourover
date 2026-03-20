"use client";

import { cn } from "@/lib/utils/cn";

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  columns?: 1 | 2 | 3;
  variant?: "cards" | "dropdown";
};

export function SelectField({
  label,
  value,
  options,
  onChange,
  columns = 2,
  variant = "cards",
}: SelectFieldProps) {
  if (variant === "dropdown") {
    return (
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-white/72">{label}</span>
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-sky-300/35 focus:bg-white/[0.08]"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-slate-950 text-white">
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <div className="block">
      <span className="mb-2 block text-sm font-medium text-white/72">{label}</span>
      <div
        className={cn(
          "grid gap-2.5 md:gap-3",
          columns === 3
            ? "grid-cols-1 md:grid-cols-3"
            : columns === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1",
        )}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-12 rounded-2xl border px-4 py-3 text-left transition duration-200",
              option.value === value
                ? "border-sky-300/40 bg-white/10 text-white shadow-[0_12px_30px_rgba(56,189,248,0.12)] ring-1 ring-sky-300/18"
                : "border-white/8 bg-white/[0.04] text-white/72 hover:border-white/16 hover:bg-white/[0.07] hover:text-white",
            )}
          >
            <p className="text-sm font-medium tracking-tight">{option.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
