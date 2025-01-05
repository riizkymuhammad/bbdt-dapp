import { Card, CardContent } from "@/components/ui/card"
import { Book, Heart, TreePine, Umbrella } from 'lucide-react'

const categories = [
  {
    icon: Book,
    title: "Education",
    description: "Support educational programs and scholarships",
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Fund medical treatments and healthcare initiatives",
  },
  {
    icon: TreePine,
    title: "Environment",
    description: "Support environmental conservation projects",
  },
  {
    icon: Umbrella,
    title: "Disaster Relief",
    description: "Provide emergency assistance to affected communities",
  },
]

export function ProgramCategories() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-[92%]">
        <h2 className="mb-8 md:mb-12 text-center text-2xl md:text-3xl font-bold">
          Our Programs
        </h2>
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.title} className="text-center hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <category.icon className="h-10 w-10 md:h-12 md:w-12 text-primary" />
                </div>
                <h3 className="mb-2 text-lg md:text-xl font-semibold">{category.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

