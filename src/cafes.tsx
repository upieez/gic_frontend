import axios from "redaxios";
import { ICafe } from "./routes/cafes";
import { queryOptions } from "@tanstack/react-query";
import { API_URL, CAFE_KEY } from "./constants";

export const fetchCafes = async () => {
  const res = await axios.get<ICafe[]>(`${API_URL}/cafes`);
  return res.data;
};

export const cafesQueryOptions = queryOptions({
  queryKey: [CAFE_KEY],
  queryFn: () => fetchCafes(),
});

export const fetchCafe = async (id: string) => {
  const res = await axios.get<ICafe>(`${API_URL}/cafes/${id}`);
  return res.data;
};

export const cafeQueryOptions = (id: string) =>
  queryOptions({
    queryKey: [CAFE_KEY, id],
    queryFn: () => fetchCafe(id),
  });
