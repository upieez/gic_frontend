import {
  FormControl,
  TextField,
  Stack,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
} from "@mui/material";
import { FormApi, ReactFormApi } from "@tanstack/react-form";
import { yupValidator } from "@tanstack/yup-form-adapter";
import * as yup from "yup";
import useGetCafes from "../hooks/useGetCafes";
import { Gender } from "../types";
import { useNavigate } from "@tanstack/react-router";
import FormWithStyle from "./FormWrapper";
import { employeesLinkOptions } from "../utils";

export interface IEmployeeForm {
  name: string;
  email: string;
  phoneNumber: string;
  gender: `${Gender}`;
  cafeId: string;
}

interface EmployeeFormProps {
  form: FormApi<IEmployeeForm> & ReactFormApi<IEmployeeForm>;
}

const sgPhoneNumberValidator = yup
  .string()
  .matches(
    /^[89]\d{7}$/,
    "Phone number must start with 8 or 9 and contain exactly 8 digits"
  )
  .required();

export default function EmployeeForm({ form }: EmployeeFormProps) {
  const cafesQuery = useGetCafes();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate({ ...employeesLinkOptions });
  };

  return (
    <FormWithStyle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FormControl fullWidth margin="normal">
          <form.Field
            name="name"
            validatorAdapter={yupValidator()}
            validators={{
              onChange: yup.string().min(6).max(10).required(),
            }}
            children={(field) => {
              return (
                <TextField
                  id="name"
                  label="Name"
                  variant="standard"
                  error={field.state.meta.errors.length > 0}
                  helperText={field.state.meta.errors}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                />
              );
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <form.Field
            name="email"
            validatorAdapter={yupValidator()}
            validators={{
              onChange: yup.string().email().required(),
            }}
            children={(field) => {
              return (
                <TextField
                  id="email"
                  label="Email"
                  variant="standard"
                  type="email"
                  error={field.state.meta.errors.length > 0}
                  helperText={field.state.meta.errors}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                />
              );
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <form.Field
            name="phoneNumber"
            validatorAdapter={yupValidator()}
            validators={{
              onChange: sgPhoneNumberValidator,
            }}
            children={(field) => {
              return (
                <TextField
                  id="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  variant="standard"
                  value={field.state.value}
                  error={field.state.meta.errors.length > 0}
                  helperText={field.state.meta.errors}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                />
              );
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <form.Field
            name="gender"
            validatorAdapter={yupValidator()}
            validators={{
              onChange: yup
                .string()
                .oneOf([Gender.MALE, Gender.FEMALE])
                .required(),
            }}
            children={(field) => {
              return (
                <>
                  <FormLabel id="gender-radio">Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby="gender-radio"
                    id="gender"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value as `${Gender}`)
                    }
                    row
                  >
                    <FormControlLabel
                      value={Gender.MALE}
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value={Gender.FEMALE}
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </>
              );
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <form.Field
            name="cafeId"
            validatorAdapter={yupValidator()}
            validators={{
              onChange: yup.string().required(),
            }}
            children={(field) => {
              return (
                <>
                  <InputLabel id="cafe-label">Cafe</InputLabel>
                  <Select
                    labelId="cafe-label"
                    id="cafe-select"
                    value={field.state.value}
                    label="Cafe"
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    required
                  >
                    {cafesQuery.data?.map((cafe) => {
                      return (
                        <MenuItem value={cafe.id} key={cafe.id}>
                          {cafe.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </>
              );
            }}
          />
        </FormControl>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </FormWithStyle>
  );
}
