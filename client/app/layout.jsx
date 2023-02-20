import Providers from './providers';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen">
        <Providers>
            <div className="navbar">
              <nav>Navbar</nav>
            </div>
            <main className="main">
              {children}
            </main>
        </Providers>
      </body>
    </html>
  )
}
