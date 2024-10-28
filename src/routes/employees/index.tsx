import {
  createFileRoute,
  createLink,
  getRouteApi,
  useNavigate,
} from "@tanstack/react-router";
import { employeesQueryOptions } from "../../employees";
import { useState } from "react";
import { IEmployee } from "../../employees";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button, Typography } from "@mui/material";
import { useGetEmployees } from "../../hooks/useGetEmployees";
import { ICellRendererParams } from "ag-grid";
import {
  DIALOG_DELETE_CONTENT,
  DIALOG_DELETE_TITLE,
  EMPLOYEE_ROUTE,
} from "../../constants";
import { useDeleteEmployee } from "../../hooks/useDeleteEmployee";
import Dialog from "../../components/Dialog";

const EditButtonRenderer: React.FC<ICellRendererParams> = (props) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate({ to: `${EMPLOYEE_ROUTE}/edit/${props.data.id}` });
  };

  return <Button onClick={handleEdit}>Edit</Button>;
};

const DeleteButtonRenderer: React.FC<ICellRendererParams> = (props) => {
  const [isOpen, setOpen] = useState(false);
  const deleteEmployee = useDeleteEmployee();

  const handleDelete = () => {
    deleteEmployee.mutate({ id: props.data.id });
  };

  return (
    <>
      <Button
        color="error"
        onClick={() => {
          setOpen(true);
        }}
      >
        Delete
      </Button>
      <Dialog
        open={isOpen}
        title={`${DIALOG_DELETE_TITLE} ${props.data.name}?`}
        content={DIALOG_DELETE_CONTENT}
        color="error"
        handleAccept={handleDelete}
        handleCancel={() => setOpen(false)}
      />
    </>
  );
};

export const Route = createFileRoute("/employees/")({
  component: Employees,
  loader: ({ context: { queryClient }, location }) => {
    const searchParams = new URLSearchParams(location.search);
    const cafeId = searchParams.get("cafe");
    queryClient.ensureQueryData(employeesQueryOptions(cafeId ?? undefined));
  },
});

const routeApi = getRouteApi("/employees/");

function Employees() {
  const routeSearch: { cafe?: string } = routeApi.useSearch();
  const employeesQuery = useGetEmployees(routeSearch?.cafe);
  const RouterButton = createLink(Button);

  const [colDefs] = useState<ColDef<IEmployee>[]>([
    { field: "id" },
    { field: "name" },
    { field: "email" },
    { field: "phoneNumber" },
    { field: "gender" },
    { field: "cafeName" },
    { headerName: "Days in Cafe", field: "daysInCafe" },
    { cellRenderer: EditButtonRenderer },
    {
      cellRenderer: (props: ICellRendererParams) => (
        <DeleteButtonRenderer {...props} />
      ),
    },
  ]);

  return (
    <div>
      <Typography variant="h2" component="h1">
        List of Employees
      </Typography>
      <RouterButton to="/employees/add" variant="contained" sx={{ mb: 2 }}>
        Add New Employee
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
