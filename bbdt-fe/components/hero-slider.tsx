'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1665665160518-097a89d5383e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Bantu anak-anak mendapatkan pendidikan",
    description: "Dukung pendidikan anak-anak kurang mampu dan membentuk masa depan mereka",
  },
  {
    image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Emergency Disaster Relief",
    description: "Provide immediate assistance to communities affected by natural disasters",
  },
  {
    image: "https://images.unsplash.com/photo-1641648542088-1e41c1318473?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Healthcare for All",
    description: "Support medical care for those who need it most",
  },
]

export function HeroSlider() {
  return (
    <section className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index} className="relative">
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="mx-auto w-[92%] text-center text-white">
                    <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>
                    <p className="mb-8 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
                      {slide.description}
                    </p>
                   
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden md:flex" />
        <CarouselNext className="right-4 hidden md:flex" />
      </Carousel>
    </section>
  )
}

