import { useSuspenseQuery } from "@tanstack/react-query";
import { employeesQueryOptions } from "../employees";

export function useGetEmployees(cafe?: string) {
  return useSuspenseQuery(employeesQueryOptions(cafe));
}
