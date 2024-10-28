import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCreateCafe } from "../../hooks/useCreateCafe";
import Dialog from "../../components/Dialog";
import CafeForm, { ICafeForm } from "../../components/CafeForm";
import { CAFE_ROUTE } from "../../constants";
import useFormWithBlocker from "../../hooks/useFormWithBlocker";

export const Route = createFileRoute("/cafes/add")({
  component: AddCafe,
});

function AddCafe() {
  const navigate = useNavigate();
  const createCafe = useCreateCafe();
  const { form, blocker, isBlocked } = useFormWithBlocker<ICafeForm>({
    defaultValues: {
      name: "",
      description: "",
      location: "",
    },
    onSubmit: async ({ value }) => {
      createCafe.mutate(value);
      // TODO: handle error maybe optimistically update here
      navigate({ to: CAFE_ROUTE });
    },
  });
  const { reset, proceed } = blocker;

  return (
    <>
      <CafeForm form={form} />
      <Dialog
        open={isBlocked}
        handleAccept={() => proceed()}
        handleCancel={() => reset()}
      />
    </>
  );
}
