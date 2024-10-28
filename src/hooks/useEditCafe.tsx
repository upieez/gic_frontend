import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "redaxios";
import { API_URL } from "../constants";
import { ICafeForm } from "../components/CafeForm";

export function useEditCafe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICafeForm & { id: string }) => {
      return axios.put(`${API_URL}/cafes/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
