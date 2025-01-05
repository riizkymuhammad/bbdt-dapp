'use client'

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

export function FundraisingFilters({
  onFilterChange,
}: {
  onFilterChange: (filters: { category: string; sort: string; search: string }) => void
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search fundraising cases..."
          className="pl-9 w-full md:w-[300px]"
          onChange={(e) => onFilterChange({ category: '', sort: '', search: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Select onValueChange={(value) => onFilterChange({ category: value, sort: '', search: '' })}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="environment">Environment</SelectItem>
            <SelectItem value="disaster">Disaster Relief</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => onFilterChange({ category: '', sort: value, search: '' })}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="endingSoon">Ending Soon</SelectItem>
            <SelectItem value="mostFunded">Most Funded</SelectItem>
            <SelectItem value="leastFunded">Least Funded</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

