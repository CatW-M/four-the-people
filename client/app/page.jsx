import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <h1 className="text-lg items-center place-content-center py-4 m-2">Testing, Testing, Eins, Zwei, Drei</h1>
    </main>
  )
}
