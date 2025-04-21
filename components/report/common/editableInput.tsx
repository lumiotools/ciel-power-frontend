"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, Pencil, X } from "lucide-react";

interface EditableInput {
  className?: string;
  placeholder?: string;
  prefix?: string;
  type?: string;
  value: string | number;
  onChange: (value: string | number) => void;
}

const ReportEditableInput = ({
  className,
  placeholder,
  prefix,
  type,
  value,
  onChange,
}: EditableInput) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <div className="relative flex items-center">
      {isEditing ? (
        <Input
          className={cn(className, "!h-auto")}
          type={type}
          value={currentValue}
          placeholder={placeholder}
          onChange={(e) => setCurrentValue(e.target.value)}
          autoFocus
        />
      ) : (
        <div
          className={cn(
            className,
            "py-1 border border-transparent rounded-md",
            "cursor-pointer"
          )}
          onClick={() => setIsEditing(true)}
        >
          {!currentValue ? (
            <p className="!text-gray-400/75">{placeholder}</p>
          ) : (
            <>
              {prefix}
              {currentValue}
            </>
          )}
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

export default ReportEditableInput;
