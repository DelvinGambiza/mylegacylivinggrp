'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Users, Home, Shield } from 'lucide-react'

const serviceAreas = [
  {
    id: 1,
    state: 'Maryland',
    cities: ['Baltimore', 'Annapolis', 'Columbia', 'Silver Spring', 'Rockville'],
    contactPerson: 'Sarah Johnson',
    phone: '(410) 555-0123',
    email: 'md-homes@mylegacylivinggroup.com',
    address: '123 Main Street, Baltimore, MD 21201',
    hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM'
  },
  {
    id: 2,
    state: 'Indiana',
    cities: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel'],
    contactPerson: 'Michael Rodriguez',
    phone: '(317) 555-9876',
    email: 'in-homes@mylegacylivinggroup.com',
    address: '456 Maple Avenue, Indianapolis, IN 46204',
    hours: 'Mon-Fri: 8AM-5PM, Sat: 9AM-3PM'
  },
  {
    id: 3,
    state: 'Illinois',
    cities: ['Chicago', 'Springfield', 'Peoria', 'Naperville', 'Aurora'],
    contactPerson: 'Jennifer Williams',
    phone: '(312) 555-4567',
    email: 'il-homes@mylegacylivinggroup.com',
    address: '789 Oak Boulevard, Chicago, IL 60607',
    hours: 'Mon-Fri: 9AM-7PM, Sat: 10AM-5PM'
  }
]

