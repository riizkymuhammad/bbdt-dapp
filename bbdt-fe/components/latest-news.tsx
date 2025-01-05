import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CalendarDays } from 'lucide-react'

const news = [
  {
    title: "Construction Progress Update",
    date: "2024-03-15",
    content: "The foundation work has been completed, and we're moving forward with the main building construction.",
  },
  {
    title: "Community Support Growing",
    date: "2024-03-10",
    content: "Local businesses have pledged additional support for our educational initiative.",
  },
  {
    title: "Teacher Training Program Launched",
    date: "2024-03-05",
    content: "We've initiated a comprehensive training program for 25 teachers from the local community.",
  },
]

export function LatestNews() {
  return (
    <div className="space-y-4">
      {news.map((item, index) => (
        <Card key={index}>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{item.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="mr-1 h-4 w-4" />
                {new Date(item.date).toLocaleDateString()}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-muted-foreground">{item.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

