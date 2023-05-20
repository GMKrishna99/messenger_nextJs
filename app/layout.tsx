import ToasterContext from './context/ToasterContext'
import './globals.css'
import { Nunito } from 'next/font/google'

const inter = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Messenger',
  description: 'Chatting for personal use',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* toaster that give error notification */}
        <ToasterContext />

        {children}
      </body>
    </html>
  )
}
