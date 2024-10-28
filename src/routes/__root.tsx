import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { Suspense } from "react";
import { QueryClient } from "@tanstack/react-query";
import TopAppBar from "../components/TopAppBar";
import { Container } from "@mui/material";

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
          <TopAppBar />
          <Container maxWidth="xl">
            <Outlet />
          </Container>
          <Suspense>
            <TanStackRouterDevtools />
            <ReactQueryDevtools initialIsOpen={false} />
          </Suspense>
        </>
      );
    },
  }
);
