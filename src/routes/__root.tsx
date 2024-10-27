import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Suspense } from "react";
import { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => {
      const TanStackRouterDevtools = import.meta.env.PROD
        ? () => null // Render nothing in production
        : React.lazy(() =>
            // Lazy load in development
            import("@tanstack/router-devtools").then((res) => ({
              default: res.TanStackRouterDevtools,
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
            <ReactQueryDevtools initialIsOpen={false} />
          </Suspense>
        </>
      );
    },
  }
);
