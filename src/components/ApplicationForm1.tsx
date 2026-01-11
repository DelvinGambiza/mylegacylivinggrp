'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { preApprovalCheck } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  // Personal Information
  isForSomeoneElse: z.boolean().default(false),
  referrerName: z.string().optional(),
  referrerPhone: z.string().optional(),
  referrerEmail: z.string().email().optional(),
  relationship: z.enum(['Case Manager', 'Social Worker', 'Family Member', 'Friend', 'Self-referral', 'Other']),
  
  // Resident Information
  fullName: z.string().min(2, "Full name is required"),
  gender: z.string(),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  emailAddress: z.string().email("Valid email is required"),
  cityState: z.string().min(2, "City and state are required"),
  dateOfBirth: z.string(),
  
  // Income & Insurance
  incomeSources: z.array(z.string()),
  averageMonthlyIncome: z.string(),
  healthInsurance: z.string(),
  languages: z.string(),
  
  // Current Situation
  currentLivingSituation: z.string(),
  otherLivingSituation: z.string().optional(),
  
  // Support Needs
  supportNeeds: z.array(z.string()),
  otherSupportNeeds: z.string().optional(),
  
  // History (not disqualifiers)
  historyViolentBehavior: z.boolean().default(false),
  historySubstanceAbuse: z.boolean().default(false),
  registeredSexOffender: z.boolean().default(false),
  historyMentalIllness: z.boolean().default(false),
  historyJusticeSystem: z.boolean().default(false),
  chronicMedicalConditions: z.boolean().default(false),
  veteran: z.boolean().default(false),
  disabled: z.boolean().default(false),
  requireMobilityAssistance: z.boolean().default(false),
  allergies: z.boolean().default(false),
  
  // Assistance Needs
  assistanceBathing: z.boolean().default(false),
  assistanceFoodPrep: z.boolean().default(false),
  assistanceFeeding: z.boolean().default(false),
  assistanceMedication: z.boolean().default(false),
  assistanceLaundry: z.boolean().default(false),
  assistanceCleaning: z.boolean().default(false),
  assistanceMoving: z.boolean().default(false),
  
  // Preferences
  seekingHousingReason: z.string().min(10, "Please provide a brief reason"),
  roomPreference: z.enum(['Single room', 'Shared room']),
  
  // Goals
  hobbies: z.string(),
  goals: z.string(),
  desiredMoveInDate: z.string(),
})

type FormData = z.infer<typeof formSchema>

const INCOME_SOURCES = [
  'SSI', 'SSDI', 'VA', 'Employment', 'Unemployment', 'Pension',
  'City/County/State program', 'Housing voucher', 'Family/friend support',
  'Legal guardian/payee', 'Other'
]

const SUPPORT_NEEDS = [
  'Transportation Assistance',
  'Medication Reminders',
  'Life-Skills Coaching',
  'Benefits/Paperwork Support',
  'Other',
  'None'
]

