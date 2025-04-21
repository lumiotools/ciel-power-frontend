"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Pencil, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditableSelectProps {
  className?: string;
  prefix?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const ReportEditableSelect = ({
  className,
  prefix,
  value,
  options,
  onChange,
}: EditableSelectProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const selectedOption = options.find(
    (option) => option.value === currentValue
  );

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <div className="relative flex items-center">
      {isEditing ? (
        <Select
          value={currentValue}
          onValueChange={(val) => setCurrentValue(val)}
        >
          <SelectTrigger className={cn(className, "!h-auto")}>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div
          className={cn(
            className,
            "py-1 border border-transparent rounded-md",
            "cursor-pointer flex items-center"
          )}
          onClick={() => setIsEditing(true)}
        >
          {prefix}
          {selectedOption?.label || currentValue}
          {/* <ChevronDown className="ml-1 h-4 w-4 text-gray-500" /> */}
        </div>
      )}

      {!isEditing ? (
        <Pencil
          className="size-5 ml-5 text-gray-400 cursor-pointer"
          onClick={() => setIsEditing(true)}
        />
      ) : (
        <>
          <Check
            className="size-5 ml-5 text-green-400 cursor-pointer"
            onClick={() => {
              onChange(currentValue);
              setIsEditing(false);
            }}
          />
          <X
            className="size-5 ml-5 text-red-400 cursor-pointer"
            onClick={() => {
              setCurrentValue(value);
              setIsEditing(false);
            }}
          />
        </>
      )}
    </div>
  );
};

export default ReportEditableSelect;
