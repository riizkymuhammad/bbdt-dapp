import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { formatCurrency, calculateDaysLeft } from "@/utils/format"

const cases = [
  {
    id: 1,
    image: "/placeholder.svg?height=200&width=400",
    title: "Build a School in Rural Area",
    description: "Help us build a school for underprivileged children in rural communities.",
    institution: "Education For All Foundation",
    collected: 75000,
    target: 100000,
    endDate: "2024-06-30",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=200&width=400",
    title: "Emergency Medical Support",
    description: "Provide urgent medical care for those who cannot afford it.",
    institution: "Healthcare Initiative",
    collected: 25000,
    target: 50000,
    endDate: "2024-05-15",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=200&width=400",
    title: "Clean Water Project",
    description: "Bring clean water to communities in need.",
    institution: "Water For Life",
    collected: 15000,
    target: 30000,
    endDate: "2024-07-20",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=200&width=400",
    title: "Disaster Relief Fund",
    description: "Support communities affected by recent natural disasters.",
    institution: "Relief Aid Organization",
    collected: 120000,
    target: 150000,
    endDate: "2024-04-30",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=200&width=400",
    title: "Food Bank Support",
    description: "Help us feed families in need in our local community.",
    institution: "Community Food Bank",
    collected: 45000,
    target: 60000,
    endDate: "2024-06-15",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=200&width=400",
    title: "Youth Sports Program",
    description: "Fund sports equipment and training for underprivileged youth.",
    institution: "Youth Sports Foundation",
    collected: 18000,
    target: 25000,
    endDate: "2024-08-01",
  },
  {
    id: 7,
    image: "/placeholder.svg?height=200&width=400",
    title: "Mental Health Support",
    description: "Provide counseling services to those in need.",
    institution: "Mental Health Alliance",
    collected: 35000,
    target: 50000,
    endDate: "2024-07-10",
  },
  {
    id: 8,
    image: "/placeholder.svg?height=200&width=400",
    title: "Environmental Conservation",
    description: "Support local wildlife preservation efforts.",
    institution: "Nature Conservation Group",
    collected: 28000,
    target: 40000,
    endDate: "2024-06-25",
  },
  {
    id: 9,
    image: "/placeholder.svg?height=200&width=400",
    title: "Senior Care Program",
    description: "Help provide care and support for elderly in need.",
    institution: "Elder Care Foundation",
    collected: 42000,
    target: 55000,
    endDate: "2024-05-30",
  },
]

export function FundraisingCases() {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="mx-auto w-[92%]">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Current Fundraising Cases</h2>
          <Link href="/fundraising">
            <Button variant="outline" className="hidden md:inline-flex">
              View All Cases <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((case_) => (
            <Link href={`/fundraising/${case_.id}`} key={case_.id} className="block group">
              <Card className="h-full transition-all duration-200 hover:border-primary hover:shadow-md">
                <CardHeader className="p-0">
                  <div className="relative aspect-[2/1]">
                    <Image
                      src={case_.image}
                      alt={case_.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <h3 className="mb-2 text-lg md:text-xl font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                    {case_.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {case_.description}
                  </p>
                  <p className="text-sm font-medium line-clamp-1">{case_.institution}</p>
                  <div className="mt-4 space-y-2">
                    <Progress value={(case_.collected / case_.target) * 100} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>{formatCurrency(case_.collected)} raised</span>
                      <span>{formatCurrency(case_.target)} goal</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-4 md:px-6 py-3 md:py-4">
                  <p className="text-sm text-muted-foreground">
                    {calculateDaysLeft(case_.endDate)} days left to donate
                  </p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/fundraising">
            <Button variant="outline" className="w-full">
              View All Cases <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

