import React, { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { FilterType } from '@/lib/filterUtils'
import { FilterInput, renderFilterValue } from './FilterComponents'

interface FilterPopoverProps {
  columnId: string
  filter: FilterType
  artistOptions: string[]
  updateFilter: (columnId: string, value: any) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const FilterPopover: React.FC<FilterPopoverProps> = ({
  columnId,
  filter,
  artistOptions,
  updateFilter,
  open,
  onOpenChange
}) => {
  const [currentFilterInput, setCurrentFilterInput] = useState<any>(filter?.value)

  useEffect(() => {
    setCurrentFilterInput(filter?.value)
  }, [filter])

  const handleUpdateFilter = () => {
    if (columnId) {
      updateFilter(columnId, currentFilterInput)
      onOpenChange(false)
    }
  }

  if (!columnId) return null

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost">{renderFilterValue(filter)}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Filter by {columnId}</h4>
          <FilterInput
            columnId={columnId}
            filter={filter}
            value={currentFilterInput}
            onChange={setCurrentFilterInput}
            options={artistOptions}
          />
          <Button onClick={handleUpdateFilter}>Apply Filter</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}