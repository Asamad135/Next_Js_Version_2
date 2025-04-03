'use client'
import { DataTable as CarbonDataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@carbon/react';

interface Header {
  key: string;
  header: string;
}

interface DataTableProps {
  data: any[];
  headers: Header[];
}

export default function DataTable({ data, headers }: DataTableProps) {
  return (
    <CarbonDataTable rows={data} headers={headers}>
      {({ rows, headers, getHeaderProps, getTableProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {row.cells.map((cell: any) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </CarbonDataTable>
  );
}
