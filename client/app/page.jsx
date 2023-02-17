import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Link from 'next/Link'

const inter = Inter({ subsets: ['latin'] })

export default function LandingPage() {
  return (
    <main className="">
      <h1>Welcome to AppName</h1>

      <h2>We make doing x, y, and z easy!</h2>

      <Link href="/login"><h2>Sign in with Google</h2></Link>
      <h2>Sign in with Facebook</h2>
      
      <h3><button>Already a user?</button></h3>
    </main>
  )
}
