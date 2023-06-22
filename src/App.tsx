import React from "react";
import Routing from "./Routes";
import Loading from "./components/Loading";
import Layout from "./components/Layout";
import useSession from "./hooks/useSession";

const App: React.FC = () => {
  const isLoading = useSession();

  if (isLoading) {
    return (
      <Layout styles="flex justify-center items-center">
        <Loading data-testid="loading-component" />
      </Layout>
    );
  }
  return (
    <Routing data-testid="routing-component" />
  );
};
export default App;
