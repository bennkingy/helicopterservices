import * as z from 'zod';

// Helper function to validate passwords with regex for complexity
const passwordComplexity = z.string().min(8, {
  message: "Password must be at least 8 characters long"
}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/, {
  message: "Password must include upper, lower, number, and special character"
});

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

  password: passwordComplexity,

  confirmPassword: z.string({
    required_error: "Confirm Password is required",
    invalid_type_error: "Confirm Password must be a string",
    // @ts-ignore
  }).refine(data => data === passwordComplexity, {
    message: "Passwords must match"
  })
});