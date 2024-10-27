import axios from "redaxios";
import { ICafe } from "./routes/cafes";
import { queryOptions } from "@tanstack/react-query";

export const CAFE_KEY = "cafes";
export const API_URL = import.meta.env.VITE_API_URL;

export const fetchCafes = async () => {
  return axios.get<ICafe[]>(`${API_URL}/cafes`).then((res) => res.data);
};

export const cafesQueryOptions = queryOptions({
  queryKey: [CAFE_KEY],
  queryFn: () => fetchCafes(),
});

export const fetchCafe = async (id: string) => {
  return axios.get<ICafe>(`${API_URL}/cafes/${id}`).then((res) => res.data);
};

export const cafeQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [CAFE_KEY, id],
    queryFn: () => fetchCafe(id),
  });
