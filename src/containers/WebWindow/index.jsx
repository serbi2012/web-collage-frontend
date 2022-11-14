import React from "react";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";

const WebWindowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc((100vw - 70px) / 2);
  height: 100vh;

  .WebWindow-addressBarBox {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    padding: 5px 5px;
    width: 250px;
    top: 20px;
    background-color: ${COLORS.SUB_COLOR};
    border-radius: 5px;
    transition: all 0.4s ease-in-out;

    input {
      padding: 5px 10px;
      width: 250px;
      border-radius: 5px;

      :focus {
        outline: none;
      }
    }

    .WebWindow-changeUrlButton {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 5px;
      height: 30px;
      width: 40px;
      color: ${COLORS.SUB_COLOR};
      background-color: ${COLORS.MAIN_COLOR};
      border-radius: 5px;
      transition: all 0.2s ease-in-out;
      user-select: none;
      cursor: pointer;

      :hover {
        opacity: 0.9;
      }

      :active {
        opacity: 0.7;
      }
    }

    .WebWindow-foldButton {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: ${COLORS.SUB_COLOR};
      height: 50px;
      width: 50px;
      color: ${COLORS.MAIN_COLOR};
      border-radius: 50px;
      user-select: none;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      z-index: -1;

      :hover {
        opacity: 0.9;
      }

      :active {
        opacity: 0.7;
      }
    }
  }

  iframe {
    height: 100%;
    width: 100%;
    border: none;
  }
`;

const WebWindow = () => {
  const [urlAddress, setUrlAddress] = useState("https://www.google.com/");
  const [urlInput, setUrlInput] = useState("");
  const [isAddressBarFold, setIsAddressBarFold] = useState(true);

  return (
    <WebWindowContainer>
      <div
        className="WebWindow-addressBarBox"
        style={{
          transform: isAddressBarFold ? "translateY(-60px)" : "translateY(0px)",
        }}
      >
        <input
          defaultValue={urlAddress}
          onChange={(event) => {
            setUrlInput(event.target.value);
          }}
        />
        <span
          className="material-symbols-outlined WebWindow-changeUrlButton"
          onClick={() => {
            setUrlAddress(urlInput);
          }}
        >
          arrow_forward
        </span>
        <div
          className="WebWindow-foldButton"
          onClick={() => {
            setIsAddressBarFold(!isAddressBarFold);
          }}
          style={{
            transform: isAddressBarFold
              ? "translateY(15px)"
              : "translateY(-15px)",
          }}
        >
          <span class="material-symbols-outlined">arrow_drop_up</span>
          <span class="material-symbols-outlined">arrow_drop_down</span>
        </div>
      </div>
      <iframe
        src={urlAddress}
        sandbox="allow-scripts allow-modals allow-top-navigation allow-same-origin allow-forms allow-popups allow-pointer-lock allow-popups-to-escape-sandbox"
      />
    </WebWindowContainer>
  );
};

export default WebWindow;
