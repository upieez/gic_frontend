import { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme
import { ColDef } from "ag-grid-community";

export const Route = createLazyFileRoute("/cafes")({
  component: Cafes,
});

interface ICafe {
  logo: string;
  name: string;
  description: string;
  employees: string;
  location: string;
}

function Cafes() {
  const [rowData, setRowData] = useState<ICafe[]>([
    {
      logo: "Tesla",
      name: "Model Y",
      description: "Car",
      employees: "car",
      location: "",
    },
    {
      logo: "Ford",
      name: "F-Series",
      description: "Car",
      employees: "car",
      location: "",
    },
    {
      logo: "Toyota",
      name: "Corolla",
      description: "car",
      employees: "car",
      location: "",
    },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<ColDef<ICafe>[]>([
    { field: "logo" },
    { field: "name" },
    { field: "description" },
    { field: "employees" },
    { field: "location" },
  ]);

  return (
    <div className="p-2">
      <h3>Welcome to Cafes!</h3>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
}
