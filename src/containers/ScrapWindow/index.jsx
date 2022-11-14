import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";

const ScrapWindowContainer = styled.div`
  display: flex;
  width: calc((100vw - 70px) / 2);
  height: 100vh;
  border-radius: 3px;

  .contentBox {
    width: 100%;
  }

  .resizer-r {
    height: 100%;
    width: 5px;
    background: ${COLORS.MAIN_COLOR};
    cursor: col-resize;
  }
`;

const ScrapWindow = () => {
  const ref = useRef(null);
  const refRight = useRef(null);

  useEffect(() => {
    const resizableEle = ref.current;
    const styles = window.getComputedStyle(resizableEle);
    const webWindow = document.getElementById("webWindow");

    let width = parseInt(styles.width, 10);
    let x = 0;

    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      resizableEle.style.width = `${width}px`;
      webWindow.style.width = `calc((100vw - 70px) - ${width}px)`;
    };

    const onMouseUpRightResize = () => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      x = event.clientX;
      resizableEle.style.left = styles.left;
      resizableEle.style.right = null;

      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    const resizerRight = refRight.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);

    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
    };
  }, []);

  return (
    <ScrapWindowContainer ref={ref} className="resizable">
      <div className="contentBox"></div>
      <div ref={refRight} className="resizer-r"></div>
    </ScrapWindowContainer>
  );
};

export default ScrapWindow;
