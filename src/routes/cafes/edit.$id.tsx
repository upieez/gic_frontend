import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Dialog from "../../components/Dialog";
import CafeForm, { ICafeForm } from "../../components/CafeForm";
import { useEditCafe } from "../../hooks/useEditCafe";
import { cafeQueryOptions } from "../../cafes";
import {
  DIALOG_NAVIGATE_CONTENT,
  DIALOG_NAVIGATE_TITLE,
} from "../../constants";
import useGetCafe from "../../hooks/useGetCafe";
import useFormWithBlocker from "../../hooks/useFormWithBlocker";
import { cafesLinkOptions } from "../../utils";

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

  const { form, blocker, isBlocked } = useFormWithBlocker<ICafeForm>({
    defaultValues: {
      name: cafe?.name ?? "",
      description: cafe?.description ?? "",
      location: cafe?.location ?? "",
    },
    onSubmit: async ({ value }) => {
      editCafe.mutate({ ...value, id: cafe?.id ?? "" });
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
