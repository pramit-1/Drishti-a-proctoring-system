import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MuiThemeProvider from "../components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Proctoring System",
  description: "Online Proctoring and Exam Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MuiThemeProvider>
          {children}
        </MuiThemeProvider>
      </body>
    </html>
  );
}
