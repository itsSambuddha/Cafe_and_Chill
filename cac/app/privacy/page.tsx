import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-coffee-50">
            <Navbar />

            <main className="pt-24 pb-12">
                <div className="mx-auto max-w-4xl px-6 md:px-10">

                    <h1 className="mb-8 text-3xl font-bold tracking-tight text-coffee-900 md:text-4xl">
                        Privacy Policy
                    </h1>

                    <div className="prose prose-coffee max-w-none text-coffee-800">
                        <p><strong>Last Updated: January 11, 2026</strong></p>

                        <p>
                            At Cafe & Chill, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.
                        </p>

                        <h3>1. Information We Collect</h3>
                        <p>
                            We may collect personal information such as your name, email address, and phone number when you:
                        </p>
                        <ul>
                            <li>Make a reservation</li>
                            <li>Sign up for our newsletter</li>
                            <li>Contact us via our website forms</li>
                        </ul>

                        <h3>2. How We Use Your Information</h3>
                        <p>
                            We use the collected information to:
                        </p>
                        <ul>
                            <li>Process your reservations and orders</li>
                            <li>Send you updates, promotional offers, and newsletters (if you opted in)</li>
                            <li>Improve our website and customer service</li>
                        </ul>

                        <h3>3. Cookies</h3>
                        <p>
                            Our website uses cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us remember your preferences and analyze site traffic. You can choose to disable cookies in your browser settings.
                        </p>

                        <h3>4. Data Security</h3>
                        <p>
                            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                        </p>

                        <h3>5. Third-Party Services</h3>
                        <p>
                            We may use third-party services (such as analytics providers or payment processors) that collect and process data on our behalf. These parties are obligated to keep your information confidential.
                        </p>

                        <h3>6. Contact Us</h3>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@cafeandchill.in">hello@cafeandchill.in</a>.
                        </p>
                    </div>

                </div>
            </main>

            {/* <Footer /> */}
        </div>
    );
}
