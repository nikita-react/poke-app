import React, { useEffect, useState } from "react";
import Routing from "./Routes";
import supabase from "./client";
import { SessionContext } from "./context";
import Loading from "./components/Loading";
import Layout from "./components/Layout";

const App: React.FC = () => {
  const [session, setSession] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setTimeout(() => {
        setSession(Boolean(session));
        setIsLoading(false);
      }, 1000);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => {
        setSession(Boolean(session));
        setIsLoading(false);
      }, 1000);
    });
  }, []);

  if (isLoading) {
    return (
      <Layout styles="flex justify-center items-center">
        <Loading />
      </Layout>
    );
  }
  return (
    <SessionContext.Provider value={session}>
      <Routing />
    </SessionContext.Provider>
  );
};
export default App;
