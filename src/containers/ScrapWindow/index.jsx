import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import Block from "../Block";
import Box from "../Box";

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
    border: 2px solid #ff6767;
    border-radius: 2px;
  }
`;

const ScrapWindow = () => {
  const resizableElementRef = useRef(null);
  const rightResizerRef = useRef(null);
  const selectModeOptionRef = useRef(null);

  const { blocks } = useSelector(({ blocks }) => blocks);
  const { selectModeOption } = useSelector(
    ({ selectModeOption }) => selectModeOption
  );

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

    let width = parseInt(styles.width, 10);
    let x = 0;

    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;

      x = event.clientX;
      width = width + dx;
      resizableElement.style.width = `${width}px`;
      webWindow.style.width = `calc((100vw - 70px) - ${width}px)`;
    };

    const onMouseUpRightResize = () => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      x = event.clientX;
      resizableElement.style.left = styles.left;
      resizableElement.style.right = null;

      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    const scrapWindowContentMouseover = (event) => {
      if (selectModeOptionRef.current !== "BoxAndBlockMode") return;

      event.target.classList.add("selectedDom");
    };

    const scrapWindowContentMouseout = (event) => {
      if (selectModeOptionRef.current !== "BoxAndBlockMode") return;

      event.target.classList.remove("selectedDom");
    };

    resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    scrapWindow.addEventListener("mouseover", scrapWindowContentMouseover);
    scrapWindow.addEventListener("mouseout", scrapWindowContentMouseout);
  }, []);

  return (
    <ScrapWindowContainer ref={resizableElementRef} className="resizable">
      <div id="scrapWindowContentBox" className="contentBox">
        <Box
          content={[
            <div>
              {blocks.map((value, index) => {
                return <Block html={value} key={index} />;
              })}
            </div>,
          ]}
        />
      </div>
      <div ref={rightResizerRef} className="resizer-r"></div>
      <div
        className="ScrapWindow-fullscreen"
        onClick={() => {
          const webWindow = document.getElementById("webWindow");

          if (isFullScreen) {
            webWindow.style.display = "flex";
            ref.current.style.width = `calc((100vw - 70px) / 2)`;
            webWindow.style.width = `calc((100vw - 70px) / 2)`;
          } else {
            webWindow.style.display = "none";
            ref.current.style.width = `calc((100vw - 70px)`;
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
