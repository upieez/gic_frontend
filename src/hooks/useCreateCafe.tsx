import { useMutation } from "@tanstack/react-query";
import axios from "redaxios";
import { API_URL } from "../constants";

export function useCreateCafe() {
  return useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      location: string;
    }) => {
      return axios.post(`${API_URL}/cafe`, data);
    },
  });
}
