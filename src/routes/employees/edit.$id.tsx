import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Dialog from "../../components/Dialog";
import {
  DIALOG_NAVIGATE_CONTENT,
  DIALOG_NAVIGATE_TITLE,
} from "../../constants";
import { employeeQueryOptions } from "../../employees";
import useGetEmployee from "../../hooks/useGetEmployee";
import EmployeeForm, { IEmployeeForm } from "../../components/EmployeeForm";
import { useEditEmployee } from "../../hooks/useEditEmployee";
import useFormWithBlocker from "../../hooks/useFormWithBlocker";
import { employeesLinkOptions } from "../../utils";

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
