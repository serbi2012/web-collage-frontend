import React, { useEffect, useState } from "react";
import styled from "styled-components";
import setCookie from "../../../utils/setCookie";

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

  .Popup-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .Popup-collageButton {
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

  .Popup-collageButton:hover {
    background-color: hsl(0, 0%, 90%);
  }

  .Popup-collageButton:active {
    background-color: hsl(0, 0%, 70%);
  }

  .Popup-collageButton > span {
    font-size: 50px;
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
      <header className="Popup-header">
        <h1>Web Collage</h1>
      </header>
      <div
        className="Popup-collageButton"
        onClick={() => {
          window.open("main.html");
        }}
      >
        <span className="material-symbols-outlined">file_copy</span>
      </div>
      <h3>Scrap this page</h3>
      <hr />
      <h3>Enter shared page</h3>
      <input
        onChange={(event) => {
          setShareModeKey(event.target.value);
        }}
      />
      <button
        onClick={() => {
          setCookie("shareModeKey", shareModeKey, 1);
          window.open("main.html");
        }}
      >
        Connect
      </button>
    </PopupContainer>
  );
};

export default Popup;
