import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const PrivateRoutes: React.FC = () => {
  const sessionQuery = useQuery<boolean>(['session']);

  return <>{sessionQuery.data ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoutes;


// import { render } from '@testing-library/react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import PrivateRoute from '../PrivateRoute';

// test('renders <Outlet /> when session is true', () => {
//   const queryClient = new QueryClient();
//   const { getByTestId } = render(
//     <QueryClientProvider client={queryClient}>
//       <PrivateRoute />
//     </QueryClientProvider>
//   );

//   queryClient.setQueryData(['session'], true);

//   expect(getByTestId('layout')).toBeInTheDocument();
// });