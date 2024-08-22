import React from "react";
import styles from "./Layout.module.scss";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Nav from "./nav/Nav";

function Layout(props) {
  return (
    <div className={styles.layout}>
      <Header />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
