"use client"
import Image from "next/image";
import { DataTable as DataTableRecursive } from "./data-table" 
import { formatDateToUserTz } from "../shared/utils/dateFormatters"

import { useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  title: string
}

function deepAccess(item, keys) {
  let tempItem = item;
  
  keys.forEach(key => {
    if(Array.isArray(tempItem)) {
      tempItem = tempItem.map(subItem => subItem[key])
    } else {
      tempItem = tempItem[key]
    }
  })

  return tempItem;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const [currentRow, setCurrentRow] = useState(null);
  const [currentCell, setCurrentCell] = useState(null);

  return (
    <div style={{maxWidth: "80vw"}}>
      <h1 className="text-lg font-bold text-uppercase text-zinc-800 mb-3">{title}</h1>

      <div className="flex max-md:flex-col max-md:gap-y-5 lg:gap-x-6">
        <div className="rounded-md border">
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
                      <TableCell style={{minWidth: "85px"}} key={cell.id} onClick={cell.column.columnDef.subHeader ? () => {
                        setCurrentRow(row);
                        setCurrentCell(cell);
                      } : () => {}}>
                        {
                          cell.column.columnDef.subHeader ?
                            <div className="flex items-center gap-x-1 cursor-pointer hover:underline">
                              <Image
                                aria-hidden
                                src="/eye.svg"
                                alt="File icon"
                                width={14}
                                height={14}
                              />
                              { cell.column.columnDef.subHeader }
                            </div>:
                            
                            
                            cell.column.columnDef.isDate ?
                            formatDateToUserTz(row.original[cell.column.columnDef.accessorKey]) :
                              flexRender(cell.column.columnDef.cell, cell.getContext())
                        }
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

        {
          currentRow && currentCell ?
          <DataTableRecursive
            columns={currentCell.column.columnDef.subColumns}
            title={`${currentCell.column.columnDef.subHeader} - ${currentRow.original[columns[0].accessorKey]}`}
            data={deepAccess(currentRow.original, currentCell.column.columnDef.subAccessorKey)}
          /> : 
          ""
        }
      </div>
    </div>
  )
}
