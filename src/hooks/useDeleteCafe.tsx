import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "redaxios";
import { API_URL, CAFE_KEY } from "../constants";

export function useDeleteCafe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string }) => {
      return axios.delete(`${API_URL}/cafe/${data.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CAFE_KEY] });
    },
  });
}
