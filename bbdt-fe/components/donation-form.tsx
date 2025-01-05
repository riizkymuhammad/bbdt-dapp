'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Wallet, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

declare global {
  interface Window {
    ethereum?: any
  }
}

interface DonationFormProps {
  collected: number
  target: number
  daysLeft: number
}

export function DonationForm({ collected, target, daysLeft }: DonationFormProps) {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const connectWallet = async () => {
    setError("")
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsLoading(true)
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        setIsLoading(false)
      } catch (err: any) {
        setError(err.message)
        setIsLoading(false)
      }
    } else {
      setError("Please install MetaMask to make donations with ETH")
    }
  }

  const handleDonate = async () => {
    setError("")
    if (!amount) {
      setError("Please enter an amount")
      return
    }

    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsLoading(true)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const amountInWei = (Number(amount) * 1e18).toString(16)

        await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: accounts[0],
            to: '0xYourFundraisingWalletAddress', // Replace with actual wallet address
            value: '0x' + amountInWei,
          }],
        })

        setIsLoading(false)
        setAmount("")
      } catch (err: any) {
        setError(err.message)
        setIsLoading(false)
      }
    } else {
      setError("Please install MetaMask to make donations with ETH")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Support This Cause</CardTitle>
        <CardDescription>Make a difference with your donation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{collected} ETH raised</span>
            <span>{target} ETH goal</span>
          </div>
          <Progress value={(collected / target) * 100} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{daysLeft} days left</span>
            <span>{Math.round((collected / target) * 100)}% funded</span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="amount">Donation Amount (ETH)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.05"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          className="w-full" 
          onClick={handleDonate}
          disabled={isLoading || !amount}
        >
          {isLoading ? "Processing..." : "Donate ETH"}
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={connectWallet}
          disabled={isLoading}
        >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </CardFooter>
    </Card>
  )
}

