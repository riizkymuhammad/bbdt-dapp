import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import { formatCurrency } from "@/utils/format"

// Sample data - in a real app, this would come from an API
const fundraisers = [
  {
    id: 1,
    title: "Bantu Sekolah untuk Anak Pedalaman",
    fundraiserName: "Yayasan Pendidikan Nusantara",
    targetEth: 5.5,
    totalDonors: 128,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Program Beasiswa Teknologi",
    fundraiserName: "Tech Education Foundation",
    targetEth: 3.2,
    totalDonors: 75,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "Pembangunan Perpustakaan Desa",
    fundraiserName: "Komunitas Literasi Indonesia",
    targetEth: 2.8,
    totalDonors: 92,
    image: "/placeholder.svg?height=40&width=40",
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

export function FundraiserList() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Penggalang Dana</h3>

      <div className="space-y-4">
        {fundraisers.map((fundraiser) => (
          <Card key={fundraiser.id}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={fundraiser.image} alt={fundraiser.fundraiserName} />
                    <AvatarFallback>
                      {fundraiser.fundraiserName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h4 className="text-base font-semibold leading-none truncate mb-1">{fundraiser.title}</h4>
                    <p className="text-sm text-muted-foreground">{fundraiser.fundraiserName}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:ml-auto">
                  <div className="text-sm">
                    <p className="text-muted-foreground mb-1">Target Donasi:</p>
                    <p className="font-medium">{fundraiser.targetEth} ETH</p>
                    <p className="text-muted-foreground">≈ {formatIDR(fundraiser.targetEth * ETH_TO_IDR_RATE)}</p>
                  </div>

                  <div className="text-sm flex items-center gap-2 sm:min-w-[100px]">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {fundraiser.totalDonors} <span className="text-muted-foreground">donatur</span>
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

