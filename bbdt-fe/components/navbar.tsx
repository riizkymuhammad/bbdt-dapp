"use client"

import Link from "next/link"
import { Heart } from 'lucide-react'
import { MetaMaskProvider } from "@metamask/sdk-react"
import { ConnectWalletButton } from "./connect-wallet-button"
import { Button } from "@/components/ui/button"
import { useAccount } from "wagmi"

export function Navbar() {
  const host = typeof window !== "undefined" ? window.location.host : "defaultHost"

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "GiveHope",
      url: host,
    },
  }

  const { address } = useAccount()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-[92%] flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">GiveHope</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/programs"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Programs
          </Link>
          <Link
            href="/fundraising"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Fundraising
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
          <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
            <ConnectWalletButton />
          </MetaMaskProvider>
          {!address && (
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

