import { useMutation } from "@tanstack/react-query";
import axios from "redaxios";
import { API_URL } from "../constants";
import { ICafeForm } from "../components/CafeForm";

export function useEditCafe() {
  return useMutation({
    mutationFn: (data: ICafeForm & { id: string }) => {
      return axios.put(`${API_URL}/cafe/${data.id}`, data);
    },
  });
}
