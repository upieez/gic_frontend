import { Button, FormControl, Stack, TextField } from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { yupValidator } from "@tanstack/yup-form-adapter";
import * as yup from "yup";
import { useCreateCafe } from "../../hooks/useCreateCafe";
import { useState } from "react";
import Dialog from "../../components/Dialog";

export const Route = createFileRoute("/cafes/create")({
  component: CreateCafe,
});

function CreateCafe() {
  const navigate = useNavigate();
  const createCafe = useCreateCafe();
  const [isOpen, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      location: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      createCafe.mutate(value);
      // TODO: handle error maybe optimistically update here
      navigate({ to: "/cafes" });
    },
  });

  function handleUnsavedChanges() {
    if (form.state.isDirty) {
      setOpen(true);
      return;
    }
    navigate({ to: "/cafes" });
  }

  function handleCancelDialog() {
    setOpen(false);
  }

  function handleAcceptDialog() {
    navigate({ to: "/cafes" });
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FormControl>
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
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              type="button"
              onClick={handleUnsavedChanges}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Stack>
        </FormControl>
      </form>
      <Dialog
        open={isOpen}
        handleAccept={handleAcceptDialog}
        handleCancel={handleCancelDialog}
      />
    </>
  );
}
