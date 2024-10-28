import { useMutation } from "@tanstack/react-query";
import axios from "redaxios";
import { API_URL } from "../constants";
import { ICafeForm } from "../components/CafeForm";

export function useCreateCafe() {
  return useMutation({
    mutationFn: (data: ICafeForm) => {
      return axios.post(`${API_URL}/cafes`, data);
    },
  });
}
