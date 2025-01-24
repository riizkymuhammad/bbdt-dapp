"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { Heart } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LayoutDashboard, Receipt, FileText, UserCircle, Users, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

// Define menu items for each role
const menuItems = {
  trustee: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Transactions",
      href: "/dashboard/transactions",
      icon: Receipt,
    },
    {
      title: "Projek Galang Dana",
      href: "/dashboard/fundraising-application",
      icon: FileText,
    },
  ],
  donor: [
    {
      title: "Transactions",
      href: "/dashboard/transactions",
      icon: Receipt,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: UserCircle,
    },
  ],
  needy: [
    {
      title: "Dashboard",
      href: "/dashboard/",
      icon: LayoutDashboard,
    },
    {
      title: "Penggalangan Dana",
      href: "/dashboard/fundraising-application",
      icon: FileText,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: UserCircle,
    },
  ],
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  // Get user role from session
  const userRole = (session?.user as any)?.role?.toLowerCase() || "donor"

  // Get menu items based on user role
  const roleMenuItems = menuItems[userRole as keyof typeof menuItems] || []

  // Get user initials for avatar fallback
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "W" // W for Wallet
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-3">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">GiveHope</span>
            </Link>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <nav className="space-y-2">
              {roleMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${
                    pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                    <AvatarFallback>{getInitials(session?.user?.name || "User")}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">
                      {session?.user?.name ||
                        `${(session?.user as any)?.walletAddress?.slice(0, 6)}...${(session?.user as any)?.walletAddress?.slice(-4)}`}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {session?.user?.email }
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="flex items-center">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={() => signOut({ callbackUrl: "/" })}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1" />
            </div>
          </header>
          <main className="flex-1 space-y-4 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

