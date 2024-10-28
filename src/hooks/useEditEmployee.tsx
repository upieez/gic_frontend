import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "redaxios";
import { API_URL } from "../constants";
import { IEmployeeForm } from "../components/EmployeeForm";

export function useEditEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IEmployeeForm & { id: string }) => {
      return axios.put(`${API_URL}/employees/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