export default function ApplicationForm({ user, roomId }: { user: any; roomId: string | null }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [preApprovalResult, setPreApprovalResult] = useState<any>(null)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isForSomeoneElse: false,
      relationship: 'Self-referral',
      roomPreference: 'Single room',
    },
  })

  const isForSomeoneElse = watch('isForSomeoneElse')

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    
    try {
      // Check pre-approval
      const preApproval = preApprovalCheck(data)
      setPreApprovalResult(preApproval)
      
      // Get or create user
      let applicantId = user?.id
      
      if (!applicantId) {
        // Create anonymous application
        const { data: anonUser } = await supabase.auth.signInAnonymously()
        if (anonUser.user) {
          applicantId = anonUser.user.id
        }
      }
      
      // Save application to database
      const { error } = await supabase
        .from('applications')
        .insert({
          applicant_id: applicantId,
          room_id: roomId,
          status: preApproval.status,
          form_data: data,
          pre_approval_reason: preApproval.reason,
        })
      
      if (error) throw error
      
      // Show pre-approval result
      alert(preApproval.isPreApproved 
        ? '✅ Your application has been pre-approved! Our team will contact you within 24-48 hours.'
        : '📋 Your application requires manual review. Our team will contact you within 24-48 hours.'
      )
      
      router.push('/thank-you')
      
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Error submitting application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step indicators */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= stepNum ? 'bg-[#8FAF9B] text-white' : 'bg-[#E5E7EB] text-[#2E2E2E]'
              }`}>
                {stepNum}
              </div>
              <span className="mt-2 text-sm text-[#2E2E2E]">Step {stepNum}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#1F3A5F] mb-6">Personal Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[#2E2E2E] mb-2">
                  Are you filling this form out for someone else?
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input type="radio" {...register('isForSomeoneElse')} value="false" className="mr-2" />
                    No
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" {...register('isForSomeoneElse')} value="true" className="mr-2" />
                    Yes
                  </label>
                </div>
              </div>

              {isForSomeoneElse && (
                <>
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Your Name</label>
                    <input
                      type="text"
                      {...register('referrerName')}
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Your Phone Number</label>
                    <input
                      type="tel"
                      {...register('referrerPhone')}
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[#2E2E2E] mb-2">Your Email</label>
                    <input
                      type="email"
                      {...register('referrerEmail')}
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-[#2E2E2E] mb-2">Relationship to Prospective Resident</label>
                <select
                  {...register('relationship')}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                >
                  <option value="Case Manager">Case Manager</option>
                  <option value="Social Worker">Social Worker</option>
                  <option value="Family Member">Family Member</option>
                  <option value="Friend">Friend</option>
                  <option value="Self-referral">Self-referral</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <div></div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-[#1F3A5F] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#1F3A5F] mb-6">Resident Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#2E2E2E] mb-2">Full Name *</label>
                <input
                  type="text"
                  {...register('fullName')}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
              </div>
              
              <div>
                <label className="block text-[#2E2E2E] mb-2">Gender</label>
                <input
                  type="text"
                  {...register('gender')}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-[#2E2E2E] mb-2">Phone Number *</label>
                <input
                  type="tel"
                  {...register('phoneNumber')}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
              </div>
              
              <div>
                <label className="block text-[#2E2E2E] mb-2">Email Address *</label>
                <input
                  type="email"
                  {...register('emailAddress')}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                />
                {errors.emailAddress && <p className="text-red-500 text-sm mt-1">{errors.emailAddress.message}</p>}
              </div>
              
              <div>
                <label className="block text-[#2E2E2E] mb-2">City & State *</label>
                <input
                  type="text"
                  {...register('cityState')}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                />
                {errors.cityState && <p className="text-red-500 text-sm mt-1">{errors.cityState.message}</p>}
              </div>
              
              <div>
                <label className="block text-[#2E2E2E] mb-2">Date of Birth</label>
                <input
                  type="date"
                  {...register('dateOfBirth')}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[#1F3A5F] px-6 py-3 rounded-lg border border-[#1F3A5F] hover:bg-[#1F3A5F] hover:bg-opacity-5 transition"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-[#1F3A5F] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#1F3A5F] mb-6">Financial & Support Information</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[#2E2E2E] mb-3">Income Sources (check all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {INCOME_SOURCES.map((source) => (
                    <label key={source} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={source}
                        {...register('incomeSources')}
                        className="mr-2"
                      />
                      {source}
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-[#2E2E2E] mb-2">Average Monthly Income</label>
                <input
                  type="text"
                  {...register('averageMonthlyIncome')}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-[#2E2E2E] mb-2">What is your source of health insurance?</label>
                <input
                  type="text"
                  {...register('healthInsurance')}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-[#2E2E2E] mb-2">Do you speak another language other than English?</label>
                <input
                  type="text"
                  {...register('languages')}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-[#2E2E2E] mb-3">Support Needs (check all that apply)</label>
                <div className="grid grid-cols-2 gap-3">
                  {SUPPORT_NEEDS.map((need) => (
                    <label key={need} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={need}
                        {...register('supportNeeds')}
                        className="mr-2"
                      />
                      {need}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-[#1F3A5F] px-6 py-3 rounded-lg border border-[#1F3A5F] hover:bg-[#1F3A5F] hover:bg-opacity-5 transition"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="bg-[#1F3A5F] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#1F3A5F] mb-6">Preferences & Final Details</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[#2E2E2E] mb-2">
                  Tell us briefly why you're seeking housing *
                </label>
                <textarea
                  {...register('seekingHousingReason')}
                  rows={3}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                />
                {errors.seekingHousingReason && (
                  <p className="text-red-500 text-sm mt-1">{errors.seekingHousingReason.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-[#2E2E2E] mb-3">I prefer:</label>
                <div className="flex space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="Single room"
                      {...register('roomPreference')}
                      className="mr-2"
                    />
                    Single room
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="Shared room"
                      {...register('roomPreference')}
                      className="mr-2"
                    />
                    Shared room
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-[#2E2E2E] mb-2">What activities or hobbies do you enjoy?</label>
                <textarea
                  {...register('hobbies')}
                  rows={2}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-[#2E2E2E] mb-2">What are some goals you have for yourself?</label>
                <textarea
                  {...register('goals')}
                  rows={2}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-[#2E2E2E] mb-2">Desired Move-In Date</label>
                <input
                  type="date"
                  {...register('desiredMoveInDate')}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-[#1F3A5F] px-6 py-3 rounded-lg border border-[#1F3A5F] hover:bg-[#1F3A5F] hover:bg-opacity-5 transition"
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#8FAF9B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}