import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "redaxios";
import { API_URL, CAFE_KEY, EMPLOYEE_KEY } from "../constants";
import { IEmployeeForm } from "../components/EmployeeForm";

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IEmployeeForm) => {
      return axios.post(`${API_URL}/employees`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEE_KEY, CAFE_KEY] });
    },
  });
}
