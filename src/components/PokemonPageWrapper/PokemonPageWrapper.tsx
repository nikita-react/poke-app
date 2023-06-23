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
        <Layout data-testid="layout" styles="flex justify-between flex-col gap-5">
            <Header data-testid="header" search={search} />
            {children}
            <Footer data-testid="footer" />
        </Layout>
    );
};

export default PokemonPageWrapper;
