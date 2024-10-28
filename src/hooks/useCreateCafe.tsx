import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "redaxios";
import { API_URL } from "../constants";
import { ICafeForm } from "../components/CafeForm";

export function useCreateCafe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICafeForm) => {
      return axios.post(`${API_URL}/cafes`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
