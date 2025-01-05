'use client'

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample transaction data - in a real app, this would come from an API
const transactions = [
  {
    id: "INV-2024-001",
    image: "/placeholder.svg?height=48&width=48",
    campaign: "Build a School in Rural Area",
    amount: 0.5,
    date: "2024-03-15T10:00:00",
    status: "completed",
  },
  {
    id: "INV-2024-002",
    image: "/placeholder.svg?height=48&width=48",
    campaign: "Emergency Medical Support",
    amount: 1.2,
    date: "2024-03-14T15:30:00",
    status: "completed",
  },
  {
    id: "INV-2024-003",
    image: "/placeholder.svg?height=48&width=48",
    campaign: "Clean Water Project",
    amount: 0.3,
    date: "2024-03-14T09:15:00",
    status: "pending",
  },
  {
    id: "INV-2024-004",
    image: "/placeholder.svg?height=48&width=48",
    campaign: "Food Bank Support",
    amount: 0.8,
    date: "2024-03-13T16:45:00",
    status: "completed",
  },
  {
    id: "INV-2024-005",
    image: "/placeholder.svg?height=48&width=48",
    campaign: "Youth Sports Program",
    amount: 0.15,
    date: "2024-03-13T11:20:00",
    status: "failed",
  },
]

const statusStyles = {
  completed: "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400",
  failed: "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400",
}

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>([])

  // Filter transactions based on search query and status
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = 
      transaction.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = 
      statusFilter.length === 0 || statusFilter.includes(transaction.status)

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Status Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["completed", "pending", "failed"].map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={statusFilter.includes(status)}
                onCheckedChange={(checked) => {
                  setStatusFilter(
                    checked
                      ? [...statusFilter, status]
                      : statusFilter.filter((s) => s !== status)
                  )
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice No.</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead className="text-right">Amount (ETH)</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                      <Image
                        src={transaction.image}
                        alt={transaction.campaign}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="line-clamp-2">{transaction.campaign}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{transaction.amount}</TableCell>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary"
                    className={statusStyles[transaction.status as keyof typeof statusStyles]}
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {filteredTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={filteredTransactions.length === transactions.length}
            onClick={() => {
              setSearchQuery("")
              setStatusFilter([])
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  )
}

