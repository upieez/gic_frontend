import { queryOptions } from "@tanstack/react-query";
import { fetchEmployees } from "./employees";

export const employeesQueryOptions = queryOptions({
  queryKey: ["employees"],
  queryFn: () => fetchEmployees(),
});
