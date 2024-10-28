import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Dialog from "../../components/Dialog";
import { EMPLOYEE_ROUTE } from "../../constants";
import { employeeQueryOptions } from "../../employees";
import useGetEmployee from "../../hooks/useGetEmployee";
import EmployeeForm, { IEmployeeForm } from "../../components/EmployeeForm";
import { useEditEmployee } from "../../hooks/useEditEmployee";
import useFormWithBlocker from "../../hooks/useFormWithBlocker";

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
  const editEmployee = useEditEmployee();
  const { data: employee } = useGetEmployee(employeeId);

  const { form, blocker, isBlocked } = useFormWithBlocker<IEmployeeForm>({
    defaultValues: {
      name: employee.name,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      gender: employee.gender,
      cafeId: employee.cafeId,
    },
    onSubmit: async ({ value }) => {
      editEmployee.mutate({ id: employeeId, ...value });
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
