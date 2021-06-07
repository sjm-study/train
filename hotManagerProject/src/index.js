import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
// import PoPular from "@/page/Populat";
import { router } from "@/untils/router";
// import Loading from "@/untils/lazy";


import Router from './router/index'

import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "normalize.css/normalize.css";
import "font-awesome/css/font-awesome.css";
import "antd/dist/antd.css";

import styles from "./index.less";

const Index = () => {
  const [route, setRoute] = useState({ page: "", param: "" });
  // const [theme, setTheme] = useState("light");

  const hashchange = () => {
    const R = router();
    setRoute(R);
  };

  useEffect(() => {
    hashchange();

    window.addEventListener("hashchange", hashchange);

    return () => window.removeEventListener("hashchange", hashchange);
  }, []);

  // const changeTheme = () => {
  //   if (theme === "light") {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // };

  return (
    <div
      // className={theme === "light" ? styles.light : styles.dark}
      className={styles.dark}
      style={{ padding: "0 15px 0 15px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div className={styles.menu}>
          <a
            href="#/popular/select=All"
            className={route.page.slice(0, 7) === "popular" ? styles.active : ""}
          >
            PoPular
          </a>
          <a
            href="#/battle"
            className={route.page === "battle" ? styles.active : ""}
          // onClick={(e)=>{console.log(history)}}
          // onKeyDown={()=>window.location.href='#/battle'}
          >
            Battle
          </a>
        </div>
        {/* <button
          onClick={changeTheme}
          type="button"
          style={{ backgroundColor: "transparent", borderWidth: 0 }}
        >
          <i
            className="fa fa-exchange"
            style={{ fontSize: 25, marginTop: 20 }}
          />
        </button> */}
      </div>

      {/* {route.page === "" && <PoPular />}
      {route.page === "battle" && (
        <Loading load={() => import("@/page/Battle/index")}>
          {Com => <Com />}
        </Loading>
      )}
      {route.page === "results" && (
        <Loading load={() => import("@/page/Results/index")}>
          {Com => <Com />}
        </Loading>
      )} */}
      <Router />
    </div>
  );
};


ReactDOM.render(<Index />, document.getElementById("root"));
