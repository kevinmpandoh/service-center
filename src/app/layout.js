import { Nunito } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "A+ Service Center",
  description: "Aplikasi Perbaikan HP dan Laptop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
