import Navbar from '@/components/navbar'
import 'styles/globals.css'


export const metadata = {
  title: 'OddSea',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        </body>
    </html>
  )
}