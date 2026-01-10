// components/landing/VisitSection.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MapPin, Clock, Phone, MessageCircle, Navigation, ExternalLink } from "lucide-react";
import { SectionLabel } from "@/components/landing/SectionLabel";

export function VisitSection() {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "#";

    return (
        <section className="relative mx-auto max-w-[1440px] px-6 py-32 md:py-48 overflow-hidden" id="visit">
            {/* Standardized Vertical Label (Left side) */}
            <SectionLabel text="VISIT" side="left" className="xl:left-0" />

            <div className="relative z-10 lg:ml-24 xl:ml-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid gap-12 rounded-[2.5rem] border border-coffee-200 bg-white/60 p-8 md:p-12 shadow-sm backdrop-blur-sm md:grid-cols-12 overflow-hidden"
                >
                    {/* Info Column */}
                    <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-between space-y-10">
                        <div>
                            <div className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-coffee-600">
                                <Navigation className="h-4 w-4" />
                                <span>Locate Us</span>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-coffee-900 md:text-5xl">Come say hi.</h2>
                            <p className="mt-4 text-lg text-coffee-800/80 leading-relaxed font-light">
                                We&apos;re located in the heart of Shillong. Perfect for a quick stop or a long stay.
                            </p>
                        </div>

                        <div className="space-y-8 text-sm text-coffee-800/80">
                            <div className="flex gap-6 group">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-coffee-100 text-coffee-900 transition-transform group-hover:scale-110">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-bold text-coffee-900 text-base uppercase tracking-wide">Timings</div>
                                    <p className="mt-1 leading-relaxed text-base">Open daily <br /> 7:00 AM &ndash; 9:30 PM</p>
                                </div>
                            </div>
                            <div className="flex gap-6 group">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-coffee-100 text-coffee-900 transition-transform group-hover:scale-110">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-bold text-coffee-900 text-base uppercase tracking-wide">Address</div>
                                    <p className="mt-1 leading-relaxed text-base">Police Bazaar, Shillong, <br /> Meghalaya 793001</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <button
                                onClick={() => window.open('https://maps.app.goo.gl/DD6rdz4r9csfH3cbA', '_blank')}
                                className="group flex w-full items-center justify-between rounded-full bg-coffee-900 px-8 py-4 text-sm font-medium text-white transition-all hover:bg-coffee-800 hover:shadow-lg hover:shadow-coffee-900/20 active:scale-[0.98]"
                            >
                                <span>Get directions</span>
                                <ExternalLink className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-1" />
                            </button>

                            <div className="grid grid-cols-2 gap-4">
                                <a
                                    href="tel:+910000000000"
                                    className="flex items-center justify-center gap-2 rounded-full border border-coffee-200 bg-white px-6 py-4 text-sm font-medium text-coffee-900 transition-all hover:bg-coffee-50 hover:border-coffee-300 active:scale-[0.98]"
                                >
                                    <Phone className="h-4 w-4" />
                                    <span>Call</span>
                                </a>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-full border border-coffee-200 bg-white px-6 py-4 text-sm font-medium text-coffee-900 transition-all hover:bg-coffee-50 hover:border-coffee-300 active:scale-[0.98]"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    <span>WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Map Column */}
                    <div className="md:col-span-12 lg:col-span-7 h-full min-h-[400px]">
                        <div className="h-full w-full overflow-hidden rounded-3xl bg-coffee-100/50 border border-coffee-200/50 relative group">

                            {/* 
                                TODO: PASTE MAP IFRAME HERE 
                                1. Go to Google Maps -> Share -> Embed a map.
                                2. Copy the <iframe> code.
                                3. Replace the ENTIRE inner content of this div with your iframe.
                                4. Ensure the iframe has className="absolute inset-0 h-full w-full border-0"
                            */}

                            {/* Map Placeholder Content */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14395.549055693156!2d91.86339528715818!3d25.5754172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37507f5c91e4b91f%3A0xb2181c4dae2a122c!2sCoffee%20%26%20Chill!5e0!3m2!1sen!2sin!4v1768081884305!5m2!1sen!2sin"
                                className="absolute inset-0 h-full w-full border-0 filter grayscale-[0.2] contrast-[1.1] opacity-90 hover:opacity-100 transition-all duration-500"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
