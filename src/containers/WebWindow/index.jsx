import axios from "axios";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import deleteCookie from "../../../utils/deleteCookie";
import getCookie from "../../../utils/getCookie";
import COLORS from "../../constants/COLORS";
import { addBlocks } from "../../redux/reducers/blocks";
import { setUrlAddress } from "../../redux/reducers/urlAddress";
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

  .WebWindow-ratioButton {
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

  .WebWindow-scrapModeButton {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 55px;
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

  .WebWindow-scrapMode {
    color: ${COLORS.SUB_COLOR};
    background-color: ${COLORS.MAIN_COLOR};
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
  const blockRef = useRef(null);
  const webWindowRef = useRef(null);
  const isScrapModeRef = useRef(false);

  const { urlAddress } = useSelector(({ urlAddress }) => urlAddress);

  const [iframeDom, setIframeDom] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isAddressBarFold, setIsAddressBarFold] = useState(true);
  const [isScrapMode, setIsScrapMode] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    isScrapModeRef.current = isScrapMode;
  }, [isScrapMode]);

  useEffect(() => {
    const webWindow = webWindowRef.current;
    const block = blockRef.current;
    const webWindowContent = document.getElementById("webWindowContent");

    let isDrag = false;
    let selectedElement;
    let positionX = 0;
    let positionY = 0;

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

      isDrag = true;
      block.style.display = "flex";
      selectedElement = event.target;

      setSelectedBlock(selectedElement.outerHTML);

      positionY = event.target.offsetTop;
      positionX = event.target.offsetLeft;
      block.style.top = `${positionY}px`;
      block.style.left = `${positionX}px`;
    };

    const windowMousemove = (event) => {
      if (!isScrapModeRef.current) return;
      if (!isDrag) return;

      block.style.top = `${event.clientY}px`;
      block.style.left = `${event.clientX}px`;
    };

    const windowMouseup = (event) => {
      if (!isScrapModeRef.current) return;
      if (!isDrag) return;

      const boxes = document.getElementsByClassName("BoxComponent");
      const scrapWindow = document.getElementById("scrapWindowContentBox");
      const copiedBox = boxes[0].cloneNode(false);

      isDrag = false;
      block.style.top = `${event.clientY}px`;
      block.style.left = `${event.clientX}px`;

      for (let i = 0; i < boxes.length; i++) {
        if (
          boxes[i].getBoundingClientRect().top < event.clientY &&
          boxes[i].getBoundingClientRect().bottom > event.clientY &&
          boxes[i].getBoundingClientRect().left < event.clientX &&
          boxes[i].getBoundingClientRect().right > event.clientX
        ) {
          selectedElement.style.position = "relative";
          selectedElement.style.removeProperty("top");
          selectedElement.style.removeProperty("left");
          boxes[i].insertAdjacentElement(
            "beforeend",
            selectedElement.cloneNode(true)
          );

          block.style.display = "none";
          return;
        }
      }

      selectedElement.style.position = "relative";
      selectedElement.style.removeProperty("top");
      selectedElement.style.removeProperty("left");
      copiedBox.insertAdjacentElement(
        "beforeend",
        selectedElement.cloneNode(true)
      );

      scrapWindow.insertAdjacentElement("beforeend", copiedBox);

      block.style.display = "none";
    };

    webWindowContent.addEventListener("mouseover", webWindowContentMouseover);
    webWindowContent.addEventListener("mouseout", webWindowContentMouseout);
    webWindow.addEventListener("mousedown", webWindowMousedown);
    window.addEventListener("mousemove", windowMousemove);
    window.addEventListener("mouseup", windowMouseup);

    (async () => {
      const url =
        getCookie("urlAddress") ||
        urlAddress ||
        "https://illuminating-extol-innovation.w3spaces.com/";

      const { data } = await axios.get(url);

      dispatch(setUrlAddress(url));

      if (getCookie("urlAddress")) {
        deleteCookie("urlAddress");
      }

      setIframeDom(data);
    })();
  }, []);

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
        setIframeDom={setIframeDom}
      />
      <div
        className={`WebWindow-scrapModeButton ${
          isScrapMode && "WebWindow-scrapMode"
        }`}
        onClick={() => {
          setIsScrapMode(!isScrapMode);
        }}
      >
        <span className="material-symbols-outlined">file_copy</span>
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
