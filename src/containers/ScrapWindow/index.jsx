import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { SERVER_ADDRESS } from "../../../utils/env";
import hasClass from "../../../utils/hasClass";
import isMouseOn from "../../../utils/isMouseOn";
import COLORS from "../../constants/COLORS";
import THEME from "../../constants/THEME";
import Drawing from "../Drawing";
import EditModal from "../EditModeModal";
import io from "socket.io-client";

const ScrapWindowContainer = styled.div`
  display: flex;
  width: calc((100vw - 70px) / 2);
  height: 100vh;
  border-radius: 3px;

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
    box-shadow: 0 0 0 2px #ff676775 !important;
    border-radius: 2px;
  }

  .theme-dark {
    color: ${THEME.DARK.FONT_COLOR} !important;
    background-color: ${THEME.DARK.BACKGROUND_COLOR}!important;
  }

  .theme-blue {
    color: ${THEME.BLUE.FONT_COLOR} !important;
    background-color: ${THEME.BLUE.BACKGROUND_COLOR} !important;
  }

  .theme-brown {
    color: ${THEME.BROWN.FONT_COLOR} !important;
    background-color: ${THEME.BROWN.BACKGROUND_COLOR} !important;
  }

  .theme-skyblue {
    color: ${THEME.SKY_BLUE.FONT_COLOR} !important;
    background-color: ${THEME.SKY_BLUE.BACKGROUND_COLOR} !important;
  }

  .theme-green {
    color: ${THEME.GREEN.FONT_COLOR} !important;
    background-color: ${THEME.GREEN.BACKGROUND_COLOR} !important;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin: 5px 0;
  padding: 10px;
  width: 500px;
  box-shadow: 0 0 0 2px #ccc;
`;

const ScrapWindow = () => {
  const resizableElementRef = useRef(null);
  const rightResizerRef = useRef(null);
  const sidebarModeOptionRef = useRef(null);
  const selectedSidebarToolRef = useRef(false);
  const socketRef = useRef(null);

  const { theme } = useSelector(({ theme }) => theme);
  const { sidebarModeOption } = useSelector(
    ({ sidebarModeOption }) => sidebarModeOption
  );

  const { selectedSidebarTool } = useSelector(
    ({ selectedSidebarTool }) => selectedSidebarTool
  );

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    sidebarModeOptionRef.current = sidebarModeOption;
  }, [sidebarModeOption]);

  useEffect(() => {
    selectedSidebarToolRef.current = selectedSidebarTool;
  }, [selectedSidebarTool]);

  useEffect(() => {
    const resizableElement = resizableElementRef.current;
    const resizerRight = rightResizerRef.current;
    const styles = window.getComputedStyle(resizableElement);
    const webWindow = document.getElementById("webWindow");
    const scrapWindow = document.getElementById("scrapWindowContentBox");
    const editModal = document.getElementById("editModal");
    const drawingCanvas = document.getElementById("drawingCanvas");

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

    const onClickRightResize = (event) => {
      windowX = event.clientX;
      resizableElement.style.left = styles.left;
      resizableElement.style.right = null;

      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    const scrapWindowContentMouseover = (event) => {
      if (
        event.target === scrapWindow ||
        isMouseOn(editModal) ||
        selectedSidebarToolRef.current === "drawingMode"
      )
        return;

      event.target.classList.add("selectedDom");
    };

    const scrapWindowContentMouseout = (event) => {
      if (
        event.target === scrapWindow ||
        isMouseOn(editModal) ||
        selectedSidebarToolRef.current === "drawingMode"
      )
        return;

      event.target.classList.remove("selectedDom");
    };

    const scrapWindowMousedown = (event) => {
      if (event.target === scrapWindow || event.target === drawingCanvas)
        return;

      isDrag = true;
      selectedElement = event.target;

      if (selectedSidebarToolRef.current === "selectMode") {
        selectedElement.style.position = "absolute";
        selectedElement.style.top = `${event.clientY + 20}px`;
        selectedElement.style.left = `${event.clientX}px`;

        scrapWindow.insertAdjacentElement("beforeend", selectedElement);
      }
    };

    const scrapWindowMousemove = (event) => {
      if (!isDrag) return;

      if (selectedSidebarToolRef.current === "selectMode") {
        selectedElement.style.top = `${event.clientY + 20}px`;
        selectedElement.style.left = `${event.clientX}px`;
      } else if (selectedSidebarToolRef.current === "editMode") {
        if (
          selectedElement?.tagName === "IMG" ||
          selectedElement?.tagName === "VIDEO"
        ) {
          selectedElement.style.width = `${
            event.clientX - selectedElement.getBoundingClientRect().left
          }px`;
        }
      }
    };

    const scrapWindowMouseup = (event) => {
      if (!isDrag) return;

      isDrag = false;

      if (selectedSidebarToolRef.current === "selectMode") {
        const boxes = document.getElementsByClassName("BoxComponent");
        const copiedBox = boxes[0].cloneNode(false);

        selectedElement.style.top = `${event.clientY + 20}px`;
        selectedElement.style.left = `${event.clientX}px`;

        if (sidebarModeOptionRef.current === "BoxAndBlockMode") {
          selectedElement.style.position = "relative";
          selectedElement.style.removeProperty("top");
          selectedElement.style.removeProperty("left");

          if (event.target === scrapWindow) {
            if (hasClass(selectedElement, "BoxComponent")) {
              scrapWindow.insertAdjacentElement("beforeend", selectedElement);
            } else {
              copiedBox.insertAdjacentElement("beforeend", selectedElement);
              scrapWindow.insertAdjacentElement("beforeend", copiedBox);
            }
          } else {
            event.target.insertAdjacentElement("beforeend", selectedElement);
          }
        }
      }

      selectedElement = null;

      socketRef.current.emit("user-send", scrapWindow.innerHTML);
    };

    window.addEventListener("mouseup", () => {
      socketRef.current.emit("user-send", scrapWindow.innerHTML);
    });

    window.addEventListener("keyup", () => {
      socketRef.current.emit("user-send", scrapWindow.innerHTML);
    });

    socketRef.current = io.connect(`${SERVER_ADDRESS}`);
    socketRef.current.on("user-send", (data) => {
      scrapWindow.innerHTML = data;
    });

    resizerRight.addEventListener("mousedown", onClickRightResize);
    scrapWindow.addEventListener("mouseover", scrapWindowContentMouseover);
    scrapWindow.addEventListener("mouseout", scrapWindowContentMouseout);
    scrapWindow.addEventListener("mousedown", scrapWindowMousedown);
    scrapWindow.addEventListener("mousemove", scrapWindowMousemove);
    scrapWindow.addEventListener("mouseup", scrapWindowMouseup);
  }, []);

  return (
    <ScrapWindowContainer ref={resizableElementRef} className="resizable">
      <div
        contentEditable={selectedSidebarTool === "editMode"}
        suppressContentEditableWarning={true}
        style={{
          userSelect: selectedSidebarTool === "selectMode" && "none",
        }}
        id="scrapWindowContentBox"
        className={`contentBox ${theme}`}
      >
        <Box className="BoxComponent"></Box>
      </div>
      <EditModal />
      <Drawing />
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
