import style from "./style.module.css";
import { Calendar } from "@/shadcncomponents/ui/calendar";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

type Props = {
  date: DateRange | undefined;
  setDate: (arg0: DateRange | undefined) => void;
  bussyDays: Date[];
};

const SelectDatum = ({ bussyDays, date, setDate }: Props) => {
  const [openCalendar, setOpenCalendar] = useState(false);

  const text = useMemo(() => {
    if (!date) return "Odaberite";
    if (date.from && date.to)
      return `${format(date.from, "LLL dd, y")} - ${format(
        date.to,
        "LLL dd, y"
      )}`;
    if (date.from) return `${format(date.from, "LLL dd, y")}`;
    return "Odaberite";
  }, [date]);

  return (
    <div className="flex flex-col items-center">
      <p className="mt-4">{text}</p>
      <Calendar
        initialFocus
        mode="range"
        modifiers={{ bussy: bussyDays}}
        modifiersClassNames={{ bussy: style.bussy}}
        defaultMonth={date?.from}
        selected={date}
        onSelect={setDate}
        numberOfMonths={1}
        className="border rounded-md"
      />
    </div>
  );
};

export default SelectDatum;