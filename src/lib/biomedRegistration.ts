import { z } from "zod";

export const biomedRegistrationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  schoolId: z.string().trim().min(1, "School ID is required").max(40)
    .regex(/^[A-Za-z0-9]+$/, "School ID must contain only letters and numbers"),
  comments: z.string().trim().max(1000, "Please keep comments under 1000 characters").optional().or(z.literal("")),
});

export const biomedMeeting = {
  date: "Monday, November 9, 2026",
  time: "At lunch",
  room: "Room 246",
  hallway: "Engineering/CS hallway",
  activities: ["Anatomy Challenge", "DNA Challenge", "DNA Extraction Lab"],
};