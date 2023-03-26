import React from "react";

const Layout: React.FC<{
  children: JSX.Element | JSX.Element[];
  styles: string;
}> = ({ children, styles }) => {
  return <div className={`min-h-screen ${styles}`}>{children}</div>;
};
export default Layout;
