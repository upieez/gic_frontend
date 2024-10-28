import { queryOptions } from "@tanstack/react-query";
import axios from "redaxios";
import { API_URL, EMPLOYEE_KEY } from "./constants";
import { Gender } from "./types";

export interface IEmployee {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: `${Gender}`;
  startDate: string;
  cafeId: string;
  cafeName: string;
  daysInCafe: number;
}

export const fetchEmployees = async (cafe?: string) => {
  const url = cafe
    ? `${API_URL}/employees?cafe=${cafe}`
    : `${API_URL}/employees`;
  const res = await axios.get<IEmployee[]>(url);
  return res.data;
};

export const employeesQueryOptions = (cafe?: string) =>
  queryOptions({
    queryKey: [EMPLOYEE_KEY, cafe],
    queryFn: () => fetchEmployees(cafe),
  });

export const fetchEmployee = async (id: string) => {
  const res = await axios.get<IEmployee>(`${API_URL}/employees/${id}`);
  return res.data;
};

export const employeeQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [EMPLOYEE_KEY, id],
    queryFn: () => fetchEmployee(id),
  });
