import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-coffee-50">
            <Navbar />

            <main className="pt-24 pb-12">
                <div className="mx-auto max-w-4xl px-6 md:px-10">

                    <h1 className="mb-8 text-3xl font-bold tracking-tight text-coffee-900 md:text-4xl">
                        Terms of Service
                    </h1>

                    <div className="prose prose-coffee max-w-none text-coffee-800">
                        <p><strong>Last Updated: January 11, 2026</strong></p>

                        <p>
                            Welcome to Cafe & Chill. By accessing our website or visiting our cafe, you agree to be bound by these Terms of Service. Please read them carefully.
                        </p>

                        <h3>1. Use of Website</h3>
                        <p>
                            You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
                        </p>

                        <h3>2. Intellectual Property</h3>
                        <p>
                            All content on this website, including text, graphics, logos, images, and software, is the property of Cafe & Chill or its content suppliers and is protected by copyright laws. You may not reproduce, distribute, or create derivative works from this content without our express written consent.
                        </p>

                        <h3>3. Reservations and Confirmations</h3>
                        <p>
                            All reservations made through our website are subject to availability and confirmation by Cafe & Chill. We reserve the right to cancel or modify reservations at our discretion.
                        </p>

                        <h3>4. Limitation of Liability</h3>
                        <p>
                            Cafe & Chill shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of this website. This includes damages to, or viruses that may infect, your computer equipment.
                        </p>

                        <h3>5. Changes to Terms</h3>
                        <p>
                            We reserve the right to modify these Terms of Service at any time. Any changes will be posted on this page with an updated revision date. Your continued use of the website after such changes constitutes your acceptance of the new Terms.
                        </p>

                        <h3>6. Governing Law</h3>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                        </p>

                        <h3>7. Contact Information</h3>
                        <p>
                            For any questions regarding these Terms of Service, please contact us at <a href="mailto:hello@cafeandchill.in">hello@cafeandchill.in</a>.
                        </p>
                    </div>

                </div>
            </main>

            {/* <Footer /> */}
        </div>
    );
}
