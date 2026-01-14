import type { Metadata } from "next";
import "./globals.css";

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
            <body>{children}</body>
        </html>
    );
}
