import { describe, expect, test } from "bun:test";
import { biomedMeeting, biomedRegistrationSchema } from "./biomedRegistration";

describe("BioMed registration", () => {
  const valid = { firstName: "Student", lastName: "Example", schoolId: "123456" };
  test("requires first name", () => {
    expect(biomedRegistrationSchema.safeParse({ ...valid, firstName: " " }).success).toBe(false);
  });
  test("requires last name", () => {
    expect(biomedRegistrationSchema.safeParse({ ...valid, lastName: "" }).success).toBe(false);
  });
  test("requires School ID", () => {
    expect(biomedRegistrationSchema.safeParse({ ...valid, schoolId: "" }).success).toBe(false);
  });
  test("accepts registration without email", () => {
    expect(biomedRegistrationSchema.safeParse(valid).success).toBe(true);
  });
  test("accepts optional comments", () => {
    expect(biomedRegistrationSchema.safeParse({ ...valid, comments: "I am in a lunch duty class" }).success).toBe(true);
    expect(biomedRegistrationSchema.safeParse({ ...valid, comments: "" }).success).toBe(true);
  });
  test("rejects comments longer than 1000 characters", () => {
    expect(biomedRegistrationSchema.safeParse({ ...valid, comments: "a".repeat(1001) }).success).toBe(false);
  });
  test("rejects unsafe or excessive School ID input", () => {
    expect(biomedRegistrationSchema.safeParse({ ...valid, schoolId: "<script>" }).success).toBe(false);
    expect(biomedRegistrationSchema.safeParse({ ...valid, schoolId: "1".repeat(41) }).success).toBe(false);
  });
  test("meeting is tomorrow at lunch in Room 246", () => {
    expect(biomedMeeting.date).toBe("Monday, November 9, 2026");
    expect(biomedMeeting.time).toBe("At lunch");
    expect(biomedMeeting.room).toBe("Room 246");
    expect(biomedMeeting.hallway).toBe("Engineering/CS hallway");
  });
  test("includes all three activities", () => {
    expect(biomedMeeting.activities).toEqual(["Anatomy Challenge", "DNA Challenge", "DNA Extraction Lab"]);
  });
});