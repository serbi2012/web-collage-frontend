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
import DrawingCanvas from "../DrawingCanvas";
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

  .resizerLine {
    height: 100%;
    width: 5px;
    background: ${COLORS.MAIN_COLOR};
    cursor: col-resize;
  }

  .fullscreenButton {
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
  const resizerLineRef = useRef(null);
  const sidebarModeOptionRef = useRef(null);
  const selectedSidebarToolRef = useRef(false);
  const socketRef = useRef(null);
  const shareKeyRef = useRef(null);

  const { theme } = useSelector(({ theme }) => theme);
  const { shareKey } = useSelector(({ shareKey }) => shareKey);
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
    shareKeyRef.current = shareKey;
  }, [shareKey]);

  useEffect(() => {
    const resizableElement = resizableElementRef.current;
    const resizerRight = resizerLineRef.current;
    const styles = window.getComputedStyle(resizableElement);
    const webWindow = document.getElementById("webWindow");
    const scrapWindow = document.getElementById("scrapWindowContentBox");
    const editModal = document.getElementById("editModal");
    const drawingCanvas = document.getElementById("drawingCanvas");

    let dragging = false;
    let selectedElement;
    let windowWidth = parseInt(styles.width, 10);
    let windowX = 0;

    const resizeScrapWindowOnMousemove = (event) => {
      const dx = event.clientX - windowX;

      windowX = event.clientX;
      windowWidth = windowWidth + dx;
      resizableElement.style.width = `${windowWidth}px`;
      webWindow.style.width = `calc((100vw - 70px) - ${windowWidth}px)`;
    };

    const resizeScrapWindowOnMouseUp = () => {
      document.removeEventListener("mousemove", resizeScrapWindowOnMousemove);
    };

    const resizeScrapWindowOnClick = (event) => {
      windowX = event.clientX;
      resizableElement.style.left = styles.left;
      resizableElement.style.right = null;

      document.addEventListener("mousemove", resizeScrapWindowOnMousemove);
      document.addEventListener("mouseup", resizeScrapWindowOnMouseUp);
    };

    const highlightOnMouseover = (event) => {
      if (
        event.target === scrapWindow ||
        isMouseOn(editModal) ||
        selectedSidebarToolRef.current === "drawingMode"
      )
        return;

      event.target.classList.add("selectedDom");
    };

    const highlightOnMouseout = (event) => {
      if (
        event.target === scrapWindow ||
        isMouseOn(editModal) ||
        selectedSidebarToolRef.current === "drawingMode"
      )
        return;

      event.target.classList.remove("selectedDom");
    };

    const scrapContentOnMousedown = (event) => {
      if (event.target === scrapWindow || event.target === drawingCanvas)
        return;

      if (selectedSidebarToolRef.current === "selectMode") {
        dragging = true;
        selectedElement = event.target;
        selectedElement.style.position = "absolute";
        selectedElement.style.top = `${event.clientY + 20}px`;
        selectedElement.style.left = `${event.clientX}px`;

        scrapWindow.insertAdjacentElement("beforeend", selectedElement);
      } else if (selectedSidebarToolRef.current === "editMode") {
        dragging = true;
        selectedElement = event.target;
      }
    };

    const scrapContentOnMousemove = (event) => {
      if (!dragging) return;

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

    const scrapContentOnMouseup = (event) => {
      if (!dragging) return;

      dragging = false;

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

      socketRef.current.emit("shareScrapContent", {
        scrapContent: scrapWindow.innerHTML,
        shareKey: shareKeyRef.current,
      });
    };

    const emitSocketContent = () => {
      socketRef.current.emit("shareScrapContent", {
        scrapContent: scrapWindow.innerHTML,
        shareKey: shareKeyRef.current,
      });
    };

    const receiveSocketContent = (data) => {
      if (shareKeyRef.current === "") {
        return;
      } else if (data.shareKey === shareKeyRef.current) {
        scrapWindow.innerHTML = data.scrapContent;
      }
    };

    window.addEventListener("mouseup", emitSocketContent);
    window.addEventListener("keyup", emitSocketContent);

    socketRef.current = io.connect(`${SERVER_ADDRESS}`);
    socketRef.current.on("shareScrapContent", receiveSocketContent);

    resizerRight.addEventListener("mousedown", resizeScrapWindowOnClick);
    scrapWindow.addEventListener("mouseover", highlightOnMouseover);
    scrapWindow.addEventListener("mouseout", highlightOnMouseout);
    scrapWindow.addEventListener("mousedown", scrapContentOnMousedown);
    scrapWindow.addEventListener("mousemove", scrapContentOnMousemove);
    scrapWindow.addEventListener("mouseup", scrapContentOnMouseup);

    return () => {
      resizerRight.removeEventListener("mousedown", resizeScrapWindowOnClick);
      scrapWindow.removeEventListener("mouseover", highlightOnMouseover);
      scrapWindow.removeEventListener("mouseout", highlightOnMouseout);
      scrapWindow.removeEventListener("mousedown", scrapContentOnMousedown);
      scrapWindow.removeEventListener("mousemove", scrapContentOnMousemove);
      scrapWindow.removeEventListener("mouseup", scrapContentOnMouseup);
    };
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
      <DrawingCanvas />
      <div ref={resizerLineRef} className="resizerLine"></div>
      <div
        className="fullscreenButton"
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
