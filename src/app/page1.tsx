import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection1'
import ServicesSection from '@/components/ServicesSection'
import LocationsMap from '@/components/LocationsMap'
import RoomGallery from '@/components/RoomGallery'
import CallToAction from '@/components/CallToAction'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <LocationsMap />
      <RoomGallery />
      <CallToAction />
    </div>
  )
}