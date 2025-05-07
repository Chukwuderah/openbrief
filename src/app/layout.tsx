import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/components/QueryProvider";
import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenBrief | AI Brief Generator for Freelancers",
  description:
    "OpenBrief helps freelancers instantly generate client briefs using AI. Save time, look pro, and land more gigs — no more guesswork.",
  keywords: [
    "freelance",
    "client briefs",
    "AI",
    "project briefs",
    "OpenBrief",
    "freelancer tools",
  ],
  // authors: [{ name: "Praevus", url: "https://yourwebsite.com" }],
  creator: "Praevus",
  openGraph: {
    title: "OpenBrief | AI Brief Generator",
    description: "Generate powerful client briefs in seconds with AI.",
    url: "https://openbrief.app",
    siteName: "OpenBrief",
    type: "website",
    images: [
      {
        url: "https://openbrief.app/og-image.png", 
        width: 1200,
        height: 630,
        alt: "OpenBrief screenshot",
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "OpenBrief | AI Brief Generator",
  //   description: "Craft client briefs in seconds using AI.",
  //   images: ["https://openbrief.app/og-image.png"],
  //   creator: "@yourhandle",
  // },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex min-w-full bg-background">
        <QueryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <SidebarProvider defaultOpen>
              <div className="min-h-screen flex w-full md:w-[98.9vw] mx-auto bg-background">
                <AppSidebar />
                <SidebarInset>
                  <div className="flex flex-col min-h-screen w-full">
                    <Navbar />
                    <main className="flex-1 pt-16 md:w-full">{children}</main>
                  </div>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
