import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { setCookie } from "../../../utils/manageCookie";
import COLORS from "../../constants/COLORS";

const PopupContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  text-align: center;
  height: 100%;
  padding: 10px;
  background-color: #27292d;
  color: white;

  hr {
    margin: 30px 0;
    width: 200px;
  }

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .collageButton {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100px;
    color: #27292d;
    background-color: white;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .collageButton:hover {
    background-color: hsl(0, 0%, 90%);
  }

  .collageButton:active {
    background-color: hsl(0, 0%, 70%);
  }

  .collageButton > span {
    font-size: 50px;
  }

  .connectShareKeyBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    input {
      height: 20px;
      color: ${COLORS.SUB_COLOR};
      background-color: transparent;
      border: 2px solid ${COLORS.SUB_COLOR};
      border-radius: 5px;

      :focus {
        outline: none;
      }
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      height: 30px;
      width: 100%;
      color: ${COLORS.MAIN_COLOR};
      background-color: ${COLORS.SUB_COLOR};
      border-radius: 5px;
      transition: all 0.2s ease-in-out;

      :hover {
        opacity: 0.8;
      }

      :active {
        opacity: 0.4;
      }
    }
  }
`;

const Popup = () => {
  const [shareModeKey, setShareModeKey] = useState("");

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const url = tabs[0].url;

      setCookie("urlAddress", url, 1);
    });
  }, []);

  return (
    <PopupContainer>
      <header>
        <h1>Web Collage</h1>
      </header>
      <div
        className="collageButton"
        onClick={() => {
          window.open("main.html");
        }}
      >
        <span className="material-symbols-outlined">file_copy</span>
      </div>
      <h3>Scrap this page</h3>
      <hr />
      <h3>Enter shared page</h3>
      <div className="connectShareKeyBox">
        <input
          onChange={(event) => {
            setShareModeKey(event.target.value);
          }}
        />

        <div
          onClick={() => {
            setCookie("shareModeKey", shareModeKey, 1);
            window.open("main.html");
          }}
        >
          Connect
        </div>
      </div>
    </PopupContainer>
  );
};

export default Popup;
