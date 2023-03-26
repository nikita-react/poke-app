import React from "react";
import supabase from "../../client";

const Home: React.FC = () => {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };
  return (
    <div>
      <h1>Home</h1>
      <button onClick={signOut}>sign out</button>
    </div>
  );
};
export default Home;
