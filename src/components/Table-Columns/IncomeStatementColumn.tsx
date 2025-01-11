import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import {ArrowUpDown} from "lucide-react";
import { dateRangeFilterFn } from "./Shared";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type IncomeStatement = {
    date: string;
    revenue: number;
    netIncome: number;
    grossProfit: number;
    eps: number;
    operatingIncome: number;
}

export const columns: ColumnDef<IncomeStatement>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    filterFn: dateRangeFilterFn,
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Revenue
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "netIncome",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Net Income
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "grossProfit",
    header: "GrossProfit",
  },
  {
    accessorKey: "eps",
    header: "Earning Per Share",
  },
  {
    accessorKey: "operatingIncome",
    header: "OperatingIncome",
  }
]

// {
//     accessorKey: 'title',
//     header: ({ column }) => <DataTableColumnHeader column={column} title="Event" />,
//     enableColumnFilter: false
//   },
//   {
//     accessorKey: 'date',
//     header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
//     cell: ({ row }) => <DataTableDateCell date={row.original.date} />,
//     filterFn: dateRangeFilterFn,
//     enableColumnFilter: false
//   },
//   {
//     accessorKey: 'location',
//     meta: {
//       displayName: 'Location'
//     },
//     header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />
//   },
//   {
//     accessorKey: 'type',
//     meta: {
//       displayName: 'Type'
//     },
//     header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
//     cell: ({ row }) => row.original.type ?? 'Unknown'
//   },
//   {
