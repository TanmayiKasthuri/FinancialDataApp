import * as React from 'react';
import { Calendar as LucideCalendar } from 'lucide-react';
import { format } from 'date-fns';

import { cn } from '../../lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Table } from '@tanstack/react-table';
import { DateRange } from 'react-day-picker';

interface DatePickerWithRangeProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  /** The ID of the column to filter by date. */
  date: string;
}

// export function filterDataByRevenue<TData>(
//     data: TData[],
//     minRev: number,
//     maxRev: number
//   ): TData[]
//   {
//     return data.filter(item => item.revenue >= minRev && item.revenue <= maxRev);
//   };

export function DatePickerWithRange<TData>({
  className,
  table,
  date
}: DatePickerWithRangeProps<TData>) {
  const dateColumn = table.getColumn(date);

  console.log(date)

  if (!dateColumn) return null;

  const dateRange = dateColumn.getFilterValue() as DateRange;

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-[300px] justify-start text-left font-normal rounded-md',
              !dateRange && 'text-muted-foreground'
            )}
          >
            <LucideCalendar className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                </>
              ) : (
                format(dateRange.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            //initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={dateColumn.setFilterValue}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
