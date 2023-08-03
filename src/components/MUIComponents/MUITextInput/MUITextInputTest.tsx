// import { render } from "@testing-library/react";
// import MUITextInput from "../MUITextInput";
// import validationSchema from "../../../validators/auth";
// import { SubmitHandler } from "react-hook-form";
// import { BrowserRouter } from 'react-router-dom';
// import { useStyles } from "../../../styles/InputUseStyles";
// import { useForm, useFormState } from "react-hook-form";
// type LoginValues = {
//     email: string;
// };

// jest.mock("react-hook-form", () => ({
//     useForm: jest.fn(),
//     useFormState: jest.fn(),
// }));

// jest.mock("../../../styles/InputUseStyles", () => ({
//     useStyles: jest.fn().mockReturnValue({
//         field: "mock-field-class",
//     }),
// }));

// describe("MUITextInput", () => {
//     const mockUseForm = useForm as jest.Mock;
//     const mockUseFormState = useFormState as jest.Mock;

//     const classes = {
//         field: "mock-field-class",
//     };

//     const onSubmit: SubmitHandler<LoginValues> = (dataForm) => {
//         const { email } = dataForm;
//         console.log(email);
//     };

//     it("should render without errors and match the expected appearance", () => {
//         const mockControl = jest.fn();
//         const mockRegister = jest.fn();
//         const mockHandleSubmit = jest.fn();
//         const mockErrors = {};

//         mockUseForm.mockReturnValue({
//             control: mockControl,
//             register: mockRegister,
//             handleSubmit: mockHandleSubmit,
//             errors: mockErrors,
//         });

//         mockUseFormState.mockReturnValue({ errors: mockErrors });

//         render(
//             <BrowserRouter>
//                 <form onSubmit={mockHandleSubmit(onSubmit)}>
//                     <MUITextInput
//                         control={mockControl}
//                         register={mockRegister}
//                         name="email"
//                         label="Email"
//                         validationSchema={validationSchema}
//                         errors={mockErrors}
//                         classes={classes}
//                         defaultValue=""
//                     />
//                     <button type="submit">Submit</button>
//                 </form>
//             </BrowserRouter>
//         );

//     });
// });
const MUITextInputTest = () => {
    return (
        <div>MUITextInputTest</div>
    )
}
export default MUITextInputTest
