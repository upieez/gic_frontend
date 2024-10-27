import { queryOptions } from "@tanstack/react-query";
import axios from "redaxios";
import { EMPLOYEE_KEY } from "./constants";

export interface IEmployee {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: "male" | "female";
  startDate: string;
  cafeId: string;
  cafeName: string;
  daysInCafe: number;
}

const API_URL = import.meta.env.VITE_API_URL;

export const fetchEmployees = async () => {
  const res = await axios.get<IEmployee[]>(`${API_URL}/employees`);
  return res.data;
};

export const employeesQueryOptions = queryOptions({
  queryKey: [EMPLOYEE_KEY],
  queryFn: () => fetchEmployees(),
});
