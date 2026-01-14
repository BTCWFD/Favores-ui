import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from '@/context/UserContext';
import ExperiencePolisher from '@/components/ExperiencePolisher';
import MobileNav from '@/components/MobileNav';

export const metadata: Metadata = {
    title: "FAVORES - Economía Colaborativa Sin Dinero",
    description: "Plataforma de intercambio de habilidades, tiempo y conocimiento. Ayuda a tu comunidad sin dinero de por medio.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#0ea5e9" />
            </head>
            <body className="antialiased">
                <UserProvider>
                    <ExperiencePolisher />
                    {children}
                    <MobileNav />
                </UserProvider>
            </body>
        </html>
    );
}
