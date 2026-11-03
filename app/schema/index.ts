import * as z from 'zod';

// Enquiry form rules (app/components/ContactForm.tsx).
// Tests: __tests__/contact-schema.test.ts
export const ContactSchema = z.object({
  email: z.string().trim().email({
    message: "Please enter a valid email address"
  }).refine(email => {
    const blockedDomains = ["example.com", "spam.com"];
    const emailDomain = email.split('@')[1]?.toLowerCase();
    return !blockedDomains.includes(emailDomain);
  }, {
    message: "Email domain is not allowed"
  }),

  // Letters in any language, plus spaces, hyphens, apostrophes and dots
  // (O'Brien, Zoë, St. John, Anne-Marie).
  name: z.string().trim().min(1, {
    message: "Please enter your name"
  // "*" not "+": an empty name is already caught above, so it shows one error.
  // Built with new RegExp because the "u" flag (for \p{L}) can't be written as
  // a literal with this project's TypeScript target.
  }).regex(new RegExp("^[\\p{L}\\s'’.-]*$", "u"), {
    message: "Name can only contain letters, spaces, hyphens and apostrophes"
  }),

  // Numbers as people type them: "07700 900123", "+44 1494 513 166",
  // "(01494) 513166". At least 10 digits, ignoring spaces and symbols.
  contactNumber: z.string().trim().regex(/^[+\d\s()-]+$/, {
    message: "Contact number can only contain digits, spaces, +, ( ) and -"
  }).refine(value => value.replace(/\D/g, "").length >= 10, {
    message: "Please enter a valid contact number with at least 10 digits"
  }),

  // The specific page or course within the requirement. Optional.
  service: z.string().optional(),

  requirement: z.string().min(1, {
    message: "Please select your requirement"
  }),

  body: z.string().trim().min(1, {
    message: "Please enter your message"
  })
});
