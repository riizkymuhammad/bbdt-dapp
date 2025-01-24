import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const donors = [
  {
    address: "0x1234...5678",
    name: "Alice Johnson",
    amount: 0.5,
    timestamp: "2024-03-15T14:30:00Z",
  },
  {
    address: "0x8765...4321",
    amount: 1.2,
    timestamp: "2024-03-14T09:15:00Z",
  },
  {
    address: "0x5432...8765",
    name: "Carol White",
    amount: 0.8,
    timestamp: "2024-03-13T16:45:00Z",
  },
]

const ETH_TO_IDR_RATE = 43000000 // 43 million IDR per ETH

const formatIDR = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function DonorList() {
  return (
    <div className="space-y-4">
      {donors.map((donor, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">
                      {donor.name || `${donor.address.slice(0, 6)}...${donor.address.slice(-4)}`}
                    </p>
                    <p className="text-sm font-medium">{donor.amount} ETH</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <time dateTime={donor.timestamp}>
                      {new Date(donor.timestamp).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </time>
                    <p>≈ {formatIDR(donor.amount * ETH_TO_IDR_RATE)}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

