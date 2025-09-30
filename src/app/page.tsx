"use client"

import { useEffect } from "react"
import { initLenis } from "@/lib/lenis"

import Hero from "@/app/ui/Hero"
import CompanyInfo from "@/app/ui/CompanyInfo"
import Services from "@/app/ui/Services"
import ParcelsInfo from "@/app/ui/ParcelsInfo"
import Stats from "@/app/ui/Stats"
import WhyVosa from "@/app/ui/WhyVosa"
import Testimonials from "@/app/ui/Testimonials"
import Contact from "@/app/ui/Contact"
import Footer from "@/app/ui/Footer"
import TicketInfoPromo from "@/app/ui/TicketInfoPromo"

export default function Home() {
    useEffect(() => {
        initLenis()
    }, [])

    return (
        <main className="bg-white text-gray-800">
            <Hero />
            <TicketInfoPromo />
            <CompanyInfo />
            <Stats />
            <WhyVosa />
            <Services />
            <ParcelsInfo />
            <Testimonials />
            <Contact />
            <Footer />
        </main>
    )
}
