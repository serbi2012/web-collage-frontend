import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import Block from "../Block";

const ScrapWindowContainer = styled.div`
  display: flex;
  width: calc((100vw - 70px) / 2);
  height: 100vh;
  border-radius: 3px;
  user-select: none;

  .contentBox {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding: 100px;
    width: 100%;
    overflow-y: scroll;
  }

  .resizer-r {
    height: 100%;
    width: 5px;
    background: ${COLORS.MAIN_COLOR};
    cursor: col-resize;
  }

  .ScrapWindow-fullscreen {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 10px;
    left: 83px;
    user-select: none;
    cursor: pointer;

    span {
      font-size: 30px;
      transition: all 0.4s ease-in-out;

      :hover {
        font-size: 35px;
      }
    }
  }

  .selectedDom {
    border: 2px solid #ff6767;
    border-radius: 2px;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  width: 500px;
  border: 2px solid #ccc;
`;

const ScrapWindow = () => {
  const resizableElementRef = useRef(null);
  const rightResizerRef = useRef(null);
  const selectModeOptionRef = useRef(null);

  const { blocks } = useSelector(({ blocks }) => blocks);
  const { selectModeOption } = useSelector(
    ({ selectModeOption }) => selectModeOption
  );

  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    selectModeOptionRef.current = selectModeOption;
  }, [selectModeOption]);

  useEffect(() => {
    const resizableElement = resizableElementRef.current;
    const resizerRight = rightResizerRef.current;
    const styles = window.getComputedStyle(resizableElement);
    const webWindow = document.getElementById("webWindow");
    const scrapWindow = document.getElementById("scrapWindowContentBox");

    let isDrag = false;
    let selectedElement;
    let windowWidth = parseInt(styles.width, 10);
    let windowX = 0;

    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - windowX;

      windowX = event.clientX;
      windowWidth = windowWidth + dx;
      resizableElement.style.width = `${windowWidth}px`;
      webWindow.style.width = `calc((100vw - 70px) - ${windowWidth}px)`;
    };

    const onMouseUpRightResize = () => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      windowX = event.clientX;
      resizableElement.style.left = styles.left;
      resizableElement.style.right = null;

      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    const scrapWindowContentMouseover = (event) => {
      event.target.classList.add("selectedDom");
    };

    const scrapWindowContentMouseout = (event) => {
      event.target.classList.remove("selectedDom");
    };

    const scrapWindowMousedown = (event) => {
      isDrag = true;
      selectedElement = event.target;

      selectedElement.style.position = "absolute";
      selectedElement.style.top = `${event.target.offsetTop}px`;
      selectedElement.style.left = `${event.target.offsetLeft}px`;
      if (selectModeOptionRef.current === "BoxAndBlockMode") {
      } else {
      }
    };

    const scrapWindowMousemove = (event) => {
      if (!isDrag) return;

      selectedElement.style.top = `${event.clientY}px`;
      selectedElement.style.left = `${event.clientX}px`;
      if (selectModeOptionRef.current === "BoxAndBlockMode") {
      } else {
      }
    };

    const scrapWindowMouseup = (event) => {
      if (!isDrag) return;

      isDrag = false;

      const boxes = document.getElementsByClassName("BoxComponent");

      if (selectModeOptionRef.current === "BoxAndBlockMode") {
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
            boxes[i].insertAdjacentElement("beforeend", selectedElement);

            break;
          }
        }
      } else {
        selectedElement.style.top = `${event.clientY}px`;
        selectedElement.style.left = `${event.clientX}px`;
      }
    };

    resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    scrapWindow.addEventListener("mouseover", scrapWindowContentMouseover);
    scrapWindow.addEventListener("mouseout", scrapWindowContentMouseout);
    scrapWindow.addEventListener("mousedown", scrapWindowMousedown);
    scrapWindow.addEventListener("mousemove", scrapWindowMousemove);
    scrapWindow.addEventListener("mouseup", scrapWindowMouseup);
  }, []);

  return (
    <ScrapWindowContainer ref={resizableElementRef} className="resizable">
      <div id="scrapWindowContentBox" className="contentBox">
        <Box className="BoxComponent"></Box>
        <Box className="BoxComponent">
          {blocks.map((value, index) => {
            return <Block html={value} key={index} />;
          })}
        </Box>
      </div>
      <div ref={rightResizerRef} className="resizer-r"></div>
      <div
        className="ScrapWindow-fullscreen"
        onClick={() => {
          const webWindow = document.getElementById("webWindow");

          if (isFullScreen) {
            webWindow.style.display = "flex";
            resizableElementRef.current.style.width = `calc((100vw - 70px) / 2)`;
            webWindow.style.width = `calc((100vw - 70px) / 2)`;
          } else {
            webWindow.style.display = "none";
            resizableElementRef.current.style.width = `calc((100vw - 70px)`;
            webWindow.style.width = `0px`;
          }

          setIsFullScreen(!isFullScreen);
        }}
      >
        <span className="material-symbols-outlined">fullscreen</span>
      </div>
    </ScrapWindowContainer>
  );
};

export default ScrapWindow;
