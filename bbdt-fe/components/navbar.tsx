'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart, Power } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsConnecting(true)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setWalletAddress(accounts[0])
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', function (accounts: string[]) {
          setWalletAddress(accounts[0] || "")
        })
      } catch (error) {
        console.error("Error connecting to MetaMask:", error)
      } finally {
        setIsConnecting(false)
      }
    } else {
      window.open('https://metamask.io/download/', '_blank')
    }
  }

  const disconnectWallet = () => {
    setWalletAddress("")
    // Remove the event listener
    if (window.ethereum) {
      window.ethereum.removeAllListeners('accountsChanged')
    }
  }

  // Check if already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          if (accounts.length > 0) {
            setWalletAddress(accounts[0])
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error)
        }
      }
    }
    
    checkConnection()
  }, [])

  const navLinks = [
    { href: "/programs", label: "Program" },
    { href: "/fundraising", label: "Penggalangan Dana" },
    { href: "/about", label: "Tentang Kami" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-[92%] flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">GiveHope</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          
          {walletAddress ? (
            <div className="flex items-center gap-3">
              <Button variant="outline">
                {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
              </Button>
              <Link href="/dashboard">
                <Button>Dasbor</Button>
              </Link>
            </div>
          ) : (
            <Button 
              variant="outline" 
              onClick={connectWallet}
              disabled={isConnecting}
            >
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
                {walletAddress ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full"
                    >
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </Button>
                    <Link href="/dashboard">
                      <Button className="w-full">Dasbor</Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      onClick={disconnectWallet}
                      className="w-full"
                    >
                      <Power className="mr-2 h-4 w-4" />
                      Putuskan
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="w-full"
                  >
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