export default function ContactPage() {
  const [selectedArea, setSelectedArea] = useState(serviceAreas[0])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
    contactMethod: 'email'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your message! We will contact you within 24 hours.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      message: '',
      contactMethod: 'email'
    })
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1F3A5F] to-[#2E2E2E] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Get in touch with our team across Maryland, Indiana, and Illinois. 
              We're here to help you find the perfect supportive living environment.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Service Areas */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-[#1F3A5F] mb-6">Our Service Areas</h2>
              
              {/* Service Area Cards */}
              <div className="space-y-4">
                {serviceAreas.map((area) => (
                  <div
                    key={area.id}
                    onClick={() => setSelectedArea(area)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedArea.id === area.id
                        ? 'border-[#8FAF9B] bg-[#8FAF9B]/5 shadow-md'
                        : 'border-[#E5E7EB] bg-white hover:border-[#8FAF9B]/50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8FAF9B] to-[#C6A75E] flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-[#1F3A5F]">{area.state}</h3>
                        <p className="text-sm text-[#2E2E2E]/70 mt-1">Serving:</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {area.cities.map((city, index) => (
                            <span
                              key={index}
                              className="inline-block bg-[#FAFAF7] text-[#2E2E2E] px-2 py-1 rounded text-xs border border-[#E5E7EB]"
                            >
                              {city}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact Info */}
              <div className="mt-8 p-6 bg-white rounded-xl border border-[#E5E7EB]">
                <h3 className="font-bold text-lg text-[#1F3A5F] mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-[#8FAF9B] mr-3" />
                    <div>
                      <p className="text-sm text-[#2E2E2E]/60">General Inquiries</p>
                      <p className="font-medium text-[#2E2E2E]">info@mylegacylivinggroup.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#8FAF9B] mr-3" />
                    <div>
                      <p className="text-sm text-[#2E2E2E]/60">Main Office</p>
                      <p className="font-medium text-[#2E2E2E]">(217) 766-1995</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form & Selected Area Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Selected Area Details */}
            <div className="bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1F3A5F]">
                  {selectedArea.state} Office
                </h2>
                <div className="px-3 py-1 bg-[#8FAF9B] text-white rounded-full text-sm font-medium">
                  Active
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FAFAF7] flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-[#8FAF9B]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#2E2E2E]/60">Contact Person</p>
                      <p className="font-medium text-[#2E2E2E]">{selectedArea.contactPerson}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FAFAF7] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#8FAF9B]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#2E2E2E]/60">Direct Phone</p>
                      <p className="font-medium text-[#2E2E2E]">{selectedArea.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FAFAF7] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#8FAF9B]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#2E2E2E]/60">Office Address</p>
                      <p className="font-medium text-[#2E2E2E]">{selectedArea.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FAFAF7] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#8FAF9B]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#2E2E2E]/60">Office Hours</p>
                      <p className="font-medium text-[#2E2E2E]">{selectedArea.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-6">
              <h2 className="text-2xl font-bold text-[#1F3A5F] mb-2">Send Us a Message</h2>
              <p className="text-[#2E2E2E]/70 mb-6">
                Fill out the form below and our team will contact you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:border-[#8FAF9B] focus:ring-2 focus:ring-[#8FAF9B]/20 outline-none transition"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:border-[#8FAF9B] focus:ring-2 focus:ring-[#8FAF9B]/20 outline-none transition"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:border-[#8FAF9B] focus:ring-2 focus:ring-[#8FAF9B]/20 outline-none transition"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                      Preferred Location *
                    </label>
                    <select
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:border-[#8FAF9B] focus:ring-2 focus:ring-[#8FAF9B]/20 outline-none transition bg-white"
                    >
                      <option value="">Select a location</option>
                      <option value="MD">Maryland</option>
                      <option value="IN">Indiana</option>
                      <option value="IL">Illinois</option>
                      <option value="unsure">Not Sure Yet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    How should we contact you? *
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { id: 'email', label: 'Email', icon: Mail },
                      { id: 'phone', label: 'Phone Call', icon: Phone },
                      { id: 'text', label: 'Text Message', icon: Phone },
                    ].map((method) => {
                      const Icon = method.icon
                      return (
                        <label key={method.id} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="contactMethod"
                            value={method.id}
                            checked={formData.contactMethod === method.id}
                            onChange={(e) => setFormData({...formData, contactMethod: e.target.value})}
                            className="sr-only"
                          />
                          <div className={`flex items-center px-4 py-2 rounded-lg border ${
                            formData.contactMethod === method.id
                              ? 'border-[#8FAF9B] bg-[#8FAF9B]/10'
                              : 'border-[#E5E7EB] hover:border-[#8FAF9B]/50'
                          }`}>
                            <Icon className={`w-4 h-4 mr-2 ${
                              formData.contactMethod === method.id ? 'text-[#8FAF9B]' : 'text-[#2E2E2E]/60'
                            }`} />
                            <span className={
                              formData.contactMethod === method.id 
                                ? 'text-[#8FAF9B] font-medium' 
                                : 'text-[#2E2E2E]'
                            }>
                              {method.label}
                            </span>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:border-[#8FAF9B] focus:ring-2 focus:ring-[#8FAF9B]/20 outline-none transition resize-none"
                    placeholder="Tell us about your housing needs, questions, or how we can help..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    className="w-4 h-4 text-[#8FAF9B] border-[#E5E7EB] rounded focus:ring-[#8FAF9B]"
                  />
                  <label htmlFor="consent" className="ml-2 text-sm text-[#2E2E2E]/70">
                    I consent to My Legacy Living Group contacting me about housing services. *
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#8FAF9B] to-[#8FAF9B]/90 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Support Info */}
            <div className="bg-gradient-to-r from-[#FAFAF7] to-white rounded-xl border border-[#E5E7EB] p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#8FAF9B]/10 flex items-center justify-center mx-auto mb-3">
                    <Home className="w-6 h-6 text-[#8FAF9B]" />
                  </div>
                  <h4 className="font-semibold text-[#1F3A5F] mb-1">Housing Support</h4>
                  <p className="text-sm text-[#2E2E2E]/70">Find the right living environment</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#C6A75E]/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-[#C6A75E]" />
                  </div>
                  <h4 className="font-semibold text-[#1F3A5F] mb-1">Community Building</h4>
                  <p className="text-sm text-[#2E2E2E]/70">Connect with supportive peers</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1F3A5F]/10 flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-[#1F3A5F]" />
                  </div>
                  <h4 className="font-semibold text-[#1F3A5F] mb-1">Safe Environment</h4>
                  <p className="text-sm text-[#2E2E2E]/70">Trauma-informed, secure housing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}