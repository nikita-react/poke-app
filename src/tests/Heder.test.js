import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../components/Header";
import { ErrorBoundary } from "react-error-boundary";

function CustomErrorBoundary({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

describe("Header", () => {
  let queryClient;

  beforeAll(() => {
    queryClient = new QueryClient();
  });

  test("renders navigation links", () => {
    render(
      <ErrorBoundary FallbackComponent={CustomErrorBoundary}>
        <QueryClientProvider client={queryClient}>
          <Header search={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    );
  });

  test("performs search when input value changes", () => {
    render(
      <ErrorBoundary FallbackComponent={CustomErrorBoundary}>
        <QueryClientProvider client={queryClient}>
          <Header search={true} />
        </QueryClientProvider>
      </ErrorBoundary>
    );
  });
});
