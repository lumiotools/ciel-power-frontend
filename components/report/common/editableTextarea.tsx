"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, Pencil, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface EditableInput {
  className?: string;
  placeholder?: string;
  prefix?: string;
  value: string | number;
  onChange: (value: string | number) => void;
}

const ReportEditableTextArea = ({
  className,
  placeholder,
  prefix,
  value,
  onChange,
}: EditableInput) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <div className="relative flex items-top">
      {isEditing ? (
        <Textarea
          className={cn(className, "!h-auto w-screen")}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          autoFocus
        />
      ) : (
        <div
          className={cn(
            className,
            "flex-1 py-1 border border-transparent rounded-md break-all",
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
            className="size-10 ml-5 text-green-400 cursor-pointer"
            onClick={() => {
              onChange(currentValue);
              setIsEditing(false);
            }}
          />
          <X
            className="size-10 ml-5 text-red-400 cursor-pointer"
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

export default ReportEditableTextArea;
