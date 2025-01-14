import { Button } from "@/components/ui/button"

export function About() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-[92%]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6 text-2xl md:text-3xl font-bold">About Donasi Chain</h2>
          <div className="space-y-4 mb-8">
            <p className="text-base md:text-lg text-muted-foreground">
              Donasi Chain is a trusted platform connecting generous donors with meaningful causes. We believe in
              transparency, efficiency, and making a lasting impact in communities worldwide.
            </p>
            <p className="text-base md:text-lg text-muted-foreground">
              Our platform ensures that every donation reaches its intended beneficiaries, with regular
              updates and complete transparency about how funds are utilized.
            </p>
            <p className="text-base md:text-lg text-muted-foreground">
              Join us in our mission to create positive change and make the world a better place, one
              donation at a time.
            </p>
          </div>
          <Button variant="outline">Learn More About Us</Button>
        </div>
      </div>
    </section>
  )
}

