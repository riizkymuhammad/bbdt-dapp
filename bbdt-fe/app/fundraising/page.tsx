'use client'

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { FundraisingFilters } from "@/components/fundraising-filters"
import Image from "next/image"
import { formatCurrency, calculateDaysLeft } from "@/utils/format"

// Sample data - in a real app, this would come from an API
const cases = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  image: "/placeholder.svg?height=200&width=400",
  title: `Fundraising Case ${i + 1}`,
  category: ['education', 'healthcare', 'environment', 'disaster'][i % 4],
  description: "Help support this important cause and make a difference in people's lives. Your contribution matters.",
  institution: `Organization ${i + 1}`,
  collected: Math.floor(Math.random() * 100000),
  target: 100000,
  endDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
}))

export default function FundraisingPage() {
  const [filters, setFilters] = useState({
    category: '',
    sort: '',
    search: '',
  })

  // Filter and sort the cases
  const filteredCases = cases.filter((case_) => {
    if (filters.category && filters.category !== 'all' && case_.category !== filters.category) {
      return false
    }
    if (filters.search && !case_.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    return true
  }).sort((a, b) => {
    switch (filters.sort) {
      case 'endingSoon':
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      case 'mostFunded':
        return (b.collected / b.target) - (a.collected / a.target)
      case 'leastFunded':
        return (a.collected / a.target) - (b.collected / b.target)
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-8 md:py-12">
        <div className="mx-auto w-[92%]">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Fundraising Cases</h1>
            <FundraisingFilters onFilterChange={setFilters} />
          </div>

          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCases.map((case_) => (
              <Card key={case_.id} className="group hover:border-primary transition-colors">
                <CardHeader className="p-0">
                  <div className="relative aspect-[2/1]">
                    <Image
                      src={case_.image}
                      alt={case_.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 text-xs font-medium bg-black/50 text-white rounded-full capitalize">
                        {case_.category}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <h2 className="mb-2 text-lg md:text-xl font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                    {case_.title}
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {case_.description}
                  </p>
                  <p className="text-sm font-medium line-clamp-1">{case_.institution}</p>
                  <div className="mt-4 space-y-2">
                    <Progress 
                      value={(case_.collected / case_.target) * 100} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span>{formatCurrency(case_.collected)} raised</span>
                      <span>{formatCurrency(case_.target)} goal</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 md:p-6 flex flex-col sm:flex-row gap-3 items-center justify-between border-t">
                  <p className="text-sm text-muted-foreground order-2 sm:order-1">
                    {calculateDaysLeft(case_.endDate)} days left
                  </p>
                  <Button className="w-full sm:w-auto order-1 sm:order-2">
                    Donate Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No fundraising cases found.</p>
            </div>
          )}
        </div>
      </main>
      <footer className="py-6 border-t">
        <div className="mx-auto w-[92%] text-center text-sm text-muted-foreground">
          © 2024 GiveHope. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

