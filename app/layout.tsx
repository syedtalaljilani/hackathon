import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster"
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import PageFooter from "@/components/ui/PageFooter/pagefooter";
import Link from "next/link";
 
function Header() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: 20 }}>
      <Link href='/'>
      <p className='text-6xl font-thin'>With<span className='text-4xl font-mono text-green-500'>Easiness</span></p>
        </Link>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton/>
      </SignedOut>
    </header>
  );
}
export const metadata: Metadata = {
  title: "With Easiness",
  description: "Create Unique , Regenerate Similar ,and Chat with Content With Easiness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

      <ClerkProvider>
        <Header/>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        >
        {children}
        <Toaster />
        </ThemeProvider>
        <PageFooter/>
      </ClerkProvider>
      </body>
    </html>
  );
}
