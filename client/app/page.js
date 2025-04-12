import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Share Books, Connect Lives</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            BookBridge helps you exchange, rent, and discover books from people in your community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium text-lg transition duration-300">
              Get Started
            </Link>
            <Link href="/books" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium text-lg transition duration-300">
              Browse Books
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">Sign up as a Book Owner or Seeker based on your needs.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">List or Find Books</h3>
              <p className="text-gray-600">Owners can list books, while Seekers can browse the collection.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect & Exchange</h3>
              <p className="text-gray-600">Contact the owner and arrange to rent or exchange books.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-12 bg-gray-50 rounded-xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Books</h2>
            <Link href="/books" className="text-blue-600 hover:text-blue-800 font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* This would ideally be populated from the API */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow p-4">
                <div className="bg-gray-200 h-40 rounded-md mb-4 relative">
                  {/* Placeholder for book cover */}
                </div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of book lovers today and start sharing your collection.
          </p>
          <Link href="/register" className="btn-primary text-lg px-8 py-3">
            Create an Account
          </Link>
        </div>
      </section>
    </div>
  );
}
