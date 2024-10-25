import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";

export const Route = createRootRoute({
  component: () => {
    const TanStackRouterDevtools = import.meta.env.PROD
      ? () => null // Render nothing in production
      : React.lazy(() =>
          // Lazy load in development
          import("@tanstack/router-devtools").then((res) => ({
            default: res.TanStackRouterDevtools,
            // For Embedded Mode
            // default: res.TanStackRouterDevtoolsPanel
          }))
        );

    return (
      <>
        <div className="p-2 flex gap-2">
          <Link to="/cafes" className="[&.active]:font-bold">
            Cafes
          </Link>{" "}
          <Link to="/employees" className="[&.active]:font-bold">
            Employees
          </Link>
        </div>
        <hr />
        <Outlet />
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </>
    );
  },
});
