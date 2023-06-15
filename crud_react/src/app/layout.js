import "./globals.css"

import { Inter } from "next/font/google"
import RecoilRoot from "../components/RootWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Simple CRUD",
  description: "Generated by create next app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  )
}