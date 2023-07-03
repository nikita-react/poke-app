import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const PrivateRoutes: React.FC = () => {
  const sessionQuery = useQuery<boolean>(['session']);
  console.log(sessionQuery);

  return <>{sessionQuery.data ?
    <Outlet />
    : <Navigate to="/login" />}</>;
};

export default PrivateRoutes;

// import { render, screen } from "@testing-library/react";
// import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
// import { BrowserRouter, Route, Routes, MemoryRouter} from "react-router-dom";
// import PrivateRoutes from './PrivateRoutes';
// import PokemonsPage from "../PokemonsPage";

// const client = new QueryClient();

// jest.mock("@tanstack/react-query", () => ({
//   ...jest.requireActual("@tanstack/react-query"),
//   useQuery: jest.fn(),
// }));

// test('render pokemon page', () => {
//   const mockReturnValue = {
//     data: true,
//   };
//   useQuery.mockReturnValue(mockReturnValue);

//   render(
//       <MemoryRouter>
//         <PrivateRoutes/>
//       </MemoryRouter>
//   );

//   expect(screen.getByTestId('app')).toBeInTheDocument();
// });
