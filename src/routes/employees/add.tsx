import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Dialog from "../../components/Dialog";
import EmployeeForm, { IEmployeeForm } from "../../components/EmployeeForm";
import { EMPLOYEE_ROUTE } from "../../constants";
import { useCreateEmployee } from "../../hooks/useCreateEmployee";
import { Gender } from "../../types";
import useFormWithBlocker from "../../hooks/useFormWithBlocker";

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
      // TODO: handle error maybe optimistically update here
      navigate({ to: EMPLOYEE_ROUTE });
    },
  });

  const { reset, proceed } = blocker;

  return (
    <>
      <EmployeeForm form={form} />
      <Dialog
        open={isBlocked}
        handleAccept={() => proceed()}
        handleCancel={() => reset()}
      />
    </>
  );
}
