import React from "react";

import Sidebar from "../sidebar";
import { Content, LayoutWrapper } from "./styled";

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Sidebar />
      <Content>{children}</Content>
    </LayoutWrapper>
  );
};

export default Layout;
