import { queryOptions } from "@tanstack/react-query";
import { fetchCafes } from "./cafes";

export const cafesQueryOptions = queryOptions({
  queryKey: ["cafes"],
  queryFn: () => fetchCafes(),
});
