import Providers from './providers';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen">
        <nav>
          <div>Navbar</div>
        </nav>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
