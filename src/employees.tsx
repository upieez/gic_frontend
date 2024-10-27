import axios from "redaxios";

export interface IEmployee {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: "male" | "female";
  startDate: string;
  cafeId: string;
  cafeName: string;
  daysInCafe: number;
}

export const fetchEmployees = async () => {
  return axios
    .get<IEmployee[]>("http://localhost:3000/employees")
    .then((res) => res.data);
};
