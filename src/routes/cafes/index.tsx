import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@mui/material";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { cafesQueryOptions } from "../../cafes";
import { IEmployee } from "../../employees";
import { createLink } from "@tanstack/react-router";
import useGetCafes from "../../hooks/useGetCafes";
import { useDeleteCafe } from "../../hooks/useDeleteCafe";

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
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate({ to: `/cafes/edit/${props.data.id}` });
  };

  return <Button onClick={handleEdit}>Edit</Button>;
};

interface DeleteButtonRendererProps extends ICellRendererParams {
  onDelete: (data: ICafe) => void;
}

const DeleteButtonRenderer: React.FC<DeleteButtonRendererProps> = (props) => {
  const deleteCafe = useDeleteCafe();
  const handleDelete = () => {
    // Implement delete logic here
    console.log("Delete", props.data);
    deleteCafe.mutate({ id: props.data.id });
  };

  return (
    <Button color="error" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export interface ICafe {
  id: string;
  logo: string;
  name: string;
  description: string;
  employees: IEmployee[];
  location: string;
}

function Cafes() {
  const cafesQuery = useGetCafes();
  const RouterButton = createLink(Button);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<ColDef<ICafe>[]>([
    { field: "logo" },
    { field: "name" },
    { field: "description" },
    { field: "employees", cellRenderer: ArrayCellRenderer },
    { field: "location", filter: true },
    { cellRenderer: EditButtonRenderer },
    {
      cellRenderer: (props: ICellRendererParams) => (
        <DeleteButtonRenderer {...props} onDelete={() => {}} />
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
        <AgGridReact rowData={cafesQuery.data} columnDefs={colDefs} />
      </div>
    </div>
  );
}
