'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle, ArrowLeft, Download, ExternalLink } from 'lucide-react'
import Link from 'next/link'

// In a real app, this would come from API/route params
const transactionData = {
  id: "TXN-123456789",
  amount: "0.5 ETH",
  date: new Date().toLocaleString(),
  campaign: "Build a School in Rural Area",
  status: "Completed",
  etherscanLink: "https://etherscan.io/tx/0x123...", // Example link
}

export default function TransactionSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="mx-auto w-[92%] max-w-2xl py-12 md:py-24">
        <Card className="overflow-hidden">
          {/* Success Banner */}
          <div className="bg-primary px-6 py-8 text-center text-primary-foreground">
            <CheckCircle className="mx-auto mb-4 h-12 w-12" />
            <h1 className="text-2xl font-bold">Transaction Successful!</h1>
            <p className="mt-2 text-primary-foreground/90">
              Thank you for your generous donation
            </p>
          </div>

          {/* Transaction Details */}
          <CardContent className="space-y-6 p-6">
            <div className="rounded-lg border bg-card p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Transaction ID</span>
                  <span className="font-medium">{transactionData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="font-medium">{transactionData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <span className="font-medium">{transactionData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Campaign</span>
                  <span className="font-medium">{transactionData.campaign}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="font-medium text-green-600">{transactionData.status}</span>
                </div>
              </div>
            </div>

            {/* View on Etherscan */}
            <a
              href={transactionData.etherscanLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              View on Etherscan
              <ExternalLink className="h-4 w-4" />
            </a>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 border-t p-6">
            <div className="flex w-full flex-col gap-4 sm:flex-row">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
            </div>
            <Link 
              href="/dashboard" 
              className="text-center text-sm text-muted-foreground hover:text-primary"
            >
              View all transactions in dashboard
            </Link>
          </CardFooter>
        </Card>

        {/* Share Success Message */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Share your contribution and inspire others to donate
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Button variant="outline" size="sm">
              Share on X
            </Button>
            <Button variant="outline" size="sm">
              Share on Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

