"use client"

import { useSDK } from "@metamask/sdk-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatAddress } from "@/lib/utils"
import WalletIcon from "./wallet-icon"
import { useToast } from "@/hooks/use-toast"


export function ConnectWalletButton() {
  const { sdk, connected, connecting, account } = useSDK()
  const { toast } = useToast()

  const connect = async () => {
    try {
      await sdk?.connect()
      toast({
        title: "Wallet Connected",
        description: "Your MetaMask wallet has been connected successfully.",
      })
    } catch (err) {
      console.warn(`Failed to connect:`, err)
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Failed to connect to MetaMask. Please try again.",
      })
    }
  }

  const disconnect = () => {
    if (sdk) {
      sdk.terminate()
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      })
    }
  }

  return (
    <div className="relative">
      {connected ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">{formatAddress(account)}</Button>
          </PopoverTrigger>
          <PopoverContent className="w-44">
            <button
              onClick={disconnect}
              className="w-full px-2 py-2 text-left text-sm text-destructive hover:bg-muted"
            >
              Disconnect
            </button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button disabled={connecting} onClick={connect}>
          <WalletIcon className="mr-2 h-4 w-4" />
          {connecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </div>
  )
}

