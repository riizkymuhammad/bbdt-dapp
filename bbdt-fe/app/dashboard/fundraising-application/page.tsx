'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatCurrency } from "@/utils/format"
import { AlertCircle, CheckCircle, MoreHorizontal, Plus, Search, XCircle } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Application {
  id: number
  title: string
  targetAmount: number
  collected: number
  date: string
  deadline: string
  status: string | null
}

// Sample data - in a real app, this would come from an API
const applications: Application[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Fundraising Project ${i + 1}`,
  targetAmount: Math.floor(Math.random() * 100000) + 10000,
  collected: Math.floor(Math.random() * 50000),
  date: new Date(2024, 2, Math.floor(Math.random() * 30) + 1).toISOString(),
  deadline: new Date(2024, 5, Math.floor(Math.random() * 30) + 1).toISOString(),
  status: Math.random() > 0.7 ? (Math.random() > 0.5 ? "APPROVED" : "REJECTED") : null,
}))

const statusStyles = {
  APPROVED: "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400",
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400",
}

const ITEMS_PER_PAGE = 10

export default function FundraisingApplicationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [currentPage, setCurrentPage] = useState(1)

  // Filter applications based on search query and status
  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "ALL" || 
      (statusFilter === "null" ? app.status === null : app.status === statusFilter)
    return matchesSearch && matchesStatus
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE)
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleNewApplication = () => {
    router.push("/dashboard/fundraising-submission")
  }

  const handleApprove = async (id: number) => {
    try {
      // Here you would call your API/smart contract
      console.log("Approving application:", id)
      toast({
        title: "Application Approved",
        description: "The fundraising application has been approved.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve application. Please try again.",
      })
    }
  }

  const handleReject = async (id: number) => {
    try {
      // Here you would call your API/smart contract
      console.log("Rejecting application:", id)
      toast({
        title: "Application Rejected",
        description: "The fundraising application has been rejected.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reject application. Please try again.",
      })
    }
  }

  const calculateProgress = (collected: number, target: number) => {
    return (collected / target) * 100
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of the table
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPaginationItems = () => {
    const items = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      )
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Aplikasi Penggalangan Dana</h2>
        <Button onClick={handleNewApplication}>
          <Plus className="mr-2 h-4 w-4" />
          Aplikasi Baru
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1) // Reset to first page on search
            }}
            className="pl-8 -ml-8"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value)
            setCurrentPage(1) // Reset to first page on filter change
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="APPROVED">Approved</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
            <SelectItem value="null">Pending Review</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Alert variant="warning" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Perlu lengkapi profil Anda, untuk membuat penggalangan dana.
        </AlertDescription>
      </Alert>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Target</TableHead>
              <TableHead className="text-right">Collected</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.title}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(application.targetAmount)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="space-y-1">
                    <span>{formatCurrency(application.collected)}</span>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${calculateProgress(
                            application.collected,
                            application.targetAmount
                          )}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {calculateProgress(
                        application.collected,
                        application.targetAmount
                      ).toFixed(1)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(application.date)}</TableCell>
                <TableCell>{formatDate(application.deadline)}</TableCell>
                <TableCell>
                  {application.status ? (
                    <Badge
                      variant="secondary"
                      className={statusStyles[application.status as keyof typeof statusStyles]}
                    >
                      {application.status}
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className={statusStyles.PENDING}>
                      MENUNGGU
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {application.status === null ? (
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => handleApprove(application.id)}
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Setujui
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleReject(application.id)}
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Tolak
                      </Button>
                    </div>
                  ) : application.status === "APPROVED" ? (
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/fundraising/${application.id}`)}
                      >
                        Lihat Kasus
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/fundraising/${application.id}/reports`)}
                      >
                        Laporan Terbaru
                      </Button>
                    </div>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
            {paginatedApplications.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to{' '}
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredApplications.length)} of{' '}
          {filteredApplications.length} applications
        </p>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            
            {renderPaginationItems()}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {(searchQuery || statusFilter !== "ALL") && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("")
              setStatusFilter("ALL")
              setCurrentPage(1)
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}

