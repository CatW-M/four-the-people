import Providers from './providers';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen">
        <nav><h2>Navbar</h2></nav>
        <Providers>{children}</Providers>
        <footer><h2>Footer</h2></footer>
      </body>
    </html>
  )
}
