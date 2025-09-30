"use client"

import { Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { name: "Inicio", href: "#hero" },
        { name: "Servicios", href: "#servicios" },
        { name: "Encomiendas", href: "#encomiendas" },
        { name: "Nosotros", href: "#nosotros" },
        { name: "Contacto", href: "#contacto" },
        { name: "Ubicación de tu Micro", href: "/ubicacion-micro" },
    ]

    const services = [
        { name: "Servicio Suite", href: "#servicios" },
        { name: "Servicio Cama", href: "#servicios" },
        { name: "Servicio Semi-Cama", href: "#servicios" },
        { name: "Encomiendas", href: "#encomiendas" },
    ]

    const destinations = ["Buenos Aires", "Tucumán", "Salta", "Santiago del Estero", "La Banda", "Resistencia"]

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <Image src="/img/logo.png" alt="Vosa Logo" width={120} height={120} className="brightness-0 invert" />
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Más de 25 años conectando Argentina con seguridad, confort y puntualidad. Tu viaje perfecto comienza con
                            nosotros.
                        </p>
                        {/* Social media
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="bg-gray-800 hover:bg-orange-600 p-2 rounded-full transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="#"
                                className="bg-gray-800 hover:bg-orange-600 p-2 rounded-full transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="#"
                                className="bg-gray-800 hover:bg-orange-600 p-2 rounded-full transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="#"
                                className="bg-gray-800 hover:bg-orange-600 p-2 rounded-full transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube size={20} />
                            </a>
                        </div>
                        */}
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Enlaces rápidos</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-orange-400 transition-colors flex items-center"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Servicios</h3>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a
                                        href={service.href}
                                        className="text-gray-300 hover:text-orange-400 transition-colors flex items-center"
                                    >
                                        {service.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Contacto</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Phone className="text-orange-500 mt-1" size={18} />
                                <div>
                                    <p className="font-medium">0800-333-8672</p>
                                    <p className="text-gray-400 text-sm">Línea gratuita 24hs</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="text-orange-500 mt-1" size={18} />
                                <div>
                                    <p className="font-medium">info@vosa.com.ar</p>
                                    <p className="text-gray-400 text-sm">Respuesta en 24hs</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="text-orange-500 mt-1" size={18} />
                                <div>
                                    <p className="font-medium">Boletería 57</p>
                                    <p className="text-gray-400 text-sm">Retiro, Buenos Aires</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Destinations */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <h3 className="text-lg font-semibold mb-6">Principales destinos</h3>
                    <div className="flex flex-wrap gap-4">
                        {destinations.map((destination, index) => (
                            <span
                                key={index}
                                className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-orange-600 hover:text-white transition-colors cursor-pointer"
                            >
                {destination}
              </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-gray-400 text-sm">© {currentYear} Vosa. Todos los derechos reservados.</div>
                        {/*
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                                Términos y Condiciones
                            </a>
                            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                                Política de Privacidad
                            </a>
                            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                                Política de Cookies
                            </a>
                        </div>
                         */}
                        <div className="flex gap-6 text-sm">
                            <a href="https://ecommerce.centraldepasajes.com.ar/login.aspx?agencia=C22TQeAa5%2bQ%2bOA6kFwavSXDleWuYm6XQjH9s3%2f3J%2bNI%3d&page=devol" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors">
                                Cancelar una compra
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
