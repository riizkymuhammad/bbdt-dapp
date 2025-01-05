'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { formatCurrency, calculateDaysLeft } from "@/utils/format"

const cases = [
  {
    image: "/placeholder.svg?height=200&width=400",
    title: "Build a School in Rural Area",
    description: "Help us build a school for underprivileged children in rural communities.",
    institution: "Education For All Foundation",
    collected: 75000,
    target: 100000,
    endDate: "2024-06-30",
  },
  {
    image: "/placeholder.svg?height=200&width=400",
    title: "Emergency Medical Support",
    description: "Provide urgent medical care for those who cannot afford it.",
    institution: "Healthcare Initiative",
    collected: 25000,
    target: 50000,
    endDate: "2024-05-15",
  },
  // Add more cases as needed
]

export function FundraisingSlider() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold">Current Fundraising Cases</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {cases.map((case_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card>
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
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-semibold">{case_.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{case_.description}</p>
                    <p className="text-sm font-medium">{case_.institution}</p>
                    <div className="mt-4 space-y-2">
                      <Progress value={(case_.collected / case_.target) * 100} />
                      <div className="flex justify-between text-sm">
                        <span>{formatCurrency(case_.collected)} raised</span>
                        <span>{formatCurrency(case_.target)} goal</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <p className="text-sm text-muted-foreground">
                      {calculateDaysLeft(case_.endDate)} days left to donate
                    </p>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

