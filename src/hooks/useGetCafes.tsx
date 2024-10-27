import { useSuspenseQuery } from "@tanstack/react-query";
import { cafesQueryOptions } from "../cafes";

export default function useGetCafes() {
  return useSuspenseQuery(cafesQueryOptions);
}
