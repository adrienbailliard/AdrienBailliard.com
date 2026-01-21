"use client"

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { fr } from "react-day-picker/locale";

import { isSameMonth, addDays } from "date-fns";
import { toZonedTime } from 'date-fns-tz';

import newsletterConfig from "@/config/newsletter";
import Arrow from "@/components/icons/arrow";



type CalendarProps = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  className?: string;
};


export default function Calendar({ selectedDate, setSelectedDate, className }: CalendarProps)
{
  const today = new Date();
  const parisHour = parseInt(today.toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit"
  }));

  const start = parisHour >= newsletterConfig.publishParisHour
    ? addDays(today, 1)
    : today;

  const [month, setMonth] = useState<Date>(start);
  const isStartMonth = isSameMonth(month, start);


  const handleSelectDate = (date: Date | undefined) => setSelectedDate(date
      ? toZonedTime(
          date.setHours(newsletterConfig.publishParisHour), "Europe/Paris"
        )
      : date
    );


  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={handleSelectDate}
      locale={fr}
      startMonth={start}
      onMonthChange={setMonth}
      disabled={{ before: start }}
      className={`${className} relative select-none w-fit`}
      classNames={{
        month_caption: "mb-4 h-10 flex items-center justify-center",
        caption_label: "text-base font-medium",

        nav: "absolute flex inset-x-0 justify-between h-10 px-2",
        button_next: "w-10 h-10 flex justify-center items-center",
        button_previous: "w-10 h-10 flex justify-center items-center",

        weekdays: "flex",
        weekday: "text-light-muted-fg w-10 font-sans text-sm font-normal flex items-center justify-center",
        week: "mt-2 grid grid-cols-7",
        
        day_button: "w-10 h-10 text-sm font-sans flex items-center justify-center",

        selected: "text-primary font-bold",
        disabled: "text-light-muted-fg",
        today: "underline underline-offset-3"
      }}
      components={{
        PreviousMonthButton: (props) => isStartMonth
          ? <div/>
          : <button {...props}/>,
        Chevron: (props) => props.orientation === "right"
          ? <Arrow className="base-arrow" />
          : <Arrow className="base-arrow scale-x-[-1]" />
      }}
    />
  );
}