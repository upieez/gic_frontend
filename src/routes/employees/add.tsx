import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import Dialog from "../../components/Dialog";
import EmployeeForm, { IEmployeeForm } from "../../components/EmployeeForm";
import { EMPLOYEE_ROUTE } from "../../constants";
import { useCreateEmployee } from "../../hooks/useCreateEmployee";

export const Route = createFileRoute("/employees/add")({
  component: AddEmployee,
});

function AddEmployee() {
  const navigate = useNavigate();
  const createEmployee = useCreateEmployee();
  const [isOpen, setOpen] = useState(false);

  const form = useForm<IEmployeeForm>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      gender: "male",
      cafeId: "",
    },
    onSubmit: async ({ value }) => {
      createEmployee.mutate(value);
      // TODO: handle error maybe optimistically update here
      navigate({ to: EMPLOYEE_ROUTE });
    },
  });

  function handleAcceptDialog() {
    navigate({ to: EMPLOYEE_ROUTE });
  }

  function handleUnsavedChanges() {
    if (form.state.isDirty) {
      setOpen(true);
      return;
    }

    navigate({ to: EMPLOYEE_ROUTE });
  }

  function handleCancelDialog() {
    setOpen(false);
  }

  return (
    <>
      <EmployeeForm form={form} handleUnsavedChanges={handleUnsavedChanges} />
      <Dialog
        open={isOpen}
        handleAccept={handleAcceptDialog}
        handleCancel={handleCancelDialog}
      />
    </>
  );
}
