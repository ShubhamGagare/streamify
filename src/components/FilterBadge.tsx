import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { Filter } from '@/types/types'
import { FilterPopover } from '@/components/FilterPopover'
import { renderFilterValue } from './FilterComponents'

interface FilterBadgeProps {
  columnId: string
  columnName: string
  filter: Filter
  removeFilter: (columnId: string) => void
  artistOptions: string[]
  updateFilter: (columnId: string, value: any) => void
}

export const FilterBadge: React.FC<FilterBadgeProps> = ({ 
  columnId, 
  columnName, 
  filter, 
  removeFilter,
  artistOptions,
  updateFilter
}) => {
  const [popoverOpen, setPopoverOpen] = React.useState<boolean>(false)

  const handleBadgeClick = () => {
    setPopoverOpen(!popoverOpen)
  }

  return (
    <Badge 
      variant="secondary" 
      className="h-9 px-3 py-2 gap-1 cursor-pointer"
      onClick={handleBadgeClick}
    >
      <span className="mr-2">{columnName}:</span>
      {/* {renderFilterValue(filter)} */}
      <FilterPopover 
        columnId={columnId} 
        filter={filter} 
        artistOptions={artistOptions}
        updateFilter={updateFilter}
        open={popoverOpen}
        onOpenChange={setPopoverOpen}
      />
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={(e) => {
          e.stopPropagation()
          removeFilter(columnId)
        }} 
        className="ml-2 h-4 w-4 p-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </Badge>
  )
}