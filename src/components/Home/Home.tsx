import { FC } from "react";
import Layout from "../Layout";
import Footer from "../Footer";
import Header from "../Header";
import Table from "../Table";

const Home: FC = () => {
  return (
    <Layout styles="flex justify-between flex-col gap-5	">
      <Header />
      <Table />
      <Footer />
    </Layout>
  );
};

export default Home;
