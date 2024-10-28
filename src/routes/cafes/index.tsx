import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { cafesQueryOptions } from "../../cafes";
import { IEmployee } from "../../employees";
import { createLink } from "@tanstack/react-router";
import useGetCafes from "../../hooks/useGetCafes";
import { useDeleteCafe } from "../../hooks/useDeleteCafe";
import Dialog from "../../components/Dialog";
import { DIALOG_DELETE_CONTENT, DIALOG_DELETE_TITLE } from "../../constants";

export const Route = createFileRoute("/cafes/")({
  component: Cafes,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(cafesQueryOptions),
});

const ArrayCellRenderer: React.FC<ICellRendererParams> = (props) => {
  const navigate = useNavigate();
  const employees: Pick<IEmployee, "name" | "id" | "cafeName">[] = props.value;

  const handleClick = (cafeName: string) => {
    navigate({
      to: `/employees`,
      search: { cafe: cafeName },
    });
  };

  return employees.map((employee) => (
    <Button key={employee.id} onClick={() => handleClick(employee.cafeName)}>
      {employee.name}
    </Button>
  ));
};

const EditButtonRenderer: React.FC<ICellRendererParams> = (props) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate({ to: `/cafes/edit/${props.data.id}` });
  };

  return <Button onClick={handleEdit}>Edit</Button>;
};

const DeleteButtonRenderer: React.FC<ICellRendererParams> = (props) => {
  const [isOpen, setOpen] = useState(false);
  const deleteCafe = useDeleteCafe();
  const handleDelete = () => {
    deleteCafe.mutate({ id: props.data.id });
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
    { field: "name" },
    { field: "description", flex: 1 },
    { field: "employees", cellRenderer: ArrayCellRenderer },
    { field: "location", filter: true },
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
        List of Cafes
      </Typography>
      <RouterButton to="/cafes/add" variant="contained" sx={{ mb: 2 }}>
        Add New Cafe
      </RouterButton>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={cafesQuery.data}
          columnDefs={colDefs}
          rowHeight={100}
        />
      </div>
    </div>
  );
}
