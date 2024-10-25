import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/employees")({
  component: Employees,
});

function Employees() {
  return (
    <div className="p-2">
      <h3>Welcome to Employees!</h3>
    </div>
  );
}
