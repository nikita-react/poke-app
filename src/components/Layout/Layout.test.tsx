import { render } from "@testing-library/react";
import Layout from "../Layout";

describe("Layout component", () => {
    const children = <div>component</div>;

    it("renders children correctly", () => {

        const { getByText } = render(<Layout>
            {children}
        </Layout>);

        expect(getByText("component")).toBeInTheDocument();
    });

    it("applies correct className when styles prop is provided", () => {
        const styles = "custom-styles";
        const { container } = render(<Layout children={children} styles={styles} />);
        const layoutElement = container.firstChild;
        expect(layoutElement).toHaveClass("min-h-screen");
        expect(layoutElement).toHaveClass(styles);
    });

    it("applies only min-h-screen className when styles prop is not provided", () => {
        const { container } = render(<Layout children={children} />);
        const layoutElement = container.firstChild as HTMLElement;
        expect(layoutElement).toHaveClass("min-h-screen");
        expect(layoutElement.classList.length).toBe(1);
    });

});