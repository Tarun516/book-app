// app/layout.js
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // Import the client component for interactive footer

export const metadata = {
  title: 'Peer-to-Peer Book Exchange',
  description: 'Book Exchange Portal for Owners and Seekers',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
