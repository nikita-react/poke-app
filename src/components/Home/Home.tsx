import React from "react";
import Layout from "../Layout";
import Footer from "../Footer";
import Header from "../Header";

const Home: React.FC = () => {
  return (
    <Layout styles="flex	justify-between flex-col">
      <Header />
      <Footer />
    </Layout>
  );
};
export default Home;
