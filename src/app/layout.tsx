import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next";
import QueryContainer from "@/app/components/common/QueryContainer";
import WhatsappButton from "@/app/components/common/WhatsAppButton";
import Footer from "@/app/components/common/Footer";
import Navbar from "@/app/components/common/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {

    title: 'TuPintor - Cordoba',
    description: 'Pedi tu Presupuesto',
    icons: {
        icon: 'favicon.svg'
    },
    openGraph: {
        siteName: "TuPintor - Cordoba",
        type: "website",
        locale: "es_LA"
    },
    robots: {
        index: true,
        follow: true,
        googleBot: "index, follow"
    },
    keywords: ["pintor", "pintura", "presupuesto"]
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang="es" className="h-full">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
                    <main>
                        <QueryContainer>
                            <Navbar />
                            {children}
                            <WhatsappButton />
                        </QueryContainer>
                        <Footer />
                    </main>
            </body>
        </html>
    );
}

export default RootLayout;