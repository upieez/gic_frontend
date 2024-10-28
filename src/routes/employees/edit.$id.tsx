import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import Dialog from "../../components/Dialog";
import { EMPLOYEE_ROUTE } from "../../constants";
import { employeeQueryOptions } from "../../employees";
import useGetEmployee from "../../hooks/useGetEmployee";
import EmployeeForm, { IEmployeeForm } from "../../components/EmployeeForm";

export const Route = createFileRoute("/employees/edit/$id")({
  component: EmployeeEdit,
  loader: async ({ context: { queryClient }, params }) => {
    const { id } = params;
    return queryClient.ensureQueryData(employeeQueryOptions(id));
  },
});

function EmployeeEdit() {
  const navigate = useNavigate();
  const employeeId = Route.useParams().id;
  const { data: employee } = useGetEmployee(employeeId);

  const [isOpen, setOpen] = useState(false);

  const form = useForm<IEmployeeForm>({
    defaultValues: {
      name: employee.name,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      gender: employee.gender,
      cafeId: employee.cafeId,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      // TODO: handle error maybe optimistically update here
      navigate({ to: EMPLOYEE_ROUTE });
    },
  });

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

  function handleAcceptDialog() {
    navigate({ to: EMPLOYEE_ROUTE });
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
