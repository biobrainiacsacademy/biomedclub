import { z } from "zod";

// Shared validation schemas for all forms

export const registrationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100, "First name must be less than 100 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(100, "Last name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  grade: z.enum(["9", "10", "11", "12"], { errorMap: () => ({ message: "Please select a valid grade" }) }),
  school: z.string().trim().min(1, "School name is required").max(200, "School name must be less than 200 characters"),
  howHeard: z.string().max(100).optional().or(z.literal("")),
  questions: z.string().max(2000, "Questions must be less than 2000 characters").optional().or(z.literal("")),
});

export const authorApplicationSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  name: z.string().trim().min(1, "Name is required").max(200, "Name must be less than 200 characters"),
  grade: z.enum(["9", "10", "11", "12"], { errorMap: () => ({ message: "Please select a valid grade" }) }),
  highSchool: z.string().trim().min(1, "High school name is required").max(200, "High school name must be less than 200 characters"),
  introduction: z.string().trim().min(1, "Introduction is required").max(5000, "Introduction must be less than 5000 characters"),
  howHeard: z.enum(["Instagram", "Website", "Friend", "Other"], { errorMap: () => ({ message: "Please select how you heard about us" }) }),
  comments: z.string().max(2000, "Comments must be less than 2000 characters").optional().or(z.literal("")),
});

export const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  name: z.string().max(100, "Name must be less than 100 characters").optional().or(z.literal("")),
  favoriteLesson: z.string().trim().min(1, "Please tell us your favorite lesson").max(300, "Lesson name must be less than 300 characters"),
  wouldRecommend: z.enum(["Yes", "Maybe", "No"], { errorMap: () => ({ message: "Please select a recommendation option" }) }),
  feedback: z.string().trim().min(1, "Please provide feedback").max(3000, "Feedback must be less than 3000 characters"),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
});

export const membershipSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100, "First name must be less than 100 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(100, "Last name must be less than 100 characters"),
  grade: z.enum(["9", "10", "11", "12"], { errorMap: () => ({ message: "Please select a valid grade" }) }),
  schoolEmail: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
});

// Honeypot field check - returns true if it's a bot
export const isBot = (honeypotValue: string | undefined): boolean => {
  return !!honeypotValue && honeypotValue.length > 0;
};

// Helper to format Zod errors for display
export const formatZodErrors = (error: z.ZodError): string => {
  return error.errors.map((e) => e.message).join(", ");
};
