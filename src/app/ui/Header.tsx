"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Phone, Menu, X, Clock, Mail, Package } from "lucide-react"
import Link from "next/link";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            setIsMenuOpen(false)
        }
    }

    return (
        <>
            {/* Top Bar - Solo desktop */}
            <div className="hidden lg:block bg-orange-600 text-white text-sm">
                <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <span>0800-333-8672</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={14} />
                            <span>info@vosa.com.ar</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Clock size={14} />
                            <span>Atención personalizada</span>
                        </div>
                        <a
                          href="http://mercury.sisorgcloud.com/tracking/P6ndO5ThH54AI6tYq1JcwOxlbAGiXtWsG40PVhkm***tn9QQbyJCOgNu1GTDm0***43HzO2+AVoupOMwltIFJ18LlTKeMaAdYsQxjcWoD1drZuCkU1m2VbzaCUWpAXVBsDgs+rxLpHV5OBc0i6+n66UfqpqgzWI59LZJV4YnS0LJCXKzxjF5rElod0UfTaQlE0uX"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-orange-600 font-semibold px-3 py-1 rounded shadow hover:bg-orange-100 transition inline-flex items-center gap-2"
                        >
                          <Package size={18} />
                          Seguí tu encomienda
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
                        : "bg-white/80 backdrop-blur-sm"
                } ${!isScrolled ? "lg:top-[40px]" : ""}`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/">
                            <Image src="/img/logo.png" alt="Vosa Logo" width={120} height={120} className="w-auto h-12 md:h-16" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <button
                            onClick={() => scrollToSection("inicio")}
                            className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                        >
                            Inicio
                        </button>
                        <button
                            onClick={() => scrollToSection("servicios")}
                            className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                        >
                            Servicios
                        </button>
                        <button
                            onClick={() => scrollToSection("encomiendas")}
                            className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                        >
                            Encomiendas
                        </button>
                        <button
                            onClick={() => scrollToSection("nosotros")}
                            className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                        >
                            Nosotros
                        </button>
                        <button
                            onClick={() => scrollToSection("contacto")}
                            className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                        >
                            Contacto
                        </button>
                        {/* Elimino el botón feo del menú principal */}
                    </nav>

                    {/* CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-4">
                        <a
                            href="tel:08003338672"
                            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
                        >
                            <Phone size={18} />
                            <span className="hidden xl:inline">0800-333-8672</span>
                        </a>
                        <button
                            onClick={() => scrollToSection("hero")}
                            className="bg-orange-600 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-700 transition-colors"
                        >
                            Comprar Pasajes
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden transition-all duration-300 ${
                        isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden bg-white border-t border-gray-200`}
                >
                    <nav className="px-6 py-4 space-y-4">
                        <button
                            onClick={() => scrollToSection("inicio")}
                            className="block w-full text-left text-gray-700 hover:text-orange-600 font-medium py-2 transition-colors"
                        >
                            Inicio
                        </button>
                        <button
                            onClick={() => scrollToSection("servicios")}
                            className="block w-full text-left text-gray-700 hover:text-orange-600 font-medium py-2 transition-colors"
                        >
                            Servicios
                        </button>
                        <button
                            onClick={() => scrollToSection("encomiendas")}
                            className="block w-full text-left text-gray-700 hover:text-orange-600 font-medium py-2 transition-colors"
                        >
                            Encomiendas
                        </button>
                        <button
                            onClick={() => scrollToSection("nosotros")}
                            className="block w-full text-left text-gray-700 hover:text-orange-600 font-medium py-2 transition-colors"
                        >
                            Nosotros
                        </button>
                        <button
                            onClick={() => scrollToSection("contacto")}
                            className="block w-full text-left text-gray-700 hover:text-orange-600 font-medium py-2 transition-colors"
                        >
                            Contacto
                        </button>
                        {/* Elimino el botón feo del menú mobile */}

                        <div className="pt-4 border-t border-gray-200 space-y-3">
                            <a href="tel:08003338672" className="flex items-center gap-2 text-orange-600 font-medium">
                                <Phone size={18} />
                                0800-333-8672
                            </a>
                            <button
                                onClick={() => scrollToSection("hero")}
                                className="w-full bg-orange-600 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-700 transition-colors"
                            >
                                Comprar Pasajes
                            </button>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}
