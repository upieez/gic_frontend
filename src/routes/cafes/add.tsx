import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCreateCafe } from "../../hooks/useCreateCafe";
import Dialog from "../../components/Dialog";
import CafeForm, { ICafeForm } from "../../components/CafeForm";
import {
  DIALOG_NAVIGATE_CONTENT,
  DIALOG_NAVIGATE_TITLE,
} from "../../constants";
import useFormWithBlocker from "../../hooks/useFormWithBlocker";
import { cafesLinkOptions } from "../../utils";

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
      navigate({ ...cafesLinkOptions });
    },
  });
  const { reset, proceed } = blocker;

  return (
    <>
      <CafeForm form={form} />
      <Dialog
        title={DIALOG_NAVIGATE_TITLE}
        content={DIALOG_NAVIGATE_CONTENT}
        open={isBlocked}
        handleAccept={() => proceed()}
        handleCancel={() => reset()}
      />
    </>
  );
}
