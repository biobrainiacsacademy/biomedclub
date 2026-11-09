import { describe, expect, test } from "bun:test";
import { JOIN_POPUP_STORAGE_KEY, joinEmailSchema, rememberJoinPopup, shouldShowJoinPopup } from "./joinPopup";

const storage = () => {
  const values = new Map([[JOIN_POPUP_STORAGE_KEY, "new"]]);
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
};

describe("Joining popup", () => {
  test("opens for a new visitor", () => {
    expect(shouldShowJoinPopup(storage())).toBe(true);
  });
  test("stays closed after dismissal and refresh", () => {
    const browser = storage();
    rememberJoinPopup("dismissed", browser);
    expect(browser.getItem(JOIN_POPUP_STORAGE_KEY)).toBe("dismissed");
    expect(shouldShowJoinPopup(browser)).toBe(false);
  });
  test("stays closed after successful joining and refresh", () => {
    const browser = storage();
    rememberJoinPopup("joined", browser);
    expect(browser.getItem(JOIN_POPUP_STORAGE_KEY)).toBe("joined");
    expect(shouldShowJoinPopup(browser)).toBe(false);
  });
  test("requires a valid personal email", () => {
    expect(joinEmailSchema.safeParse({ email: "" }).success).toBe(false);
    expect(joinEmailSchema.safeParse({ email: "invalid" }).success).toBe(false);
    expect(joinEmailSchema.parse({ email: " Student@Example.com " }).email).toBe("student@example.com");
  });
});