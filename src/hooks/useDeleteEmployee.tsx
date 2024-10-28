import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "redaxios";
import { API_URL, EMPLOYEE_KEY } from "../constants";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string }) => {
      return axios.delete(`${API_URL}/employee/${data.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEE_KEY] });
    },
  });
}