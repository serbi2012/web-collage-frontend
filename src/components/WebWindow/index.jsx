import axios from "axios";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUrlAddress } from "../../redux/reducers/urlAddress";
import { io } from "socket.io-client";
import styled from "styled-components";
import { SERVER_ADDRESS } from "../../../utils/env";
import isMouseOn from "../../../utils/isMouseOn";
import { getCookie, deleteCookie } from "../../../utils/manageCookie";
import manipulateDom from "../../../utils/manipulateDom";
import COLORS from "../../constants/COLORS";
import AddressBarBox from "../AddressBar";

const WebWindowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: calc((100vw - 70px) / 2);
  overflow-y: scroll;
  user-select: none;

  .ratioButton {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 15px;
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

  .scrapModeButton {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 15px;
    right: 15px;
    height: 35px;
    width: 35px;
    background-color: ${COLORS.SUB_COLOR};
    border-radius: 5px;
    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
    user-select: none;
    cursor: pointer;
    z-index: 2000000;

    :hover {
      color: ${COLORS.SUB_COLOR};
      background-color: ${COLORS.MAIN_COLOR};
      opacity: 0.7;
    }

    :active {
      color: ${COLORS.SUB_COLOR};
      background-color: ${COLORS.MAIN_COLOR};
      opacity: 0.5;
    }
  }

  .scrapMode {
    color: ${COLORS.SUB_COLOR};
    background-color: ${COLORS.MAIN_COLOR};
    user-select: none;
    cursor: pointer;
  }

  .selectedDom {
    box-shadow: 0 0 0 2px #ff676775;
    border-radius: 2px;
  }
`;

const WebContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

const WebWindow = () => {
  const blockRef = useRef(null);
  const webWindowRef = useRef(null);
  const isScrapModeRef = useRef(false);
  const socketRef = useRef(null);
  const shareKeyRef = useRef(null);

  const { shareKey } = useSelector(({ shareKey }) => shareKey);
  const { urlAddress } = useSelector(({ urlAddress }) => urlAddress);

  const [webContainerDom, setWebContainerDom] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isAddressBarFold, setIsAddressBarFold] = useState(true);
  const [isScrapMode, setIsScrapMode] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    isScrapModeRef.current = isScrapMode;
  }, [isScrapMode]);

  useEffect(() => {
    shareKeyRef.current = shareKey;
  }, [shareKey]);

  useEffect(() => {
    const webWindow = webWindowRef.current;
    const block = blockRef.current;
    const webWindowContent = document.getElementById("webWindowContent");

    let dragging = false;
    let selectedElement;

    const webWindowContentMouseover = (event) => {
      if (!isScrapModeRef.current) return;

      event.target.classList.add("selectedDom");
    };

    const webWindowContentMouseout = (event) => {
      if (!isScrapModeRef.current) return;

      event.target.classList.remove("selectedDom");
    };

    const webWindowMousedown = (event) => {
      if (!isScrapModeRef.current) return;

      dragging = true;
      selectedElement = event.target;

      block.style.display = "flex";
      block.style.position = "absolute";
      block.style.zIndex = "1000000";

      setSelectedBlock(selectedElement.outerHTML);

      block.style.top = `${event.clientY}px`;
      block.style.left = `${event.clientX}px`;
    };

    const windowMousemove = (event) => {
      if (!isScrapModeRef.current) return;
      if (!dragging) return;

      block.style.top = `${event.clientY}px`;
      block.style.left = `${event.clientX}px`;
    };

    const windowMouseup = (event) => {
      if (!isScrapModeRef.current) return;
      if (!dragging) return;

      const boxes = document.getElementsByClassName("BoxComponent");
      const scrapWindow = document.getElementById("scrapWindowContentBox");
      const copiedBox = boxes[0].cloneNode(false);

      dragging = false;

      block.style.top = `${event.clientY}px`;
      block.style.left = `${event.clientX}px`;

      for (let i = 0; i < boxes.length; i++) {
        if (isMouseOn(boxes[i])) {
          selectedElement.style.position = "relative";
          selectedElement.style.removeProperty("top");
          selectedElement.style.removeProperty("left");
          boxes[i].insertAdjacentElement(
            "beforeend",
            selectedElement.cloneNode(true)
          );

          block.style.display = "none";

          socketRef.current.emit("shareScrapContent", {
            scrapContent: scrapWindow.innerHTML,
            shareKey: shareKeyRef.current,
          });

          return;
        }
      }

      if (webWindow.getBoundingClientRect().left > event.clientX) {
        selectedElement.style.position = "relative";
        selectedElement.style.removeProperty("top");
        selectedElement.style.removeProperty("left");
        copiedBox.insertAdjacentElement(
          "beforeend",
          selectedElement.cloneNode(true)
        );

        scrapWindow.insertAdjacentElement("beforeend", copiedBox);
      }

      block.style.display = "none";

      socketRef.current.emit("shareScrapContent", {
        scrapContent: scrapWindow.innerHTML,
        shareKey: shareKeyRef.current,
      });
    };

    socketRef.current = io.connect(`${SERVER_ADDRESS}`);

    webWindowContent.addEventListener("mouseover", webWindowContentMouseover);
    webWindowContent.addEventListener("mouseout", webWindowContentMouseout);
    webWindow.addEventListener("mousedown", webWindowMousedown);
    window.addEventListener("mousemove", windowMousemove);
    window.addEventListener("mouseup", windowMouseup);

    (async () => {
      let url;

      if (getCookie("shareModeKey")) {
        const scrapContent = await axios.get(
          `${SERVER_ADDRESS}/scrapContent/${getCookie("shareModeKey")}/`
        );

        url = scrapContent.data.scrapContent.urlAddress;
      } else {
        url =
          getCookie("urlAddress") ||
          urlAddress ||
          "https://illuminating-extol-innovation.w3spaces.com/";
      }

      const sourceDomain = url.slice(`https://`.length).split("/").shift();
      const { data } = await axios.get(url);
      const htmlString = manipulateDom(data, sourceDomain);

      dispatch(setUrlAddress(url));

      if (getCookie("urlAddress")) {
        deleteCookie("urlAddress");
      }

      setWebContainerDom(htmlString);
    })();

    return () => {
      webWindowContent.removeEventListener(
        "mouseover",
        webWindowContentMouseover
      );
      webWindowContent.removeEventListener(
        "mouseout",
        webWindowContentMouseout
      );
      webWindow.removeEventListener("mousedown", webWindowMousedown);
      window.removeEventListener("mousemove", windowMousemove);
      window.removeEventListener("mouseup", windowMouseup);
    };
  }, [urlAddress]);

  return (
    <WebWindowContainer id="webWindow" ref={webWindowRef}>
      <div
        id="selectedBlock"
        ref={blockRef}
        style={{ position: "absolute" }}
        dangerouslySetInnerHTML={{ __html: selectedBlock }}
      />
      <AddressBarBox
        isAddressBarFold={isAddressBarFold}
        setIsAddressBarFold={setIsAddressBarFold}
        setWebContainerDom={setWebContainerDom}
      />
      <div
        className={`scrapModeButton ${isScrapMode && "scrapMode"}`}
        onClick={() => {
          setIsScrapMode(!isScrapMode);
        }}
      >
        <span className="material-symbols-outlined">file_copy</span>
      </div>
      <WebContainer
        id="webWindowContent"
        dangerouslySetInnerHTML={{ __html: webContainerDom }}
      />
    </WebWindowContainer>
  );
};

export default WebWindow;
