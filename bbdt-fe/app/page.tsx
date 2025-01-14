import { Navbar } from "@/components/navbar"
import { HeroSlider } from "@/components/hero-slider"
import { ProgramCategories } from "@/components/program-categories"
import { FundraisingCases } from "@/components/fundraising-cases"
import { CTAStats } from "@/components/cta-stats"
import { About } from "@/components/about"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSlider />
        <ProgramCategories />
        <FundraisingCases />
        <CTAStats />
        <About />
      </main>
      <footer className="py-6 border-t">
        <div className="mx-auto w-[92%] text-center text-sm text-muted-foreground">
          © 2024 Donasi Chain. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

