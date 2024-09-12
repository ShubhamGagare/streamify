import React, { useMemo, useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { useTable, useSortBy, useFilters, useGlobalFilter, Column } from 'react-table'
import { useFetch } from '@/hooks/useFetch'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronsUpDown } from 'lucide-react'
import { Stream, Filters } from '@/types/types'
import { FilterBadge } from './FilterBadge'
import { addFilter, updateFilter, removeFilter, FilterType } from '@/lib/filterUtils'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { FilterInput } from './FilterComponents'

export function StreamsTable() {
  const columns: Column<Stream>[] = useMemo(() => [
    { Header: 'Song Name', accessor: 'songName', type: "text" },
    { Header: 'Artist', accessor: 'artist', type: "checkbox" },
    { Header: 'Date Streamed', accessor: 'dateStreamed', type: "date" },
    { Header: 'Stream Count', accessor: 'streamCount', type: "range" },
    { Header: 'User ID', accessor: 'userId', type: "text" },
  ], [])

  const { data, loading } = useFetch<Stream[]>('http://localhost:3001/recentStreams')
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [filters, setFilters] = useState<Filters>({})
  const [artistOptions, setArtistOptions] = useState<string[]>([])
  const [currentFilterInput, setCurrentFilterInput] = useState<Record<string, any>>({})
  const [selectedColumn, setSelectedColumn] = useState<Column<Stream> | null>(null)

  const memoizedData = useMemo(() => data || [], [data])

  useEffect(() => {
    if (data) {
      const uniqueArtists = Array.from(new Set(data.map(stream => stream.artist)))
      setArtistOptions(uniqueArtists)
    }
  }, [data])
  const multiValueFilter = (rows, id, filterValue) => {
    const filterValues = Array.isArray(filterValue) ? filterValue : [];
    return rows.filter(row => {
      const cellValue = row.values[id];
      return filterValues.length === 0 || filterValues.includes(cellValue);
    });
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    setFilter,
  } = useTable(
    {
      columns,
      data: memoizedData,
      // filterTypes: {
      //   checkbox: multiValueFilter,
      // },
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

  const handleAddFilter = (column: Column<Stream>) => {
    const columnId = column.accessor as string
    const filterValue = currentFilterInput[columnId]
    console.log("columnId--",columnId)

    console.log("filterValue--",filterValue)
    setFilters((prev) => {
      console.log("prev--",prev)

      const updatedFilters = { ...prev }
      if (updatedFilters[columnId]) {
        updatedFilters[columnId].value = filterValue
      } else {
        updatedFilters[columnId] = {
          type: column.type as FilterType['type'],
          value: filterValue,
        }
      }
      return updatedFilters
    })

    setFilter(columnId, filterValue)
    console.log("filter--",filters)

    setFilterMenuOpen(false)
  }

  const handleRemoveFilter = (columnId: string) => {
    setFilters((prev) => removeFilter(prev, columnId))
    setFilter(columnId, undefined)
  }

  const handleUpdateFilter = (columnId: string, value: any) => {
    setFilters((prev) => updateFilter(prev, columnId, value))
    setFilter(columnId, value)
  }



  return (
    <div className='w-full bg-white rounded-2xl shadow-md border p-4 px-6'>
      <div className='flex-col pb-4 gap-2'>
        <div className='font-semibold'>Revenue Distribution</div>
        <div className='text-muted-foreground text-sm'>January - December 2024</div>
      </div>
      <div className='flex space-x-2 mb-4'>
        <Input
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search all columns..."
          className="flex-grow"
        />
        <Popover open={filterMenuOpen} onOpenChange={setFilterMenuOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={filterMenuOpen}
              className="w-[200px] justify-between"
            >
              Filter
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-fit p-2 space-x-2" align='end'>
            <Command className='w-fit'>
              <CommandList className='w-fit'>
                <CommandEmpty>No columns found.</CommandEmpty>
                <CommandGroup className='w-fit'>
                  {columns.map((column) => (
                    <CommandItem key={column.id} onSelect={() => setSelectedColumn(column)}>
                      {column.Header as string}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
            <Separator orientation='vertical' className=' h-auto'/>
            <div className='w-[300px]'>
              {selectedColumn ? 
                <div className="flex-col space-y-4">
                  <h4 className="font-medium leading-none">Filter by {selectedColumn?.Header as string}</h4>
                  <FilterInput
                    columnId={selectedColumn.accessor as string}
                    filter={{ type: selectedColumn.type as FilterType['type'], value: currentFilterInput[selectedColumn.accessor as string] }}
                    value={currentFilterInput[selectedColumn.accessor as string]}
                    onChange={(value) => setCurrentFilterInput(prev => ({ ...prev, [selectedColumn.accessor as string]: value }))}
                    options={artistOptions}
                  />
                  <Button
                    onClick={() => selectedColumn && handleAddFilter(selectedColumn)}
                  >
                    Apply Filter
                  </Button>
                </div> 
              : 
                <Label>Select a column</Label>
              }
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex flex-wrap gap-2 mb-4'>
        {Object.entries(filters).map(([columnId, filter]) => (
          <FilterBadge
            key={columnId}
            columnId={columnId}
            columnName={columns.find(col => col.accessor === columnId)?.Header as string}
            filter={filter}
            removeFilter={handleRemoveFilter}
            artistOptions={artistOptions}
            updateFilter={handleUpdateFilter}
          />
        ))}
      </div>
      <Table {...getTableProps()}>
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
  )
}