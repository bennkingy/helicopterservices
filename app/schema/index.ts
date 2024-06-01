import * as z from 'zod';

export const ContactSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address"
  }).refine(email => {
    const blockedDomains = ["example.com", "spam.com"];
    const emailDomain = email.split('@')[1];
    return !blockedDomains.includes(emailDomain);
  }, {
    message: "Email domain is not allowed"
  }),

  name: z.string().min(1, {
    message: "Please enter your name"
  }).regex(/^[a-zA-Z\s-]+$/, {
    message: "Name must only contain alphabets, spaces, or dashes"
  }),

  contactNumber: z.string().min(10, {
    message: "Please enter a valid contact number with at least 10 digits"
  }).regex(/^\d+$/, {
    message: "Contact number must contain only digits"
  }),

  requirement: z.string().min(1, {
    message: "Please select your requirement"
  }),
  
  body: z.string().min(1, {
    message: "Please enter your message"
  })
});