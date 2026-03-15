import "./globals.css"
import Navbar from "../components/Navbar"
 
export const metadata = {
  title: "Cuddle Platform",
  description: "Find professional cuddlers near you"
}
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
 
      <body className="bg-gray-100 text-gray-900">
 
        <Navbar />
 
        {children}
 
      </body>
 
    </html>
  )
}
 