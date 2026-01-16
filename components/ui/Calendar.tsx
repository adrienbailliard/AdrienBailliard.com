"use client"

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { fr } from "date-fns/locale";



type CalendarProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  className?: string;
};


export default function Calendar({ selectedDate, setSelectedDate, className }: CalendarProps)
{
  return (
    <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        locale={fr}
        className={className}
    />
  );
}