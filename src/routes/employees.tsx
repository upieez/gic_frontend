import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employees")({
  component: Employees,
});

export interface IEmployee {
  id: string;
  name: string;
  email_address: string;
}

function Employees() {
  return (
    <div className="p-2">
      <h3>Welcome to Employees!</h3>
    </div>
  );
}
