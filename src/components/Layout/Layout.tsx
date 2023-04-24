import React from "react";

type LayoutProps = {
  children: JSX.Element | JSX.Element[];
  styles?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, styles }) => {
  return (
    <div className={`min-h-screen  ${styles ? styles : ""}`}>{children}</div>
  );
};
export default Layout;
