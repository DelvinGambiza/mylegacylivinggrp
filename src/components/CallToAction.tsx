import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="py-16 px-4 bg-[#1F3A5F]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-[#E5E7EB] mb-10 max-w-3xl mx-auto">
            Join our community and begin your journey toward stable, supportive, and independent living.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/apply"
              className="bg-[#8FAF9B] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition"
            >
              Apply for Housing
            </Link>
            <Link
              href="/contact"
              className="bg-white text-[#1F3A5F] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition"
            >
              Contact Our Team
            </Link>
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Have Questions?</h3>
            <p className="text-[#E5E7EB] mb-6">
              Our team is here to help. Reach out to us anytime.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-white mb-2">Email</h4>
                <p className="text-[#E5E7EB]">info@mylegacylivinggroup.com</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Phone</h4>
                <p className="text-[#E5E7EB]">(XXX) XXX-XXXX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}