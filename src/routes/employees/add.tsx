import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Dialog from "../../components/Dialog";
import EmployeeForm, { IEmployeeForm } from "../../components/EmployeeForm";
import {
  DIALOG_NAVIGATE_CONTENT,
  DIALOG_NAVIGATE_TITLE,
} from "../../constants";
import { useCreateEmployee } from "../../hooks/useCreateEmployee";
import { Gender } from "../../types";
import useFormWithBlocker from "../../hooks/useFormWithBlocker";
import { employeesLinkOptions } from "../../utils";

export const Route = createFileRoute("/employees/add")({
  component: AddEmployee,
});

function AddEmployee() {
  const navigate = useNavigate();
  const createEmployee = useCreateEmployee();
  const { form, blocker, isBlocked } = useFormWithBlocker<IEmployeeForm>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      gender: Gender.MALE,
      cafeId: "",
    },
    onSubmit: async ({ value }) => {
      createEmployee.mutate(value);
      navigate({ ...employeesLinkOptions });
    },
  });

  const { reset, proceed } = blocker;

  return (
    <>
      <EmployeeForm form={form} />
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
