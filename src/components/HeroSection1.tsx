import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative bg-[#1F3A5F] text-white pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to My Legacy Living Group
          </h1>
          <p className="text-xl text-[#E5E7EB] mb-8 max-w-3xl mx-auto">
            We provide dignified, respectful support and safe, structured housing 
            that give residents the space and structure they need to rebuild, grow, 
            and create lasting stability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/rooms" 
              className="bg-[#8FAF9B] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition"
            >
              View Available Rooms
            </Link>
            <Link 
              href="/apply" 
              className="border-2 border-[#C6A75E] text-[#C6A75E] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#C6A75E] hover:bg-opacity-10 transition"
            >
              Start Application
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}