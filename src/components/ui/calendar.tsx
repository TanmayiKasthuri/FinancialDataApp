import { CustomComponents, DayPicker } from 'react-day-picker';
import { cn } from '../../lib/utils';
import { buttonVariants } from './button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;
interface ExtendedComponents extends CustomComponents {
  IconLeft: () => React.JSX.Element;
  IconRight: () => React.JSX.Element;
}
function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
  months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
  month: 'space-y-4',
  caption: 'flex justify-center py-2 rounded-md relative items-center bg-[#FCA31133]',
  caption_label: 'text-sm font-semibold',
  nav: 'space-x-1 flex items-center',
  nav_button: cn(
    'flex items-center justify-center transition-all shadow rounded-sm size-7 bg-white hover:bg-orange'
  ),
  nav_button_previous: 'absolute left-1',
  nav_button_next: 'absolute right-1',
  table: 'w-full border-collapse table-fixed', // Added table-fixed for consistent cell widths
  head_row: 'flex',
  head_cell: 'text-muted-foreground w-8 h-8 flex items-center justify-center font-normal text-[0.8rem]', // Ensured consistent size and alignment
  row: 'flex w-full space-x-[1px] mt-2', // Added space-x for consistent spacing between cells
  cell: cn(
    'relative w-8 h-8 p-0 text-center text-sm flex items-center justify-center focus-within:relative focus-within:z-20',
    '[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50',
    props.mode === 'range'
      ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
      : '[&:has([aria-selected])]:rounded-md'
  ),
  day: cn(
    buttonVariants({ variant: 'ghost' }),
    'h-8 w-8 p-0 mx-[1px] font-normal aria-selected:opacity-100'
  ),
  day_range_start: 'day-range-start',
  day_range_end: 'day-range-end',
  day_selected:
    'bg-orange hover:bg-orange focus:bg-orange text-primary-foreground hover:text-primary-foreground focus:text-primary-foreground',
  day_today: 'bg-accent text-accent-foreground',
  day_outside:
    'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
  day_disabled: 'text-muted-foreground opacity-50',
  day_range_middle: 'aria-selected:bg-[#FCA31133] aria-selected:text-accent-foreground',
  day_hidden: 'invisible',
  ...classNames,
}}

      components={
        {
          IconLeft: () => <ChevronLeftIcon className="h-4 w-4" />,
          IconRight: () => <ChevronRightIcon className="h-4 w-4" />
        } as ExtendedComponents
      }
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
