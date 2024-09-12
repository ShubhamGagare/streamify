import { Column } from 'react-table'
import { Stream, Filter, Filters } from '../types/types'
import { DateRange } from 'react-day-picker';

export type FilterType = 
  | { type: 'text'; value: string }
  | { type: 'checkbox'; value: string[] }
  | { type: 'date'; value: string }
  | { type: 'range'; value: [number, number] }


export const addFilter = (column: Column<Stream>): Filter => {
  switch (column.id) {
    case 'songName':
    case 'userId':
      return { type: 'text', value: '' }
    case 'artist':
      return { type: 'checkbox', value: [] }
    case 'dateStreamed':
      return { type: 'date', value: null }
    case 'streamCount':
      return { type: 'range', value: [0, 1000] }
    default:
      return { type: 'text', value: '' }
  }
}

export const updateFilter = (filters: Filters, columnId: string, value: any): Filters => {
  return { 
    ...filters, 
    [columnId]: { 
      ...filters[columnId], 
      value 
    } 
  }
}

export const removeFilter = (filters: Filters, columnId: string): Filters => {
  const newFilters = { ...filters }
  delete newFilters[columnId]
  return newFilters
}