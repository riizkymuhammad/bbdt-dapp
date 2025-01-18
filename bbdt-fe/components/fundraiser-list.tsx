import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from 'lucide-react'
import { formatCurrency } from "@/utils/format"

// Sample data - in a real app, this would come from an API
const fundraisers = [
  {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    campaigns: [
      {
        title: "Education for Rural Children",
        donors: 45,
        collected: 25000,
      },
      {
        title: "Clean Water Initiative",
        donors: 32,
        collected: 18000,
      }
    ]
  },
  {
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    campaigns: [
      {
        title: "Community Health Program",
        donors: 28,
        collected: 15000,
      }
    ]
  },
  {
    name: "Emma Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    campaigns: [
      {
        title: "Youth Sports Development",
        donors: 56,
        collected: 30000,
      },
      {
        title: "Local Food Bank Support",
        donors: 89,
        collected: 42000,
      },
      {
        title: "Senior Care Initiative",
        donors: 34,
        collected: 21000,
      }
    ]
  }
]

export function FundraiserList() {
  return (
    <div className="space-y-8">
      {/* Become a Fundraiser CTA */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center space-y-4">
          <h3 className="text-xl font-semibold">Become a Fundraiser</h3>
          <p className="text-muted-foreground">
            Help us reach more people by becoming a fundraiser. Create your own campaign
            and inspire others to donate for this cause.
          </p>
          <Button size="lg">
            Start Fundraising
          </Button>
        </CardContent>
      </Card>

      {/* Fundraisers List */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Our Fundraisers</h3>
        
        <div className="space-y-4">
          {fundraisers.map((fundraiser, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Fundraiser Header */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={fundraiser.avatar} alt={fundraiser.name} />
                      <AvatarFallback>{fundraiser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{fundraiser.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {fundraiser.campaigns.length} {fundraiser.campaigns.length === 1 ? 'Campaign' : 'Campaigns'}
                      </p>
                    </div>
                  </div>

                  {/* Campaigns List */}
                  <div className="space-y-3 pl-16">
                    {fundraiser.campaigns.map((campaign, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div className="space-y-1">
                          <p className="font-medium">{campaign.title}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="mr-1 h-4 w-4" />
                            {campaign.donors} donors
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(campaign.collected)}</p>
                          <p className="text-sm text-muted-foreground">raised</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

