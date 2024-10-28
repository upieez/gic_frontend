import { useSuspenseQuery } from "@tanstack/react-query";
import { employeesQueryOptions } from "../employees";

export function useGetEmployees() {
  return useSuspenseQuery(employeesQueryOptions);
}
