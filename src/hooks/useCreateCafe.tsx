import { useMutation } from "@tanstack/react-query";
import axios from "redaxios";

export function useCreateCafe() {
  return useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      location: string;
    }) => {
      return axios.post("http://localhost:3000/cafe", data);
    },
  });
}
