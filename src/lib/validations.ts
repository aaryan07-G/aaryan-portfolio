import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(80, "That name looks too long."),
  email: z.string().trim().email("Enter a valid email address."),
  budget: z.enum(["under-25k", "25k-50k", "50k-1l", "above-1l", "not-sure"]).optional(),
  message: z
    .string()
    .trim()
    .min(20, "Give me a bit more detail — at least 20 characters.")
    .max(2000, "Keep it under 2000 characters."),
  
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const budgetOptions: { value: NonNullable<ContactFormValues["budget"]>; label: string }[] = [
  { value: "under-25k", label: "Under ₹25,000" },
  { value: "25k-50k", label: "₹25,000 – ₹50,000" },
  { value: "50k-1l", label: "₹50,000 – ₹1,00,000" },
  { value: "above-1l", label: "Above ₹1,00,000" },
  { value: "not-sure", label: "Not Sure Yet" },
];
