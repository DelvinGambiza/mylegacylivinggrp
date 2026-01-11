'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ApplyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  // Get room ID from URL if present
  const roomId = searchParams.get('room')
  
  // Extended form data structure matching database schema
  const [formData, setFormData] = useState({
    // Personal Information
    full_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    ssn_last_four: '', // For background checks
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_relationship: '',
    
    // Address Information
    current_address: '',
    current_city: '',
    current_state: '',
    current_zip: '',
    years_at_current_address: '',
    
    // Employment & Income
    employment_status: '',
    employer_name: '',
    employer_phone: '',
    position: '',
    monthly_income: '',
    income_source: '', // Employment, Disability, SSI, Pension, etc.
    additional_income_sources: '',
    
    // Room Preferences
    room_id: roomId || '', // From URL parameter
    preferred_location: '', // MD, IN, IL
    preferred_room_type: '', // single, shared
    desired_move_in_date: '',
    intended_length_of_stay: '', // <6 months, 6-12 months, 1-2 years, 2+ years
    
    // Health & Support Needs
    has_disability: '',
    disability_type: '',
    requires_support_services: '',
    support_needs_description: '',
    current_service_provider: '',
    
    // Background Information
    has_criminal_record: '',
    criminal_record_details: '',
    has_eviction_history: '',
    eviction_details: '',
    has_substance_abuse_history: '',
    currently_sober: '',
    sober_since: '',
    
    // References
    reference1_name: '',
    reference1_phone: '',
    reference1_relationship: '',
    reference1_years_known: '',
    reference2_name: '',
    reference2_phone: '',
    reference2_relationship: '',
    reference2_years_known: '',
    
    // Additional Information
    why_apply: '',
    goals_for_stay: '',
    additional_comments: '',
    
    // Consent & Agreements
    agree_background_check: false,
    agree_credit_check: false,
    agree_terms: false,
    agree_privacy_policy: false
  })

  // Mock function to submit to your API
  const submitApplication = async () => {
    setIsLoading(true)
    
    try {
      // Prepare form data for database
      const applicationData = {
        // These would come from your auth system in a real app
        applicant_id: 'user-id-from-auth', // This would come from your auth system
        room_id: formData.room_id || null,
        status: 'pending',
        form_data: formData, // JSONB field
        submitted_at: new Date().toISOString()
      }
      
      // In a real app, you would make an API call here:
      // const response = await fetch('/api/applications', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(applicationData)
      // })
      
      console.log('Application data:', applicationData)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      alert('Application submitted successfully! Our team will contact you within 24-48 hours.')
      router.push('/')
      
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('There was an error submitting your application. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields for final step
    if (step === 6) {
      if (!formData.agree_terms || !formData.agree_background_check) {
        alert('Please agree to the terms and background check consent to submit your application.')
        return
      }
      await submitApplication()
    } else {
      setStep(step + 1)
    }
  }

  // Update form field
  const updateFormField = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle checkbox changes
  const handleCheckboxChange = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }))
  }

  // Form validation for each step
  const validateStep = (stepNumber: number): boolean => {
    const requiredFields: { [key: number]: string[] } = {
      1: ['full_name', 'email', 'phone', 'date_of_birth'],
      2: ['current_address', 'current_city', 'current_state', 'current_zip'],
      3: ['employment_status', 'monthly_income'],
      4: ['preferred_location', 'preferred_room_type', 'desired_move_in_date'],
      5: ['emergency_contact_name', 'emergency_contact_phone'],
      6: ['agree_terms', 'agree_background_check']
    }

    const fields = requiredFields[stepNumber] || []
    return fields.every(field => {
      const value = formData[field as keyof typeof formData]
      return value !== '' && value !== false
    })
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5, 6].map((stepNum) => (
              <div key={stepNum} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepNum ? 'bg-[#1F3A5F] text-white' : 'bg-gray-200'}`}>
                  {stepNum}
                </div>
                <span className="text-sm mt-2 text-gray-600">
                  {stepNum === 1 && 'Personal'}
                  {stepNum === 2 && 'Address'}
                  {stepNum === 3 && 'Income'}
                  {stepNum === 4 && 'Room'}
                  {stepNum === 5 && 'Health'}
                  {stepNum === 6 && 'Review'}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-[#8FAF9B] rounded-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-[#1F3A5F] mb-2">Housing Application</h1>
          <p className="text-[#2E2E2E] mb-8">
            Complete this form to apply for supportive housing. All information is kept confidential.
          </p>
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-semibold text-[#1F3A5F] mb-6">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                      value={formData.full_name}
                      onChange={(e) => updateFormField('full_name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                      value={formData.email}
                      onChange={(e) => updateFormField('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                      value={formData.phone}
                      onChange={(e) => updateFormField('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                      value={formData.date_of_birth}
                      onChange={(e) => updateFormField('date_of_birth', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Last 4 Digits of SSN</label>
                    <input
                      type="text"
                      maxLength={4}
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                      value={formData.ssn_last_four}
                      onChange={(e) => updateFormField('ssn_last_four', e.target.value)}
                      placeholder="For background check purposes"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Current Address */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-semibold text-[#1F3A5F] mb-6">Current Address</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Street Address *</label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                      value={formData.current_address}
                      onChange={(e) => updateFormField('current_address', e.target.value)}
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[#2E2E2E] mb-2">City *</label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                        value={formData.current_city}
                        onChange={(e) => updateFormField('current_city', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[#2E2E2E] mb-2">State *</label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                        value={formData.current_state}
                        onChange={(e) => updateFormField('current_state', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[#2E2E2E] mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                        value={formData.current_zip}
                        onChange={(e) => updateFormField('current_zip', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Years at Current Address</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                      value={formData.years_at_current_address}
                      onChange={(e) => updateFormField('years_at_current_address', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Employment & Income */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-semibold text-[#1F3A5F] mb-6">Employment & Income</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Employment Status *</label>
                    <select
                      required
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                      value={formData.employment_status}
                      onChange={(e) => updateFormField('employment_status', e.target.value)}
                    >
                      <option value="">Select status</option>
                      <option value="employed">Employed</option>
                      <option value="unemployed">Unemployed</option>
                      <option value="disabled">Disabled</option>
                      <option value="retired">Retired</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                  
                  {formData.employment_status === 'employed' && (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[#2E2E2E] mb-2">Employer Name</label>
                          <input
                            type="text"
                            className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                            value={formData.employer_name}
                            onChange={(e) => updateFormField('employer_name', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[#2E2E2E] mb-2">Position</label>
                          <input
                            type="text"
                            className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                            value={formData.position}
                            onChange={(e) => updateFormField('position', e.target.value)}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Monthly Income *</label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input
                        type="number"
                        required
                        className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                        value={formData.monthly_income}
                        onChange={(e) => updateFormField('monthly_income', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Primary Income Source</label>
                    <select
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                      value={formData.income_source}
                      onChange={(e) => updateFormField('income_source', e.target.value)}
                    >
                      <option value="">Select source</option>
                      <option value="employment">Employment</option>
                      <option value="disability">Disability Benefits</option>
                      <option value="ssi">SSI/SSDI</option>
                      <option value="pension">Pension/Retirement</option>
                      <option value="child_support">Child Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Room Preferences */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-semibold text-[#1F3A5F] mb-6">Room Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Preferred Location *</label>
                    <select
                      required
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                      value={formData.preferred_location}
                      onChange={(e) => updateFormField('preferred_location', e.target.value)}
                    >
                      <option value="">Select a state</option>
                      <option value="MD">Maryland</option>
                      <option value="IN">Indiana</option>
                      <option value="IL">Illinois</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Preferred Room Type *</label>
                    <select
                      required
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                      value={formData.preferred_room_type}
                      onChange={(e) => updateFormField('preferred_room_type', e.target.value)}
                    >
                      <option value="">Select type</option>
                      <option value="single">Single Room</option>
                      <option value="shared">Shared Room</option>
                      <option value="no_preference">No Preference</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Desired Move-in Date *</label>
                    <input
                      type="date"
                      required
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                      value={formData.desired_move_in_date}
                      onChange={(e) => updateFormField('desired_move_in_date', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Intended Length of Stay</label>
                    <select
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                      value={formData.intended_length_of_stay}
                      onChange={(e) => updateFormField('intended_length_of_stay', e.target.value)}
                    >
                      <option value="">Select duration</option>
                      <option value="<6">Less than 6 months</option>
                      <option value="6-12">6-12 months</option>
                      <option value="1-2">1-2 years</option>
                      <option value="2+">2+ years</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Why are you applying for supportive housing?</label>
                    <textarea
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                      rows={3}
                      value={formData.why_apply}
                      onChange={(e) => updateFormField('why_apply', e.target.value)}
                      placeholder="Please describe your current situation and why you need supportive housing"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Health & Emergency Contacts */}
            {step === 5 && (
              <div>
                <h2 className="text-2xl font-semibold text-[#1F3A5F] mb-6">Health & Emergency Contacts</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium text-[#1F3A5F] mb-4">Emergency Contact *</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[#2E2E2E] mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                          value={formData.emergency_contact_name}
                          onChange={(e) => updateFormField('emergency_contact_name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-[#2E2E2E] mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                          value={formData.emergency_contact_phone}
                          onChange={(e) => updateFormField('emergency_contact_phone', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-[#2E2E2E] mb-2">Relationship *</label>
                        <input
                          type="text"
                          required
                          className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                          value={formData.emergency_contact_relationship}
                          onChange={(e) => updateFormField('emergency_contact_relationship', e.target.value)}
                          placeholder="e.g., Family, Friend, Case Worker"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-[#1F3A5F] mb-4">Health Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[#2E2E2E] mb-2">Do you have a disability?</label>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="has_disability"
                              value="yes"
                              checked={formData.has_disability === 'yes'}
                              onChange={(e) => updateFormField('has_disability', e.target.value)}
                              className="mr-2"
                            />
                            Yes
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="has_disability"
                              value="no"
                              checked={formData.has_disability === 'no'}
                              onChange={(e) => updateFormField('has_disability', e.target.value)}
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>
                      </div>
                      
                      {formData.has_disability === 'yes' && (
                        <div>
                          <label className="block text-[#2E2E2E] mb-2">Please describe your disability and any accommodations needed:</label>
                          <textarea
                            className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                            rows={3}
                            value={formData.disability_type}
                            onChange={(e) => updateFormField('disability_type', e.target.value)}
                          />
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-[#2E2E2E] mb-2">Do you require any support services?</label>
                        <textarea
                          className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                          rows={3}
                          value={formData.requires_support_services}
                          onChange={(e) => updateFormField('requires_support_services', e.target.value)}
                          placeholder="e.g., counseling, medication management, transportation assistance"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Review & Consent */}
            {step === 6 && (
              <div>
                <h2 className="text-2xl font-semibold text-[#1F3A5F] mb-6">Review & Consent</h2>
                <div className="space-y-6">
                  {/* Summary of entered information */}
                  <div className="bg-[#FAFAF7] p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-[#1F3A5F] mb-4">Application Summary</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">Personal Information</p>
                        <p className="text-sm text-gray-600">{formData.full_name}</p>
                        <p className="text-sm text-gray-600">{formData.email}</p>
                        <p className="text-sm text-gray-600">{formData.phone}</p>
                      </div>
                      <div>
                        <p className="font-medium">Room Preferences</p>
                        <p className="text-sm text-gray-600">
                          {formData.preferred_location === 'MD' && 'Maryland'}
                          {formData.preferred_location === 'IN' && 'Indiana'}
                          {formData.preferred_location === 'IL' && 'Illinois'}
                          {formData.preferred_location && ' - '}
                          {formData.preferred_room_type === 'single' && 'Single Room'}
                          {formData.preferred_room_type === 'shared' && 'Shared Room'}
                        </p>
                        <p className="text-sm text-gray-600">Move-in: {formData.desired_move_in_date}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Consent Agreements */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="agree_background_check"
                        checked={formData.agree_background_check}
                        onChange={() => handleCheckboxChange('agree_background_check')}
                        className="mt-1 mr-3"
                      />
                      <label htmlFor="agree_background_check" className="text-[#2E2E2E]">
                        I consent to a background check, which may include criminal history, credit check, and rental history verification. *
                      </label>
                    </div>
                    
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="agree_terms"
                        checked={formData.agree_terms}
                        onChange={() => handleCheckboxChange('agree_terms')}
                        className="mt-1 mr-3"
                      />
                      <label htmlFor="agree_terms" className="text-[#2E2E2E]">
                        I agree to the terms and conditions of the application process. I understand that submission of this application does not guarantee housing. *
                      </label>
                    </div>
                    
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="agree_privacy_policy"
                        checked={formData.agree_privacy_policy}
                        onChange={() => handleCheckboxChange('agree_privacy_policy')}
                        className="mt-1 mr-3"
                      />
                      <label htmlFor="agree_privacy_policy" className="text-[#2E2E2E]">
                        I have read and agree to the privacy policy. I understand my information will be kept confidential and used only for housing application purposes.
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      <strong>Note:</strong> This application will be submitted to our supportive housing program. 
                      Our team will review your application and contact you within 24-48 hours. 
                      You may be asked to provide additional documentation or attend an interview.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="text-[#1F3A5F] px-6 py-3 rounded-lg border border-[#1F3A5F] hover:bg-[#1F3A5F] hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  Previous
                </button>
              )}
              
              {step < 6 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep(step)) {
                      setStep(step + 1)
                    } else {
                      alert('Please complete all required fields before proceeding.')
                    }
                  }}
                  className="ml-auto bg-[#1F3A5F] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                  disabled={isLoading}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto bg-[#8FAF9B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </form>
          
          {/* Progress indicator text */}
          <div className="text-center mt-6 text-sm text-gray-500">
            Step {step} of 6
          </div>
        </div>
      </div>
    </div>
  )
}