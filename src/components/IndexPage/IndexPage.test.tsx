import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IndexPage from "./IndexPage";

const queryClient = new QueryClient();

describe("IndexPage", () => {
    test("renders page content", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <IndexPage />
                </BrowserRouter>
            </QueryClientProvider>
        );

        expect(screen.getByText("Poke App")).toBeInTheDocument();
        expect(screen.getByText("Technology stack:")).toBeInTheDocument();

        const githubLink = screen.getByRole("link", {
            name: /github/i,
        });
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute(
            "href",
            "https://github.com/nikita-react/poke-app"
        );

        const linkedInLink = screen.getByRole("link", {
            name: /linkedin/i,
        });
        expect(linkedInLink).toBeInTheDocument();
        expect(linkedInLink).toHaveAttribute(
            "href",
            "https://www.linkedin.com/in/mykyta-voskoboinykov/"
        );

        expect(screen.getByRole("button", { name: /use test data/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
    });
});
