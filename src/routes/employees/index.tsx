import { createFileRoute } from "@tanstack/react-router";
import { employeesQueryOptions } from "../../employees";
import { useState } from "react";
import { IEmployee } from "../../employees";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

export const Route = createFileRoute("/employees/")({
  component: Employees,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(employeesQueryOptions),
});

function Employees() {
  const employeesQuery = useSuspenseQuery(employeesQueryOptions);
  const [rowData] = useState<IEmployee[]>(employeesQuery.data);
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
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
}
