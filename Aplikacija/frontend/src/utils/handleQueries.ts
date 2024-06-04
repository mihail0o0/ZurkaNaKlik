import { useGetImageQuery } from "@/store/api/endpoints/images";
import { skipToken } from "@reduxjs/toolkit/query";

export const getRawLocation = (rawLocation: string | undefined): string | undefined => {
  if (!rawLocation) return undefined;
  let exactLocation = "";
  for (let i = 0; i < rawLocation.length; i++) {
    if (rawLocation[i] != "/") {
      exactLocation += rawLocation[i];
    } else {
      exactLocation += "%2F";
    }
  }
  return exactLocation;
};
