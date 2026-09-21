import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "@/app/router"
import { AppProviders } from "@/app/providers"
import PageTransitionProvider from "@/app/PageTransitionProvider"
import "@/styles/index.scss"
import ErrorBoundary from "@/components/error/ErrorBoundary"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProviders>
        <PageTransitionProvider router={router}>
          <RouterProvider router={router} />
        </PageTransitionProvider>
      </AppProviders>
    </ErrorBoundary>
  </React.StrictMode>
)
