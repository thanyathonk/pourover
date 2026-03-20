"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

type NumberInputProps = {
  label: string;
  value: number;
  step?: number;
  min?: number;
  max?: number;
  suffix?: string;
  onChange: (value: number) => void;
};

function clamp(value: number, minVal: number | undefined, maxVal: number | undefined): number {
  if (minVal != null && value < minVal) return minVal;
  if (maxVal != null && value > maxVal) return maxVal;
  return value;
}

export function NumberInput({
  label,
  value,
  step = 1,
  min,
  max,
  suffix,
  onChange,
}: NumberInputProps) {
  const isInteger = step >= 1;
  const showDecimal = !isInteger;
  const displayValue = showDecimal ? value.toFixed(1) : String(Math.round(value));

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(displayValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.select();
      inputRef.current.focus();
    }
  }, [isEditing]);

  const sanitizeInput = useCallback(
    (raw: string): string => {
      if (isInteger) {
        return raw.replace(/[^0-9]/g, "");
      }
      const digitsAndDot = raw.replace(/[^0-9.]/g, "");
      const parts = digitsAndDot.split(".");
      if (parts.length <= 1) return digitsAndDot;
      return parts[0] + "." + parts.slice(1).join("");
    },
    [isInteger],
  );

  const commitEdit = useCallback(() => {
    const parsed = isInteger ? parseInt(editValue, 10) : parseFloat(editValue || "0");
    const safe = Number.isNaN(parsed)
      ? value
      : clamp(
          isInteger ? Math.round(parsed) : Math.round(parsed * 10) / 10,
          min,
          max,
        );
    onChange(safe);
    setEditValue(showDecimal ? safe.toFixed(1) : String(Math.round(safe)));
    setIsEditing(false);
  }, [editValue, isInteger, min, max, onChange, showDecimal, value]);

  const cancelEdit = useCallback(() => {
    setEditValue(displayValue);
    setIsEditing(false);
  }, [displayValue]);

  const handleDoubleClick = () => {
    setEditValue(displayValue);
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(sanitizeInput(e.target.value));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  };

  return (
    <label className="block">
      <div className="rounded-3xl border border-white/8 bg-white/[0.05] p-4 backdrop-blur-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="block text-sm font-medium text-white/72">{label}</span>
          </div>
          <div className="text-right">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                inputMode="decimal"
                value={editValue}
                onChange={handleInputChange}
                onBlur={commitEdit}
                onKeyDown={handleKeyDown}
                className="w-20 bg-transparent text-right text-2xl font-semibold tracking-tight text-white outline-none selection:bg-amber-300/30 md:text-[28px]"
              />
            ) : (
              <p
                onDoubleClick={handleDoubleClick}
                className="cursor-text select-none text-2xl font-semibold tracking-tight text-white md:text-[28px]"
                title="Double-click to edit"
              >
                {displayValue}
              </p>
            )}
            {suffix ? (
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/36">{suffix}</p>
            ) : null}
          </div>
        </div>
        <div className="mt-4">
          <input
            className={cn(
              "h-2 w-full cursor-ew-resize appearance-none rounded-full bg-white/10 accent-amber-300",
              "[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-white/10",
              "[&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-amber-200/60 [&::-webkit-slider-thumb]:bg-amber-300 [&::-webkit-slider-thumb]:shadow-[0_0_22px_rgba(251,191,36,0.65)]",
              "[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:border-0 [&::-moz-range-track]:bg-white/10",
              "[&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-amber-200/60 [&::-moz-range-thumb]:bg-amber-300",
            )}
            type="range"
            value={value}
            step={step}
            min={min}
            max={max}
            onChange={(event) => onChange(Number(event.target.value))}
          />
        </div>
      </div>
    </label>
  );
}
