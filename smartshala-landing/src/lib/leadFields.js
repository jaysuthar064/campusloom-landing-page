/**
 * Field layouts for LeadForm.
 *
 * Kept out of the component file so that only exports components — otherwise
 * React Fast Refresh cannot hot-reload it.
 */

export const DEMO_FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'school', label: 'School name', type: 'text', required: true, autoComplete: 'organization' },
  { name: 'role', label: 'Your role', type: 'text', placeholder: 'Principal, Administrator…' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', required: true, autoComplete: 'tel' },
  { name: 'city', label: 'City', type: 'text', autoComplete: 'address-level2' },
  { name: 'students', label: 'Number of students', type: 'text', placeholder: 'e.g. 850' },
]

export const CONTACT_FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'school', label: 'School / organisation', type: 'text', required: true, autoComplete: 'organization' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', required: true, autoComplete: 'tel' },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'What is this about?' },
]
