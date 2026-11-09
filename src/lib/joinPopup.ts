import { z } from "zod";

export const JOIN_POPUP_STORAGE_KEY = "biobrainiacs.joinPopup.v1";
export type JoinPopupStatus = "dismissed" | "joined";
type PopupStorage = Pick<Storage, "getItem" | "setItem">;

export const joinEmailSchema = z.object({
  email: z.string().trim().email("Please enter a valid personal email address.").max(255).transform(value => value.toLowerCase()),
});

let rememberedStatus: JoinPopupStatus | null = null;

export function shouldShowJoinPopup(storage?: PopupStorage) {
  try {
    const status = storage?.getItem(JOIN_POPUP_STORAGE_KEY) ?? rememberedStatus;
    return status !== "dismissed" && status !== "joined";
  } catch {
    return rememberedStatus === null;
  }
}

export function rememberJoinPopup(status: JoinPopupStatus, storage?: PopupStorage) {
  rememberedStatus = status;
  try {
    storage?.setItem(JOIN_POPUP_STORAGE_KEY, status);
  } catch {
    // Keep the choice in memory when browser storage is unavailable.
  }
}