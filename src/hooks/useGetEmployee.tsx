import { useSuspenseQuery } from "@tanstack/react-query";
import { employeeQueryOptions } from "../employees";

export default function useGetEmployee(id: string) {
  return useSuspenseQuery(employeeQueryOptions(id));
}
