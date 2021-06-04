import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Alert } from "antd";
import { router } from "@/untils/router";

import styles from "./index.less";

function Index() {
  const [playOne, setPlayOne] = useState({});
  const [playTwo, setPlayTwo] = useState({});

  const [error, setError] = useState(false);

  const [text, setText] = useState("");

  useEffect(() => {
    const route = router();
    // console.log(route.query)
    // var p = window.location.href
    // var play1 = p.split('play1=')[1] && p.split('play1=')[1].split('&')[0]
    // var play2 = p.split('play2=')[1]
    if (route.query.play1 && route.query.play2) {
      axios
        .get(`https://api.github.com/users/${route.query.play1}`)
        .then(res => {
          setPlayOne(res.data);
        })
        .catch(() => {
          setError(true);
          setText("API rate limit");
        });
      axios
        .get(`https://api.github.com/users/${route.query.play2}`)
        .then(res => setPlayTwo(res.data))
        .catch(() => {
          setText("API rate limit");
          setError(true);
        });
    } else {
      // window.location.href = '#/battlel'
      setError(true);
      setText("url error");
    }
  }, []);

  const changeNumber = number => {
    return (number || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  };

  const Results = (num1, num2) => {
    if (num1 > num2) {
      return "Winner";
    }
    if (num1 < num2) {
      return "Loser";
    }
    return "Draw";
  };

  return (
    <div>
      {!error ? (
        <Row className={styles.warpper}>
          <Col style={{ width: "100%", padding: "10px 5px" }} sm={12} xs={24}>
            <div className={styles.inner}>
              <span className={styles.resultS}>
                {Results(playOne.public_repos, playTwo.public_repos)}
              </span>
              <div>
                <img src={playOne.avatar_url} alt="avatar_url" />
              </div>
              <div className={styles.info}>
                <span className={styles.result576}>
                  {Results(playOne.public_repos, playTwo.public_repos)}
                </span>
                <span className={styles.scores}>
                  Scores: {playOne.public_repos}
                </span>
                <span className={styles.name}>{playOne.name}</span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                  className={styles.iconInfo}
                >
                  <div>
                    <span
                      className="fa fa-user"
                      style={{ color: "rgb(255,191,116)", marginLeft: 2 }}
                    />
                    <span
                      style={{ fontSize: 14, fontWeight: "600", marginLeft: 8 }}
                    >
                      {playOne.location}
                    </span>
                  </div>
                  <div>
                    <span
                      className="fa fa-star"
                      style={{ color: "rgb(255,215,0)" }}
                    />
                    <span style={{ fontSize: 14, marginLeft: 5 }}>
                      {changeNumber(playOne.followers)}
                    </span>
                  </div>
                  <div>
                    <span
                      className="fa fa-share-alt fa-rotate-270"
                      style={{ color: "rgb(147,201,242)" }}
                    />
                    <span style={{ fontSize: 14, marginLeft: 7 }}>
                      {changeNumber(playOne.following)}
                    </span>
                  </div>
                  <div>
                    <span
                      className="fa fa-warning"
                      style={{ color: "rgb(240,144,151)" }}
                    />
                    <span style={{ fontSize: 14, marginLeft: 5 }}>
                      {changeNumber(playOne.public_repos)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col style={{ width: "100%", padding: "10px 5px" }} sm={12} xs={24}>
            <div className={styles.inner}>
              <span className={styles.resultS}>
                {Results(playTwo.public_repos, playOne.public_repos)}
              </span>
              <div>
                <img src={playTwo.avatar_url} alt="avatar_url" />
              </div>
              <div className={styles.info}>
                <span className={styles.result576}>
                  {Results(playTwo.public_repos, playOne.public_repos)}
                </span>
                <span className={styles.scores}>
                  Scores: {playTwo.public_repos}
                </span>
                <span className={styles.name}>{playTwo.name}</span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <div style={{ width: "70%", textAlign: "left" }}>
                    <span
                      className="fa fa-user"
                      style={{ color: "rgb(255,191,116)", marginLeft: 2 }}
                    />
                    <span
                      style={{ fontSize: 14, fontWeight: "600", marginLeft: 8 }}
                    >
                      {playTwo.location}
                    </span>
                  </div>
                  <div style={{ width: "70%", textAlign: "left" }}>
                    <span
                      className="fa fa-star"
                      style={{ color: "rgb(255,215,0)" }}
                    />
                    <span style={{ fontSize: 14, marginLeft: 5 }}>
                      {changeNumber(playTwo.followers)}
                    </span>
                  </div>
                  <div style={{ width: "70%", textAlign: "left" }}>
                    <span
                      className="fa fa-share-alt fa-rotate-270"
                      style={{ color: "rgb(147,201,242)" }}
                    />
                    <span style={{ fontSize: 14, marginLeft: 7 }}>
                      {changeNumber(playTwo.following)}
                    </span>
                  </div>
                  <div style={{ width: "70%", textAlign: "left" }}>
                    <span
                      className="fa fa-warning"
                      style={{ color: "rgb(240,144,151)" }}
                    />
                    <span style={{ fontSize: 14, marginLeft: 5 }}>
                      {changeNumber(playTwo.public_repos)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <Alert message={text} type="error" closable style={{ marginTop: 20 }} />
      )}

      <div
        style={{
          width: "100%",
          justifyContent: "center",
          marginTop: 50,
          display: "flex"
        }}
      >
        <button
          style={{ fontSize: 18, width: 200, paddingTop: 8, paddingBottom: 8 }}
          onClick={() => {
            window.location.href = `#/battle`;
          }}
          type="button"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Index;
