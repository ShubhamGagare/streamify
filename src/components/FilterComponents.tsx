import React from 'react'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { FilterType } from '@/lib/filterUtils'
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { DateRange } from "react-day-picker"

interface FilterInputProps {
  columnId: string
  filter: FilterType
  value: any
  onChange: (value: any) => void
  options?: string[]
}

export const FilterInput: React.FC<FilterInputProps> = ({ columnId, filter, value, onChange, options = [] }) => {
  switch (filter.type) {
    case 'text':
      return (
        <Input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${columnId}`}
        />
      )
    case 'date':
      return (
        <Input
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Select ${columnId}`}
        />
      )
    case 'checkbox':
      return (
        <div className="space-y-2 w-full">
          {options.map((option) => (
            <div key={option} className="flex w-full items-center space-x-2">
              <Checkbox
                id={`${columnId}-${option}`}
                checked={(value as string[] || []).includes(option)}
                onCheckedChange={(checked) => {
                  const newValue = checked
                    ? [...(value as string[] || []), option]
                    : (value as string[]).filter((item) => item !== option);
                  onChange(newValue);
                }}
              />
              <label htmlFor={`${columnId}-${option}`}>{option}</label>
            </div>
          ))}
        </div>
      )
    case 'range':
      return (
        <Slider
          value={value || [0, 2000]}
          onValueChange={(newValue) => onChange(newValue)}
          min={0}
          max={2000}
          step={1}
        />
      )
    default:
      return null
  }
}

export const renderFilterValue = (filter: FilterType) => {
  switch (filter.type) {
    case 'checkbox':
      const selectedValues = filter.value as string[]
      return selectedValues.length > 0
        ? selectedValues.join(', ')
        : 'All'
    case 'range':
      return `${(filter.value as number[])[0]} - ${(filter.value as number[])[1]}`
    case 'date':
      return filter.value
    case 'text':
    default:
      return filter.value as string
  }
}