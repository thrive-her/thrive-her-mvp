import {
  PassageAuth,
  PassageUnAuthGuard,
} from "@passageidentity/passage-react";
import { Navigate } from "react-router-dom";
import React from "react";
import styles from "../styles/Home.module.css";

function Home() {
  return (
    <div className={styles.wrapper}>
    <div className={styles.mainContainer}>
      <PassageUnAuthGuard authComp={<Navigate to="/dashboard" />}>
        <PassageAuth />
      </PassageUnAuthGuard>
    </div>
    </div >
  );
}

export default Home;
