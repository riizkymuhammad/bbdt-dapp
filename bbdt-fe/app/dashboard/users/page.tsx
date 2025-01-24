'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Search, XCircle } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface User {
  id: string
  username: string
  fullName: string
  walletAddress: string
  registrationDate: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  approvalDate?: string
  accessType: 'DONOR' | 'NEEDY' | 'TRUSTEE'
}

const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400",
  APPROVED: "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400",
}

const accessTypeStyles = {
  DONOR: "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400",
  NEEDY: "bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400",
  TRUSTEE: "bg-orange-100 text-orange-800 dark:bg-orange-800/20 dark:text-orange-400",
}

export default function UsersPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [accessTypeFilter, setAccessTypeFilter] = useState<string>("ALL")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('http://localhost:3002/api/users/')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }

      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching users')
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users. Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
    (user.username?.toLowerCase().includes(searchQuery.toLowerCase()) || false) || 
    (user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || false) || 
    (user.walletAddress?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    
    const matchesStatus = statusFilter === "ALL" || user.status === statusFilter
    const matchesAccessType = accessTypeFilter === "ALL" || user.accessType === accessTypeFilter

    return matchesSearch && matchesStatus && matchesAccessType
  })

  const handleApprove = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3002/api/users/${userId}/approve`, {
        method: 'PUT',
      })

      if (!response.ok) {
        throw new Error('Failed to approve user')
      }

      await fetchUsers() // Refresh the users list
      toast({
        title: "Success",
        description: "User has been approved successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve user. Please try again.",
      })
    }
  }

  const handleReject = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3002/api/users/${userId}/reject`, {
        method: 'PUT',
      })

      if (!response.ok) {
        throw new Error('Failed to reject user')
      }

      await fetchUsers() // Refresh the users list
      toast({
        title: "Success",
        description: "User has been rejected successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reject user. Please try again.",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-[200px]" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Manajemen Pengguna</h2>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 -ml-8"
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Semua Status</SelectItem>
              <SelectItem value="PENDING">Menunggu</SelectItem>
              <SelectItem value="APPROVED">Disetujui</SelectItem>
              <SelectItem value="REJECTED">Ditolak</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={accessTypeFilter}
            onValueChange={setAccessTypeFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Semua Tipe</SelectItem>
              <SelectItem value="DONOR">Donatur</SelectItem>
              <SelectItem value="NEEDY">Penerima</SelectItem>
              <SelectItem value="TRUSTEE">Pengawas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Wallet Address</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approval Date</TableHead>
              <TableHead>Access Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell className="font-mono">
                  {`${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}`}
                </TableCell>
                <TableCell>{formatDate(user.registrationDate)}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary"
                    className={statusStyles[user.status]}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.approvalDate ? formatDate(user.approvalDate) : "-"}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary"
                    className={accessTypeStyles[user.accessType]}
                  >
                    {user.accessType}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {user.status === "PENDING" && (
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => handleApprove(user.id)}
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Setujui
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleReject(user.id)}
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Tolak
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!selectedUser && !!actionType} onOpenChange={() => {
        setSelectedUser(null)
        setActionType(null)
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "approve" ? "Approve User" : "Reject User"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {actionType} {selectedUser?.username}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedUser && actionType) {
                  if (actionType === "approve") {
                    handleApprove(selectedUser.id)
                  } else {
                    handleReject(selectedUser.id)
                  }
                }
                setSelectedUser(null)
                setActionType(null)
              }}
              className={
                actionType === "approve" 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-red-600 hover:bg-red-700"
              }
            >
              {actionType === "approve" ? "Approve" : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredUsers.length} of {users.length} users
        </p>
        {(searchQuery || statusFilter !== "ALL" || accessTypeFilter !== "ALL") && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("")
              setStatusFilter("ALL")
              setAccessTypeFilter("ALL")
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}

