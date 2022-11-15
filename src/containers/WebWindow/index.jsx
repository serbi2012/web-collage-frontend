import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import deleteCookie from "../../../utils/deleteCookie";
import getCookie from "../../../utils/getCookie";
import COLORS from "../../constants/COLORS";
import { addBlocks } from "../../redux/reducers/blocks";
import { setUrlAddress } from "../../redux/reducers/urlAddress";
import Block from "../Block";

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
    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.2);
    transition: all 0.4s ease-in-out;
    z-index: 2000000;

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
      box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.2);
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
    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.2);
    z-index: 2000000;

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

  .selectedDom {
    border: 2px solid #ff6767;
    border-radius: 2px;
  }
`;

const BodyContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

const WebWindow = () => {
  const { urlAddress } = useSelector(({ urlAddress }) => urlAddress);

  const [iframeDom, setIframeDom] = useState(null);
  const [isAddressBarFold, setIsAddressBarFold] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const webWindow = document.getElementById("webWindowContent");

    webWindow.addEventListener("mouseover", (event) => {
      event.target.classList.add("selectedDom");
    });

    webWindow.addEventListener("mouseout", (event) => {
      event.target.classList.remove("selectedDom");
    });

    webWindow.addEventListener("mousedown", (event) => {
      const selectedElement = event.target;

      dispatch(addBlocks(selectedElement.outerHTML));
    });

    (async () => {
      const url = getCookie("urlAddress") || urlAddress;

      const { data } = await axios.get(url);

      dispatch(setUrlAddress(url));

      if (getCookie("urlAddress")) {
        deleteCookie("urlAddress");
      }

      setIframeDom(data);
    })();
  }, []);

  return (
    <WebWindowContainer id="webWindow">
      <div
        className="WebWindow-addressBarBox"
        style={{
          transform: isAddressBarFold ? "translateY(-70px)" : "translateY(0px)",
        }}
      >
        <input
          defaultValue={
            getCookie("urlAddress") ||
            urlAddress ||
            "https://eye-catch-danke-foresight.w3spaces.com"
          }
          onChange={(event) => {
            dispatch(setUrlAddress(event.target.value));
          }}
        />
        <span
          className="material-symbols-outlined WebWindow-changeUrlButton"
          onClick={async () => {
            const { data } = await axios.get(urlAddress);

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
              ? "translateY(25px)"
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
      <BodyContainer
        id="webWindowContent"
        dangerouslySetInnerHTML={{ __html: iframeDom }}
      />
    </WebWindowContainer>
  );
};

export default WebWindow;
