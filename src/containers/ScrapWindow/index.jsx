import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import hasClass from "../../../utils/hasClass";
import isMouseOn from "../../../utils/isMouseOn";
import COLORS from "../../constants/COLORS";
import EditModal from "../EditModeModal";

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
    box-shadow: 0 0 0 2px #ff676775;
    border-radius: 2px;
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
  border: 2px solid #ccc;
`;

const ScrapWindow = () => {
  const resizableElementRef = useRef(null);
  const rightResizerRef = useRef(null);
  const sidebarModeOptionRef = useRef(null);
  const selectedSidebarToolRef = useRef(false);

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
      if (event.target === scrapWindow || isMouseOn(editModal)) return;

      event.target.classList.add("selectedDom");
    };

    const scrapWindowContentMouseout = (event) => {
      if (event.target === scrapWindow || isMouseOn(editModal)) return;

      event.target.classList.remove("selectedDom");
    };

    const scrapWindowMousedown = (event) => {
      if (event.target === scrapWindow) return;

      selectedElement = event.target;
      isDrag = true;

      if (selectedSidebarToolRef.current === "selectMode") {
        selectedElement.style.position = "absolute";
        selectedElement.style.top = `${event.clientY}px`;
        selectedElement.style.left = `${event.clientX}px`;
      } else if (selectedSidebarToolRef.current === "editMode") {
      }
    };

    const scrapWindowMousemove = (event) => {
      if (selectedSidebarToolRef.current === "selectMode") {
        if (!isDrag) return;

        selectedElement.style.top = `${event.clientY}px`;
        selectedElement.style.left = `${event.clientX}px`;
      } else if (selectedSidebarToolRef.current === "editMode") {
        if (
          selectedElement.tagName === "IMG" ||
          selectedElement.tagName === "VIDEO"
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

        selectedElement.style.top = `${event.clientY}px`;
        selectedElement.style.left = `${event.clientX}px`;

        if (sidebarModeOptionRef.current === "BoxAndBlockMode") {
          for (let i = 0; i < boxes.length; i++) {
            if (isMouseOn(boxes[i])) {
              selectedElement.style.position = "relative";
              selectedElement.style.removeProperty("top");
              selectedElement.style.removeProperty("left");
              boxes[i].insertAdjacentElement("beforeend", selectedElement);

              return;
            }
          }

          if (hasClass(selectedElement, "BoxComponent")) {
            scrapWindow.insertAdjacentElement("beforeend", selectedElement);
          } else {
            copiedBox.insertAdjacentElement("beforeend", selectedElement);
            scrapWindow.insertAdjacentElement("beforeend", copiedBox);
          }

          selectedElement.style.position = "relative";
          selectedElement.style.removeProperty("top");
          selectedElement.style.removeProperty("left");
        }
      } else if (selectedSidebarToolRef.current === "editMode") {
      }

      selectedElement = null;
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
      <div
        contentEditable={selectedSidebarToolRef.current === "editMode"}
        suppressContentEditableWarning={true}
        id="scrapWindowContentBox"
        className="contentBox"
      >
        <Box className="BoxComponent"></Box>
        <EditModal />
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
