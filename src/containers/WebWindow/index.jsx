import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";

const WebWindowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: calc((100vw - 70px) / 2);
  overflow-y: scroll;

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

  .WebWindow-ratioButton {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 10px;
    bottom: 10px;
    width: 130px;
    height: 40px;
    background-color: ${COLORS.SUB_COLOR};
    border-radius: 10px;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
    }
  }

  iframe {
    height: 100%;
    width: 100%;
    border: none;
  }
`;

const BodyContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

const WebWindow = () => {
  const [urlInput, setUrlInput] = useState("");
  const [iframeDom, setIframeDom] = useState(null);
  const [isAddressBarFold, setIsAddressBarFold] = useState(true);

  window.addEventListener("click", (event) => {
    event.target.style.backgroundColor = "red";
  });

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("https://www.naver.com");

      setIframeDom(data);
    })();
  }, []);

  return (
    <WebWindowContainer id="webWindow">
      <div
        className="WebWindow-addressBarBox"
        style={{
          transform: isAddressBarFold ? "translateY(-60px)" : "translateY(0px)",
        }}
      >
        <input
          defaultValue="https://www.naver.com"
          onChange={(event) => {
            setUrlInput(event.target.value);
          }}
        />
        <span
          className="material-symbols-outlined WebWindow-changeUrlButton"
          onClick={async () => {
            const { data } = await axios.get(urlInput);

            setIframeDom(data);
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
          <span className="material-symbols-outlined">arrow_drop_up</span>
          <span className="material-symbols-outlined">arrow_drop_down</span>
        </div>
      </div>
      <div className="WebWindow-ratioButton">
        <span>-</span>
        <div>100%</div>
        <span>+</span>
      </div>
      <BodyContainer dangerouslySetInnerHTML={{ __html: iframeDom }} />
    </WebWindowContainer>
  );
};

export default WebWindow;