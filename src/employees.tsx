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

export const fetchEmployees = async () => {
  const res = await axios.get<IEmployee[]>(`${API_URL}/employees`);
  return res.data;
};

export const employeesQueryOptions = queryOptions({
  queryKey: [EMPLOYEE_KEY],
  queryFn: () => fetchEmployees(),
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
