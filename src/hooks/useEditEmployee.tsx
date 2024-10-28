import { useMutation } from "@tanstack/react-query";
import axios from "redaxios";
import { API_URL } from "../constants";
import { IEmployeeForm } from "../components/EmployeeForm";

export function useEditEmployee() {
  return useMutation({
    mutationFn: (data: IEmployeeForm & { id: string }) => {
      return axios.put(`${API_URL}/employee/${data.id}`, data);
    },
  });
}
