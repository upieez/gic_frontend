import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@mui/material";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { cafesQueryOptions } from "../../cafesQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { IEmployee } from "../../employees";
import { createLink } from "@tanstack/react-router";

export const Route = createFileRoute("/cafes/")({
  component: Cafes,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(cafesQueryOptions),
});

const ArrayCellRenderer: React.FC<ICellRendererParams> = (props) => {
  const arrayData = props.value;

  if (!Array.isArray(arrayData)) {
    return <span>{arrayData}</span>;
  }

  return (
    <ul>
      {arrayData.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

const EditButtonRenderer: React.FC<ICellRendererParams> = (props) => {
  const handleEdit = () => {
    // Implement edit logic here
    console.log("Edit", props.data);
  };

  return <button onClick={handleEdit}>Edit</button>;
};

interface DeleteButtonRendererProps extends ICellRendererParams {
  onDelete: (data: ICafe) => void;
}

const DeleteButtonRenderer: React.FC<DeleteButtonRendererProps> = (props) => {
  const handleDelete = () => {
    // Implement delete logic here
    console.log("Delete", props.data);
    props.onDelete(props.data);
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export interface ICafe {
  logo: string;
  name: string;
  description: string;
  employees: IEmployee[];
  location: string;
}

function Cafes() {
  const cafesQuery = useSuspenseQuery(cafesQueryOptions);
  const [rowData, setRowData] = useState<ICafe[]>(cafesQuery.data);
  const RouterButton = createLink(Button);

  const handleDeleteRow = (data: ICafe) => {
    setRowData((prevData) => prevData.filter((row) => row !== data));
  };

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<ColDef<ICafe>[]>([
    { field: "logo" },
    { field: "name" },
    { field: "description" },
    { field: "employees", cellRenderer: ArrayCellRenderer },
    { field: "location", filter: true },
    { headerName: "Edit", cellRenderer: EditButtonRenderer },
    {
      headerName: "Delete",
      cellRenderer: (props: ICellRendererParams) => (
        <DeleteButtonRenderer {...props} onDelete={handleDeleteRow} />
      ),
    },
  ]);

  return (
    <div className="p-2">
      <h3>Welcome to Cafes!</h3>
      <RouterButton to="/cafes/add" variant="contained" sx={{ mb: 2 }}>
        Add Cafe
      </RouterButton>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
}
