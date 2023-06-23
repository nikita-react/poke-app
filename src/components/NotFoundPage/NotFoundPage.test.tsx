import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
    test("renders page not found message", () => {
        render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        );

        expect(screen.getByText("404")).toBeInTheDocument();
        expect(screen.getByText("Page not found")).toBeInTheDocument();
        expect(
            screen.getByText("Sorry, we couldn’t find the page you’re looking for.")
        ).toBeInTheDocument();
    });

    test("renders go back home link", () => {
        render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        );

        const goBackHomeLink = screen.getByText("Go back home");
        expect(goBackHomeLink).toBeInTheDocument();
        expect(goBackHomeLink.getAttribute("href")).toBe("/pokemons");
    });

    test("renders contact support link", () => {
        render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        );

        const contactSupportLink = screen.getByText("Contact support");
        expect(contactSupportLink).toBeInTheDocument();
        expect(contactSupportLink.getAttribute("href")).toBe("/pokemons");
    });
});
