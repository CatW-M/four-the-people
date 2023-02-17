'use client';
import { Inter } from '@next/font/google'
import Link from 'next/Link'
import { useSession, signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  const {data: session} = useSession();
  if (session) {
   return (
    <div>
      <div className="">Welcome, {session.user.name}</div>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
   ) 
  } else {
    return (
      <div className="">
        <p>You are not signed in.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    )
  }
}

