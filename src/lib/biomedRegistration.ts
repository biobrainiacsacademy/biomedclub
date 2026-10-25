import { z } from "zod";

export const biomedRegistrationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  schoolId: z.string().trim().min(1, "School ID is required").max(40)
    .regex(/^[A-Za-z0-9]+$/, "School ID must contain only letters and numbers"),
});

export const biomedMeeting = {
  date: "Monday, October 26, 2026",
  time: "At lunch",
  room: "Room 246",
  hallway: "Engineering/CS hallway",
  activities: ["Anatomy Challenge", "DNA Challenge", "DNA Extraction Lab"],
};