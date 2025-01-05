'use client'

import { Navbar } from "@/components/navbar"
import { DonationForm } from "@/components/donation-form"
import { FundraisingDetails } from "@/components/fundraising-details"
import { LatestNews } from "@/components/latest-news"
import { DonorList } from "@/components/donor-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

// In a real app, this would come from an API
const campaignData = {
  title: "Build a School in Rural Area",
  institution: "Education For All Foundation",
  collected: 75,
  target: 100,
  endDate: "2024-06-30",
  daysLeft: 90,
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
      <main>
        {/* Hero Image Section */}
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src={campaignData.images[0]}
            alt={campaignData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-[92%]">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {campaignData.title}
              </h1>
              <p className="text-lg text-white/90">
                {campaignData.institution}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mx-auto w-[92%] py-8">
          {/* Donation Form */}
          <div className="mb-8">
            <DonationForm
              collected={campaignData.collected}
              target={campaignData.target}
              daysLeft={campaignData.daysLeft}
            />
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="news">Latest News</TabsTrigger>
              <TabsTrigger value="donors">Donors</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <FundraisingDetails />
            </TabsContent>
            <TabsContent value="news" className="space-y-4">
              <LatestNews />
            </TabsContent>
            <TabsContent value="donors" className="space-y-4">
              <DonorList />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

