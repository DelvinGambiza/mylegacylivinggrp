import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-10 px-4 bg-gradient-to-br from-[#1F3A5F] to-[#2E2E2E]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Start Your Application Today
          </h2>
          
          <p className="text-white/80 mb-6">
            Our team is ready to help you find stable, supportive housing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link 
              href="/apply" 
              className="px-6 py-2.5 bg-[#8FAF9B] text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Apply Now
            </Link>
            
            <Link 
              href="/contact" 
              className="px-6 py-2.5 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/15 transition-colors"
            >
              Contact Us
            </Link>
          </div>
          
          {/* Simple inline indicators */}
          <div className="mt-8 pt-5 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-3 text-sm text-white/60">
              <span>✓ 24/7 Support</span>
              <span>✓ Fully Furnished</span>
              <span>✓ Trauma-Informed Care</span>
              <span>✓ Community Living</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}