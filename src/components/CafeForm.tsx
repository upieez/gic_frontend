import {
  FormControl,
  TextField,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { FormApi, ReactFormApi } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { yupValidator } from "@tanstack/yup-form-adapter";
import * as yup from "yup";
import FormWithStyle from "./FormWrapper";
import { cafesLinkOptions } from "../utils";

export interface ICafeForm {
  name: string;
  description: string;
  location: string;
}

interface CafeFormProps {
  form: FormApi<ICafeForm> & ReactFormApi<ICafeForm>;
}

export default function CafeForm({ form }: CafeFormProps) {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate({ ...cafesLinkOptions });
  };

  return (
    <FormWithStyle>
      <Typography variant="h2" component="h1">
        Cafe Form
      </Typography>
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
            name="description"
            validatorAdapter={yupValidator()}
            validators={{
              onChange: yup.string().max(256).required(),
            }}
            children={(field) => {
              return (
                <TextField
                  id="description"
                  label="Description"
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
            name="location"
            validatorAdapter={yupValidator()}
            validators={{
              onChange: yup.string().required(),
            }}
            children={(field) => {
              return (
                <TextField
                  id="location"
                  label="Location"
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
