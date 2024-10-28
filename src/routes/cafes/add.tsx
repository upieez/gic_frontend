import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useCreateCafe } from "../../hooks/useCreateCafe";
import { useState } from "react";
import Dialog from "../../components/Dialog";
import CafeForm, { ICafeForm } from "../../components/CafeForm";

export const Route = createFileRoute("/cafes/add")({
  component: AddCafe,
});

function AddCafe() {
  const navigate = useNavigate();
  const createCafe = useCreateCafe();
  const [isOpen, setOpen] = useState(false);

  const form = useForm<ICafeForm>({
    defaultValues: {
      name: "",
      description: "",
      location: "",
    },
    onSubmit: async ({ value }) => {
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
      <CafeForm form={form} handleUnsavedChanges={handleUnsavedChanges} />
      <Dialog
        open={isOpen}
        handleAccept={handleAcceptDialog}
        handleCancel={handleCancelDialog}
      />
    </>
  );
}
