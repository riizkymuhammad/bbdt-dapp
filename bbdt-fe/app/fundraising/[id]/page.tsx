'use client'

import { Navbar } from "@/components/navbar"
import { DonationForm } from "@/components/donation-form"
import { FundraisingDetails } from "@/components/fundraising-details"
import { LatestNews } from "@/components/latest-news"
import { DonorList } from "@/components/donor-list"
import { FundraiserList } from "@/components/fundraiser-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, Users } from 'lucide-react'
import Image from "next/image"
import { formatCurrency } from "@/utils/format"

// In a real app, this would come from an API
const campaignData = {
  title: "Build a School in Rural Area",
  institution: "Education For All Foundation",
  collected: 75,
  target: 100,
  endDate: "2024-06-30",
  daysLeft: 90,
  donors: 156,
  category: "Education",
  images: [
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
    "/placeholder.svg?height=600&width=1200",
  ]
}

export default function FundraisingDetailPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Cover Case and Donation Form Grid */}
          <div className="grid gap-8 lg:grid-cols-2 mb-8">
            {/* Left Column - Cover Case */}
            <div className="space-y-6">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={campaignData.images[0] || "/placeholder.svg"}
                  alt={campaignData.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {campaignData.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    by {campaignData.institution}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {campaignData.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>{campaignData.daysLeft} hari tersisa</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{campaignData.donors} donatur</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{formatCurrency(campaignData.collected)} terkumpul</span>
                    <span>{formatCurrency(campaignData.target)} target</span>
                  </div>
                  <Progress 
                    value={(campaignData.collected / campaignData.target) * 100} 
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    {Math.round((campaignData.collected / campaignData.target) * 100)}% dari target terkumpul
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Donation Form */}
            <div>
              <DonationForm
                collected={campaignData.collected}
                target={campaignData.target}
                daysLeft={campaignData.daysLeft}
              />
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="details" className="space-y-8">
            <TabsList className="w-full justify-start border-b pb-0 h-auto">
              <TabsTrigger 
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Detail
              </TabsTrigger>
              <TabsTrigger 
                value="news"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Berita Terbaru
              </TabsTrigger>
              <TabsTrigger 
                value="donors"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Donatur
              </TabsTrigger>
              <TabsTrigger 
                value="fundraisers"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Penggalang Dana
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <FundraisingDetails />
            </TabsContent>
            <TabsContent value="news" className="mt-6">
              <LatestNews />
            </TabsContent>
            <TabsContent value="donors" className="mt-6">
              <DonorList />
            </TabsContent>
            <TabsContent value="fundraisers" className="mt-6">
              <FundraiserList />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

