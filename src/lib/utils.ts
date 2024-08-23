import { SearchValidation } from "@/components/pages/home/validation";
import { type ClassValue, clsx } from "clsx";
import qs from "qs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterNonNull = (obj: any) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));
};

export const pushParams = (searchParams: SearchValidation) => {
  window.history.replaceState(
    null,
    "",
    "?" +
      qs.stringify(filterNonNull(searchParams), {
        arrayFormat: "repeat",
      }),
  );
};
