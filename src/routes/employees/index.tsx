import {
  createFileRoute,
  createLink,
  useNavigate,
} from "@tanstack/react-router";
import { employeesQueryOptions } from "../../employees";
import { useState } from "react";
import { IEmployee } from "../../employees";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import { useGetEmployees } from "../../hooks/useGetEmployees";
import { ICellRendererParams } from "ag-grid";
import { EMPLOYEE_ROUTE } from "../../constants";
import { useDeleteEmployee } from "../../hooks/useDeleteEmployee";

const EditButtonRenderer: React.FC<ICellRendererParams> = (props) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate({ to: `${EMPLOYEE_ROUTE}/edit/${props.data.id}` });
  };

  return <Button onClick={handleEdit}>Edit</Button>;
};

const DeleteButtonRenderer: React.FC<ICellRendererParams> = (props) => {
  const deleteEmployee = useDeleteEmployee();
  const handleDelete = () => {
    deleteEmployee.mutate({ id: props.data.id });
  };

  return (
    <Button color="error" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export const Route = createFileRoute("/employees/")({
  component: Employees,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(employeesQueryOptions),
});

function Employees() {
  const employeesQuery = useGetEmployees();
  const RouterButton = createLink(Button);

  const [colDefs] = useState<ColDef<IEmployee>[]>([
    { field: "id" },
    { field: "name" },
    { field: "email" },
    { field: "phoneNumber" },
    { field: "gender" },
    { field: "cafeName" },
    { headerName: "Days in Cafe", field: "daysInCafe" },
    { headerName: "Edit", cellRenderer: EditButtonRenderer },
    {
      headerName: "Delete",
      cellRenderer: (props: ICellRendererParams) => (
        <DeleteButtonRenderer {...props} />
      ),
    },
  ]);

  return (
    <div className="p-2">
      <h3>Welcome to Employees!</h3>
      <RouterButton to="/employees/add" variant="contained" sx={{ mb: 2 }}>
        Add Employee
      </RouterButton>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={employeesQuery.data} columnDefs={colDefs} />
      </div>
    </div>
  );
}
