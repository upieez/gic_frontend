import axios from "redaxios";
import { ICafe } from "./routes/cafes";

export const fetchCafes = async () => {
  return axios
    .get<ICafe[]>("http://localhost:3000/cafes")
    .then((res) => res.data);
};
