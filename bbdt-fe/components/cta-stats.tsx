import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const stats = [
  {
    value: "1,234",
    label: "Active Campaigns",
  },
  {
    value: "$5.2M",
    label: "Total Donations",
  },
  {
    value: "50,000+",
    label: "Successful Transactions",
  },
]

export function CTAStats() {
  return (
    <section className="py-12 md:py-16 bg-primary text-primary-foreground">
      <div className="mx-auto w-[92%] text-center">
        <h2 className="mb-8 md:mb-12 text-2xl md:text-3xl font-bold">
          Making a Difference Together
        </h2>
        <div className="grid gap-4 md:gap-6 sm:grid-cols-3 mb-8 md:mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-primary-foreground/10 border-primary-foreground/20">
              <CardContent className="p-4 md:p-6">
                <div className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-primary-foreground/80">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button size="lg" variant="secondary" className="text-base md:text-lg">
          Start Your Campaign
        </Button>
      </div>
    </section>
  )
}

