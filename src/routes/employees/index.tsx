import { createFileRoute, createLink } from "@tanstack/react-router";
import { employeesQueryOptions } from "../../employees";
import { useState } from "react";
import { IEmployee } from "../../employees";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";

export const Route = createFileRoute("/employees/")({
  component: Employees,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(employeesQueryOptions),
});

function Employees() {
  const RouterButton = createLink(Button);
  const employeesQuery = useSuspenseQuery(employeesQueryOptions);
  const [colDefs] = useState<ColDef<IEmployee>[]>([
    { field: "id" },
    { field: "name" },
    { field: "email" },
    { field: "phoneNumber" },
    { field: "gender" },
    { field: "cafeName" },
    { headerName: "Days in Cafe", field: "daysInCafe" },
    { headerName: "Edit" },
    { headerName: "Delete" },
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
