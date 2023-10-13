import './globals.css'
import type { Metadata } from 'next'
import { M_PLUS_Rounded_1c } from 'next/font/google'

const M = M_PLUS_Rounded_1c({ subsets: ['latin', 'cyrillic'], weight: ['100', '400', '500', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'Pomodor',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body data-theme="luxury" className={`${M.className} min-h-screen`}>
        <div className='max-w-xl px-4 pt-4 mx-auto'>
          <h1 className='text-2xl font-medium'>Pomofocus</h1>
          <div className='divider'></div>
        </div>
        <div className='flex items-center justify-center max-w-xl p-6 mx-auto rounded-lg shadow-xl bg-neutral/70 sm:p-14 '>
          {children}
        </div>
      </body>
    </html>
  )
}
