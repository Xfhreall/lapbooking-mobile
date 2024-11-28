"use client";

import { cn } from "@/lib/utils";

interface FieldTypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const fieldTypes = ["Sepak Bola", "Badminton", "Voli", "Basket"];

export function FieldTypeFilter({
  selectedType,
  onTypeChange,
}: FieldTypeFilterProps) {
  return (
    <div className="flex space-x-4 overflow-x-auto pb-2">
      {fieldTypes.map((type) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={cn(
            "whitespace-nowrap px-4 py-2 text-sm transition-colors",
            selectedType === type
              ? "border-b-2 border-primary font-semibold text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
