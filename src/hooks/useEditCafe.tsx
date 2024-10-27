import { useMutation } from "@tanstack/react-query";
import axios from "redaxios";

export function useEditCafe() {
  return useMutation({
    mutationFn: (data: {
      id: string;
      name: string;
      description: string;
      location: string;
    }) => {
      return axios.put(`http://localhost:3000/cafe/${data.id}`, data);
    },
  });
}
