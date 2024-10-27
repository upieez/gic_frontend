import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import Dialog from "../../components/Dialog";
import CafeForm, { ICafeForm } from "../../components/CafeForm";
import { useEditCafe } from "../../hooks/useEditCafe";
import { cafeQueryOptions } from "../../cafes";
import { CAFE_ROUTE } from "../../constants";
import useGetCafe from "../../hooks/useGetCafe";

export const Route = createFileRoute("/cafes/edit/$id")({
  component: EditCafe,
  loader: async ({ context: { queryClient }, params }) => {
    const { id } = params;
    return queryClient.ensureQueryData(cafeQueryOptions(id));
  },
});

function EditCafe() {
  const navigate = useNavigate();
  const cafeId = Route.useParams().id;
  const { data: cafe } = useGetCafe(cafeId);
  const editCafe = useEditCafe();

  const [isOpen, setOpen] = useState(false);

  const form = useForm<ICafeForm>({
    defaultValues: {
      name: cafe?.name ?? "",
      description: cafe?.description ?? "",
      location: cafe?.location ?? "",
    },
    onSubmit: async ({ value }) => {
      editCafe.mutate({ ...value, id: cafe?.id ?? "" });
      // TODO: handle error maybe optimistically update here
      navigate({ to: CAFE_ROUTE });
    },
  });

  function handleUnsavedChanges() {
    if (form.state.isDirty) {
      setOpen(true);
      return;
    }
    navigate({ to: CAFE_ROUTE });
  }

  function handleCancelDialog() {
    setOpen(false);
  }

  function handleAcceptDialog() {
    navigate({ to: CAFE_ROUTE });
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
