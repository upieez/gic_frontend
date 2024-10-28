import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "redaxios";
import { API_URL } from "../constants";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string }) => {
      return axios.delete(`${API_URL}/employees/${data.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
