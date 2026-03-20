"use client";

import { cn } from "@/lib/utils/cn";

type Option<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/72">{label}</span>
      <div className="grid grid-cols-2 rounded-2xl border border-white/10 bg-black/20 p-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-xl px-3 py-2 text-sm font-medium transition",
              value === option.value
                ? "bg-white/12 text-white shadow-[0_6px_20px_rgba(121,196,255,0.15)]"
                : "text-white/55 hover:text-white",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </label>
  );
}
