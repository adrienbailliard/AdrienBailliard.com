"use client"

import { useState } from "react";
import { DayPicker } from "react-day-picker";

import { isSameMonth } from "date-fns";
import { fr } from "react-day-picker/locale";

import Arrow from "@/components/icons/arrow";



type CalendarProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  className?: string;
};


export default function Calendar({ selectedDate, setSelectedDate, className }: CalendarProps)
{
  const today = new Date();
  const [month, setMonth] = useState<Date>(today);

  const isTodayMonth = isSameMonth(month, today);


  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      locale={fr}
      startMonth={today}
      onMonthChange={setMonth}
      disabled={{ before: today }}
      className={`${className} relative select-none`}
      classNames={{
        month_caption: "mb-4 h-10 flex items-center justify-center",
        caption_label: "text-base font-medium",

        nav: "absolute flex inset-x-0 justify-between h-10 px-2",
        button_next: "w-10 h-10 flex justify-center items-center",
        button_previous: "w-10 h-10 flex justify-center items-center",

        weekdays: "flex",
        weekday: "text-light-muted-text w-10 font-sans text-sm font-normal flex items-center justify-center",
        week: "mt-2 grid grid-cols-7",
        
        day_button: "w-10 h-10 text-sm font-sans flex items-center justify-center",
        
        selected: "text-primary",
        disabled: "text-light-muted-text"
      }}
      components={{
        PreviousMonthButton: (props) => isTodayMonth
          ? <div/>
          : <button {...props}/>,
        Chevron: (props) => props.orientation === "right"
          ? <Arrow className="base-arrow" />
          : <Arrow className="base-arrow scale-x-[-1]" />
      }}
    />
  );
}