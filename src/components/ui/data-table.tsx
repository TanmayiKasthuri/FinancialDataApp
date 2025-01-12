// "use client"
import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

import { DatePickerWithRange } from './date-picker';

import { Input } from "./input";
import { cn } from "../../lib/utils";
import { IncomeStatement } from "../Table-Columns/IncomeStatementColumn";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  date?: string
  dataRaw: IncomeStatement[]
//   searchColumnId?: keyof TData extends string ? keyof TData : never;
}

// export const filterDataByRevenue = <TData extends { revenue: number }>(
//     data: TData[],
//     minRev: number,
//     maxRev: number
//   ): TData[] => {
//     return data.filter(item => item.revenue >= minRev && item.revenue <= maxRev);
//   };
  
  

export function DataTable<TData, TValue>({
  columns,
  data,
  date,
  dataRaw
//   searchColumnId,
  
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  console.log("Date Column ID:", date);
 
  

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  console.log(typeof(dataRaw))
  console.log(dataRaw)

  return (
    
    <div className="rounded-md border">
        <div className="flex flex-col-reverse md:flex-row items-start gap-y-2 md:gap-y-0 md:items-center justify-between py-4">
        {/* <Input
          placeholder="Filter emails..."
          value={(table.getColumn("revenue")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("revenue")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        
        {/* {searchColumnId && (
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn(searchColumnId)?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn(searchColumnId)?.setFilterValue(event.target.value)
            }
            className="border-b border-[#A2999E33] min-w-[200px]"
          />
        )} */}
        
        <div className="flex items-center gap-5">
            
          {date && <DatePickerWithRange table={table} date={date} />}
          {/* {table.getAllColumns().some((column) => column.getCanFilter()) && (
            <DataTableFilter table={table} />
          )} */}
        </div>
        {/* <div>
            <DatePickerWithRange/>
        </div> */}
      </div>
      <div className={cn('rounded-md border border-[#A2999E33] rounded-none border-x-0')}>
        <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id}>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </TableHead>
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>
    </div>
  )
}
