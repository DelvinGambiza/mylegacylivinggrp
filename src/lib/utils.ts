import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const preApprovalCheck = (formData: any) => {
  const issues: string[] = []
  
  // Basic pre-approval rules
  if (formData.income && formData.income < 800) {
    issues.push("Income below minimum threshold")
  }
  
  if (formData.violentHistory) {
    issues.push("History of violent behavior requires manual review")
  }
  
  if (formData.registeredSexOffender) {
    issues.push("Registered sex offender status requires manual review")
  }
  
  const isPreApproved = issues.length === 0
  
  return {
    isPreApproved,
    status: isPreApproved ? 'pre_approved' : 'pending',
    issues,
    reason: isPreApproved ? 'Meets all basic criteria' : issues.join('; ')
  }
}