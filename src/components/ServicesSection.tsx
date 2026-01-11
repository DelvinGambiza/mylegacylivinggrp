export default function ServicesSection() {
  const services = [
    "Fully furnished private or semi-private rooms",
    "Fully stocked and furnished kitchen, living room, bathrooms",
    "24/7 supervision and wellness checks",
    "Wi-Fi, utilities, and household supplies included",
    "On-site washer and dryer",
    "Computer access",
    "Supportive routines and structured expectations",
    "Coordination with case managers, clinicians, and community providers"
  ]

  const addOnServices = [
    "Case management",
    "Transportation",
    "Life-skills coaching",
    "Benefits support",
    "Medication reminders",
    "Job readiness and employment support",
    "Connection to education, training, and vocation programs",
    "Connection to counseling and therapy",
    "Budgeting and financial literacy",
    "Peer-led community building activities",
    "Group health and wellness activities"
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F3A5F] mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-[#C6A75E] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-[#FAFAF7] p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-[#1F3A5F] mb-6">
              Included in Every Home
            </h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#8FAF9B] rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-[#2E2E2E]">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FAFAF7] p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-[#1F3A5F] mb-6">
              Optional Add-On Services
            </h3>
            <ul className="space-y-4">
              {addOnServices.map((service, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#C6A75E] rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-sm">+</span>
                  </div>
                  <span className="text-[#2E2E2E]">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}