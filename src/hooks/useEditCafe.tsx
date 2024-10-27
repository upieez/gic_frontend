import { useMutation } from "@tanstack/react-query";
import axios from "redaxios";
import { API_URL } from "../constants";

export function useEditCafe() {
  return useMutation({
    mutationFn: (data: {
      id: string;
      name: string;
      description: string;
      location: string;
    }) => {
      return axios.put(`${API_URL}/cafe/${data.id}`, data);
    },
  });
}
