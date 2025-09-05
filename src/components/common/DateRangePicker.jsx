// src/components/common/DateRangePicker.jsx
"use client";

import * as React from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DateRangePicker({ value, onChange, onClear }) {
  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            size={"lg"}
            className={cn(
              "w-[280px] justify-between text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value?.from ? (
                value.to ? (
                  <>
                    {format(value.from, "dd MMM yyyy")} -{" "}
                    {format(value.to, "dd MMM yyyy")}
                  </>
                ) : (
                  format(value.from, "dd MMM yyyy")
                )
              ) : (
                <span>Pilih rentang tanggal</span>
              )}
            </div>
            {value && (
              <X
                className="h-4 w-4 opacity-60 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear?.();
                }}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
          />
          {value && (
            <div className="p-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => onClear?.()}
              >
                Clear Filter
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
