import React from "react";
import zhanweiPng from "@/assents/zhanwei.jpg";
import styles from "./index.less";

function Index(props) {
  const { item, index } = props;

  const changeNumber = number =>
    (number || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");

  return (
    <div
      className={styles.warpper}
      style={{ backgroundColor: "rgb(235,235,235)" }}
    >
      <span className={styles.indexText}>#{index + 1}</span>
      <div>
        <img
          data-src={item.owner.avatar_url}
          alt="avatar_url"
          className="lazyload"
          src={zhanweiPng}
        />
      </div>
      <span className={styles.name}>{item.owner.login}</span>
      <div className={styles.infoWrapper}>
        <div className={styles.media576info}>
          <span>#{index + 1}</span>
          <span>{item.owner.login}</span>
        </div>
        <div>
          <i
            className="fa fa-user"
            style={{ color: "rgb(255,191,116)", paddingLeft: 2 }}
          />
          <span>{item.owner.login}</span>
        </div>
        <div style={{ textAlign: "left" }}>
          <i className="fa fa-star" style={{ color: "rgb(255,215,0)" }} />
          <span>{changeNumber(item.stargazers_count)} start</span>
        </div>
        <div style={{ textAlign: "left" }}>
          <i
            className="fa fa-share-alt fa-rotate-270"
            style={{ color: "rgb(147,201,242)" }}
          />
          <span>{changeNumber(item.forks_count)} forks</span>
        </div>
        <div style={{ textAlign: "left" }}>
          <i className="fa fa-warning" style={{ color: "rgb(240,144,151)" }} />
          <span>{changeNumber(item.open_issues_count)} open issuses</span>
        </div>
      </div>
    </div>
  );
}

export default Index;
