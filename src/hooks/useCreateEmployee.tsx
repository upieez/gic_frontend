import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "redaxios";
import { API_URL } from "../constants";
import { IEmployeeForm } from "../components/EmployeeForm";

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IEmployeeForm) => {
      return axios.post(`${API_URL}/employees`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
