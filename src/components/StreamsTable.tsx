import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { useTable, useSortBy, useFilters, useGlobalFilter, Column } from 'react-table'
import { useFetch } from '@/hooks/useFetch'
//import ErrorBoundary from './ErrorBoundary'

interface Stream {
  songName: string
  artist: string
  dateStreamed: string
  streamCount: number
  userId: string
}

const columns: Column<Stream>[] = [
  { Header: 'Song Name', accessor: 'songName' },
  { Header: 'Artist', accessor: 'artist' },
  { Header: 'Date Streamed', accessor: 'dateStreamed' },
  { Header: 'Stream Count', accessor: 'streamCount' },
  { Header: 'User ID', accessor: 'userId' },
]

export  function StreamsTable() {
  const { data, loading } = useFetch<Stream[]>('http://localhost:3001/recentStreams')

  const memoizedData = useMemo(() => data || [], [data])
  const memoizedColumns = useMemo(() => columns, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    { 
      columns: memoizedColumns,
      data: memoizedData,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  )

  const { globalFilter } = state

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data || data.length === 0) {
    return <div>No data available</div>
  }

  return (
    <>
    
    <div className='w-full bg-white rounded-2xl shadow-md border  p-4 px-6'>
    <div className='flex-col pb-4 gap-2'>
    <div className='font-semibold'>Revenue Distribution</div>
    <div className='text-muted-foreground text-sm'>January - December 2024</div>
    </div>
      <Input
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search all columns..."
        className="mb-4"
      />
      <Table {...getTableProps()} >
        <TableHeader>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHead {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      </div>
    </>
  )
}

// export function StreamsTable() {
//   return (
//     <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Streams</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <StreamsTableContent />
//         </CardContent>
//       </Card>
//     </ErrorBoundary>
//   )
// }