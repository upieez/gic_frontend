import { useSuspenseQuery } from "@tanstack/react-query";
import { cafeQueryOptions } from "../cafes";

export default function useGetCafe(id: string) {
  return useSuspenseQuery(cafeQueryOptions(id));
}
