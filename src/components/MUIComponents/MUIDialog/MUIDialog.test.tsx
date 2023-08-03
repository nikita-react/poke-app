import MUIDialog from "./MUIDialog";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

describe("MUIDialog", () => {
    const mockOnClose = jest.fn();
    const mockSetSortKey = jest.fn();
    const data = [
        {
            key: "Default",
            name: "Default"
        },
        {
            key: "Height: High-Low",
            name: "Height: High-Low"
        },
        {
            key: "Height: Low-High",
            name: "Height: Low-High"
        },
        {
            key: "Experience: High-Low",
            name: "Experience: High-Low"
        },
        {
            key: "Experience: Low-High",
            name: "Experience: Low-High"
        }
    ];

    it("should render", () => {
        render(
            <BrowserRouter>
                <MUIDialog
                    onClose={mockOnClose}
                    setSortKey={mockSetSortKey}
                    open={true}
                    data={data}
                    selectedValue={'Default'}
                />
            </BrowserRouter>
        );

        const dialog = screen.getByTestId("dialog");
        expect(dialog).toBeInTheDocument();
    });
    it("should not render", () => {
        render(
            <BrowserRouter>
                <MUIDialog
                    onClose={mockOnClose}
                    setSortKey={mockSetSortKey}
                    open={false}
                    data={data}
                    selectedValue={'Default'}
                />
            </BrowserRouter>
        );
        const dialog = screen.queryByTestId("dialog");
        expect(dialog).not.toBeInTheDocument();
    });
    it("check onClose and setSortKey function", () => {
        render(
            <BrowserRouter>
                <MUIDialog
                    onClose={mockOnClose}
                    setSortKey={mockSetSortKey}
                    open={true}
                    data={data}
                    selectedValue={'Default'}
                />
            </BrowserRouter>
        );

        data.forEach((item) => {
            const listItemButton = screen.getByText(item.name);
            userEvent.click(listItemButton);
            expect(mockOnClose).toHaveBeenCalledWith(item.key);
            expect(mockSetSortKey).toHaveBeenCalledWith(item.key);

        });
        expect(mockOnClose).toHaveBeenCalledTimes(data.length);
        expect(mockSetSortKey).toHaveBeenCalledTimes(data.length)
    });

    it("check data in Dialog", () => {
        render(
            <BrowserRouter>
                <MUIDialog
                    onClose={mockOnClose}
                    setSortKey={mockSetSortKey}
                    open={true}
                    data={data}
                    selectedValue={'Default'}
                />
            </BrowserRouter>
        );

        data.forEach((item) => {
            const dataItemName = screen.getByText(item.name);
            expect(dataItemName).toBeInTheDocument();
        })
    });
})