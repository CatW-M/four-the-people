import { Inter } from '@next/font/google'
import styles from '../page.module.css'
import Link from 'next/Link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="h-screen">
      <h1 className="text-lg items-center place-content-center py-4 m-2">Welcome to AppName!</h1>
      <h2 className="items-center place-content-center py-4 m-2">Check out any of the following pages!</h2>
      <div>
        <h3><Link href="/about">About</Link></h3>
        <h3><Link href="/tracker">Food Tracker</Link></h3>
      </div>
    </main>
  )
}