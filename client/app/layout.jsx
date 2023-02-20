import Providers from './providers';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen">
        <Providers>
          <div>
            <nav>Navbar</nav>
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
