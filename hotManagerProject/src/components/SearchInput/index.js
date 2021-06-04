import React, { useState } from "react";
import axios from "axios";

import ClosePng from "@/assents/close.png";

import styles from "./index.less";

function Index(props) {
  const [playName, setPlayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errrorText, setErrorText] = useState("");
  const [playImg, setPlayImg] = useState("");
  const [display, setDisplay] = useState(false);

  const submit = () => {
    if (props.otherName && props.otherName === playName) {
      setErrorText("playOneName is same of platTwoName!!");
    } else {
      setLoading(true);
      // $('#img1').removeClass('lazyload')
      axios
        .get(`https://api.github.com/users/${playName}`)
        .then(res => {
          if (res.data.message) {
            console.log("fail");
          } else {
            setPlayImg(res.data.avatar_url);
            setDisplay(true);
            // $('#img1').addClass('lazyload')
            setErrorText("");
            props.getSuccessData(playName);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
          setErrorText("Not Found");
        });
    }
  };

  const handleKey = e => {
    if (
      e.nativeEvent.keyCode === 13 &&
      e.target.value.length > 0 &&
      !loading &&
      !error
    ) {
      submit();
    }
  };

  const changeVaule = e => {
    setPlayName(e.target.value);
    setError(false);
  };

  const closeClick = () => {
    setDisplay(false);
    setPlayName("");
    props.getSuccessData("");
  };

  return (
    <div>
      <div style={{ display: display ? "none" : "flex" }}>
        <div style={{ width: "100%" }} className={styles.wrapper}>
          <input
            className={styles.input}
            value={playName}
            onChange={e => changeVaule(e)}
            onKeyDown={e => handleKey(e)}
          />
          <button
            className={styles.button}
            disabled={!(playName.length > 0 && !loading && !error)}
            onClick={submit}
            type="button"
          >
            Submit{" "}
            <i
              className="fa fa-spinner fa-spin fa-1x"
              style={{ display: loading ? "inline" : "none" }}
            />
          </button>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "rgb(200,200,200)",
          display: !display ? "none" : "flex"
        }}
        className={styles.infoWrapper}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={playImg} alt="logoImg" id="img1" />
          <span>{playName}</span>
        </div>
        <button
          onClick={closeClick}
          type="button"
          style={{ backgroundColor: "transparent", borderWidth: 0 }}
        >
          <img src={ClosePng} style={{ width: 36, height: 36 }} alt="img" />
        </button>
      </div>
      <span style={{ fontSize: 13, color: "#eb1700" }}>{errrorText}</span>
    </div>
  );
}

export default Index;
