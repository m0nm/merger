import Image from "next/image";
import React from "react";
import logo from "../public/merger.svg";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.container}>
      <Image src={logo} alt="" width={80} height={40} />
    </nav>
  );
}

export default Navbar;
