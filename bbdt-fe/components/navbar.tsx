"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart, Power, Wallet, User } from "lucide-react"
import { ethers } from "ethers"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

declare global {
  interface Window {
    ethereum?: any
  }
}

export function Navbar() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setIsConnecting(true)

        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        const walletAddress = accounts[0]

        // Create a provider and signer
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()

        // Create message for signing
        const message = `Welcome to GiveHope!\n\nSign this message to verify your wallet ownership.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nWallet address: ${walletAddress}\nNonce: ${Date.now()}`

        // Request signature
        const signature = await signer.signMessage(message)

        // Sign in with NextAuth using the wallet credentials
        const result = await signIn("metamask", {
          walletAddress,
          signature,
          redirect: false,
        })

        if (result?.error) {
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "Failed to authenticate with wallet. Please try again.",
          })
          return
        }

        // Refresh the page to update session
        router.refresh()

        toast({
          title: "Success",
          description: "Wallet connected successfully!",
        })
      } catch (error) {
        console.error("Error connecting to MetaMask:", error)
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: error instanceof Error ? error.message : "Failed to connect wallet",
        })
      } finally {
        setIsConnecting(false)
      }
    } else {
      window.open("https://metamask.io/download/", "_blank")
    }
  }

  const disconnectWallet = async () => {
    try {
      await signOut({ redirect: false })
      router.refresh()
      toast({
        title: "Success",
        description: "Wallet disconnected successfully!",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to disconnect wallet",
      })
    }
  }

  const navLinks = [
    { href: "/programs", label: "Program" },
    { href: "/fundraising", label: "Penggalangan Dana" },
    { href: "/about", label: "Tentang Kami" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-[92%] flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
        
          <span className="text-xl font-bold">DonasiBlock</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}

          {session ? (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-3 pr-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={session.user?.image || ""} />
                      <AvatarFallback>{session.user?.name?.[0] || "W"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-sm">
                        {`${(session.user as any).walletAddress?.slice(0, 6)}...${(session.user as any).walletAddress?.slice(-4)}`}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                        {((session.user as any).role || "donor").toLowerCase()}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={disconnectWallet}>
                    <Power className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button variant="outline" onClick={connectWallet} disabled={isConnecting || status === "loading"}>
              <Wallet className="mr-2 h-4 w-4" />
              {isConnecting ? "Menghubungkan..." : "Hubungkan Dompet"}
            </Button>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <nav className="flex flex-col space-y-4 mt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile Navigation Buttons */}
              <div className="flex flex-col space-y-4 pt-4 border-t">
                {session ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full flex items-center gap-3 pr-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={session.user?.image || ""} />
                            <AvatarFallback>{session.user?.name?.[0] || "W"}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col items-start">
                            <span className="text-sm">
                              {`${(session.user as any).walletAddress?.slice(0, 6)}...${(session.user as any).walletAddress?.slice(-4)}`}
                            </span>
                            <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                              {((session.user as any).role || "donor").toLowerCase()}
                            </span>
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            disconnectWallet()
                            setIsOpen(false)
                          }}
                        >
                          <Power className="mr-2 h-4 w-4" />
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    onClick={connectWallet}
                    disabled={isConnecting || status === "loading"}
                    className="w-full"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    {isConnecting ? "Menghubungkan..." : "Hubungkan Dompet"}
                  </Button>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

