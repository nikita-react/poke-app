import { useEffect, useState } from "react";
import supabase from "../client";
import { useQueryClient } from "@tanstack/react-query";

const  useSession = () => {
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      queryClient.setQueryData(['session'], Boolean(session));
      setIsLoading(false);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(['session'], Boolean(session));
      setIsLoading(false);
    });
  }, []);
  return isLoading;
};
export default useSession;