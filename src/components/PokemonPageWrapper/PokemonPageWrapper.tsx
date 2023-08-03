import React from "react";
import Layout from "../Layout";
import Footer from "../Footer";
import Header from "../Header";


type PokemonPageWrapperProps = {
    children: JSX.Element;
    search: boolean;
};
const PokemonPageWrapper: React.FC<PokemonPageWrapperProps> = ({ children, search }) => {
    return (
        <Layout data-testid="layout2"  styles="flex justify-between flex-col gap-5">
            <Header search={search} />
            {children}
            <Footer   />
        </Layout>
    );
};

export default PokemonPageWrapper;
