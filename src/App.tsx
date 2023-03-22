import React, { useEffect, useState } from "react";
import Routing from "./Routes";
import supabase from "./client";
import { SessionContext } from "./context";

const App: React.FC = () => {
  const [session, setSession] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(Boolean(session));
      setIsLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(Boolean(session));
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <SessionContext.Provider value={session}>
      <Routing />
    </SessionContext.Provider>
  );
};
export default App;
