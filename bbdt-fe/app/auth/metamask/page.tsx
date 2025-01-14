'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ethers } from "ethers"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Heart, Loader2, AlertCircle, ExternalLink, Wallet } from 'lucide-react'

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function MetamaskLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [nonce, setNonce] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [signature, setSignature] = useState("")
  const [error, setError] = useState<string | null>(null)

  const connectWallet = async () => {
    try {
      setIsLoading(true)
      setError(null)

      if (!window.ethereum) {
        throw new Error(
          "MetaMask not found. Please install it to continue."
        )
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await provider.send("eth_requestAccounts", [])
      setWalletAddress(accounts[0])

      toast({
        title: "Wallet Connected",
        description: "Your MetaMask wallet has been connected successfully.",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet")
    } finally {
      setIsLoading(false)
    }
  }

  const getNonce = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/auth/nonce?walletAddress=${walletAddress}`)
      if (!response.ok) throw new Error("Failed to get nonce")
      
      const data = await response.json()
      setNonce(data.nonce)

      toast({
        title: "Nonce Retrieved",
        description: "Please sign the message to continue.",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get nonce")
    } finally {
      setIsLoading(false)
    }
  }

  const signMessage = async () => {
    try {
      setIsLoading(true)
      setError(null)

      if (!nonce || !walletAddress) {
        throw new Error("Please get nonce first!")
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const messageToSign = `Login request for wallet: ${walletAddress}. Nonce: ${nonce}`
      const signature = await signer.signMessage(messageToSign)

      setMessage(messageToSign)
      setSignature(signature)

      toast({
        title: "Message Signed",
        description: "Your signature has been generated. Proceeding with verification...",
      })

      // Automatically proceed with verification
      await verifySignature(signature, messageToSign)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign message")
    } finally {
      setIsLoading(false)
    }
  }

  const verifySignature = async (sig: string, msg: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress,
          signature: sig,
          message: msg,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Authentication Successful",
          description: "You have been logged in successfully.",
        })
        router.push('/dashboard')
      } else {
        throw new Error("Verification failed")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify signature")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="mx-auto w-[92%] py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">GiveHope</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center py-12">
        <div className="mx-auto w-[92%] max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Connect with MetaMask</CardTitle>
              <CardDescription className="text-center">
                Sign in using your MetaMask wallet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                {!walletAddress ? (
                  <Button
                    className="w-full"
                    onClick={connectWallet}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Wallet className="mr-2 h-4 w-4" />
                    )}
                    Connect Wallet
                  </Button>
                ) : (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Connected Wallet:</p>
                    <p className="text-sm font-mono break-all">{walletAddress}</p>
                  </div>
                )}

                {walletAddress && !nonce && (
                  <Button
                    className="w-full"
                    onClick={getNonce}
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Get Nonce
                  </Button>
                )}

                {nonce && !signature && (
                  <Button
                    className="w-full"
                    onClick={signMessage}
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign Message
                  </Button>
                )}

                {message && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Message:</p>
                    <p className="text-sm break-all bg-muted p-2 rounded">{message}</p>
                  </div>
                )}

                {signature && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Signature:</p>
                    <p className="text-sm break-all bg-muted p-2 rounded">{signature}</p>
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid gap-2">
                <Button variant="outline" asChild>
                  <Link href="/auth/signin">
                    Email Sign In
                  </Link>
                </Button>
                <Button variant="link" asChild className="px-0">
                  <Link href="https://metamask.io/download/" target="_blank">
                    Don't have MetaMask?
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

