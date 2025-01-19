"use client"
import Image from "next/image";
import { formatDateToUserTz } from "../shared/utils/dateFormatters"
import axios from "axios";
import { getBaseUrlClient } from "../constants/server"

import { useState } from "react";

import {
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


export function DataTable({
  columns,
  data,
  title,
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  async function loadSubData(row, cell) {
    try {
      const itemId = row.original.id;
  
      setCurrentRow(row);
      setCurrentCell(cell);

      const { data } = await axios.get(`${getBaseUrlClient()}/${cell.column.columnDef.subApiRoute}/${itemId}`);
  
      setSubData(data.map(c => ({
        ...c.course,
        enrolledAt: c.enrolledAt
      })));
    } catch(e) {
      setSubData([]);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const [currentRow, setCurrentRow] = useState(null);
  const [currentCell, setCurrentCell] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subData, setSubData] = useState([]);

  return (
    <div style={{maxWidth: "80vw"}} className="flex flex-col lg:flex-row gap-y-10 lg:gap-y-0 lg:gap-x-5">
      <div>
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
                          loadSubData(row, cell);
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
                              
                              
                              <div suppressHydrationWarning>
                                {cell.column.columnDef.isDate ?
                                  formatDateToUserTz(row.original[cell.column.columnDef.accessorKey]) :
                                  flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </div>
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
        </div>
      </div>

      {
        !isLoading ?
        <DataTable
          columns={currentCell.column.columnDef.subColumns}
          title={`${currentCell.column.columnDef.subHeader} - ${currentRow.original[columns[0].accessorKey]}`}
          data={subData}
        /> : 
        ""
      }
    </div>
  )
}
