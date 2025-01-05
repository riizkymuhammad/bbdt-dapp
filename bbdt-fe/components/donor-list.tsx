import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const donors = [
  {
    name: "Alice Johnson",
    amount: 0.5,
    date: "2024-03-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Bob Smith",
    amount: 1.2,
    date: "2024-03-14",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Carol White",
    amount: 0.8,
    date: "2024-03-13",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function DonorList() {
  return (
    <div className="space-y-4">
      {donors.map((donor, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={donor.avatar} alt={donor.name} />
                <AvatarFallback>{donor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{donor.name}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(donor.date).toLocaleDateString()}
                </div>
              </div>
              <div className="font-semibold">{donor.amount} ETH</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

