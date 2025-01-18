import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays } from 'lucide-react'
import Image from "next/image"

const news = [
  {
    title: "Construction Progress Update",
    date: "2024-03-15",
    content: "The foundation work has been completed, and we're moving forward with the main building construction. Local contractors have been engaged and materials have been sourced from nearby suppliers to support the local economy.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Community Support Growing",
    date: "2024-03-10",
    content: "Local businesses have pledged additional support for our educational initiative. Several companies have committed to providing internship opportunities for students once the project is complete.",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Teacher Training Program Launched",
    date: "2024-03-05",
    content: "We've initiated a comprehensive training program for 25 teachers from the local community. The program focuses on modern teaching methodologies and use of technology in education.",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export function LatestNews() {
  return (
    <div className="relative pl-6 md:pl-8">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
      
      <div className="space-y-8">
        {news.map((item, index) => (
          <div key={index} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[25px] md:-left-[33px] top-3 h-4 w-4 rounded-full border-2 border-primary bg-background" />
            
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col gap-4">
                  <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{item.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays className="mr-1 h-4 w-4" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{item.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

