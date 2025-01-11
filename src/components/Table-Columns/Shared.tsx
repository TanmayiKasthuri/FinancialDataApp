import { Row } from "@tanstack/react-table";
import { isSameDay, isWithinInterval } from "date-fns";
import { DateRange } from "react-day-picker";

export function dateRangeFilterFn<TData>(
    row: Row<TData>,
    columnId: string,
    { from, to }: DateRange
  ) {
    const date = new Date(row.getValue(columnId));
  
    if (!from && !to) return true;
    if (from && !to) return isSameDay(from, date);
    if (!from && to) return isSameDay(date, to);
    if (!!from && !!to && isSameDay(from, to)) return isSameDay(from, date);
  
    return isWithinInterval(date, { start: from!, end: to! });
  }