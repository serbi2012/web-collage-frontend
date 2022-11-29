import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  drawPen,
  drawHighlighter,
  drawEraser,
  drawPenWithEmit,
  drawHighlighterWithEmit,
  drawEraserWithEmit,
} from "../../../utils/drawLine";
import isMouseOn from "../../../utils/isMouseOn";
import { SERVER_ADDRESS } from "../../../utils/env";

const DrawingCanvasContainer = styled.div`
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
    z-index: 10000;
  }
`;

const DrawingCanvas = () => {
  const selectedSidebarToolRef = useRef(false);
  const sidebarModeOptionRef = useRef(null);
  const canvasRef = useRef(null);
  const lineOpacityRef = useRef(null);
  const lineWidthRef = useRef(null);
  const lineColorRef = useRef(null);
  const socketRef = useRef(null);
  const shareKeyRef = useRef(null);

  const { shareKey } = useSelector(({ shareKey }) => shareKey);
  const { lineColor, lineWidth, lineOpacity } = useSelector(
    ({ lineStyle }) => lineStyle
  );
  const { selectedSidebarTool } = useSelector(
    ({ selectedSidebarTool }) => selectedSidebarTool
  );

  const { sidebarModeOption } = useSelector(
    ({ sidebarModeOption }) => sidebarModeOption
  );

  useEffect(() => {
    shareKeyRef.current = shareKey;
  }, [shareKey]);

  useEffect(() => {
    selectedSidebarToolRef.current = selectedSidebarTool;
  }, [selectedSidebarTool]);

  useEffect(() => {
    sidebarModeOptionRef.current = sidebarModeOption;
  }, [sidebarModeOption]);

  useEffect(() => {
    lineOpacityRef.current = lineOpacity;
  }, [lineOpacity]);

  useEffect(() => {
    lineWidthRef.current = lineWidth;
  }, [lineWidth]);

  useEffect(() => {
    lineColorRef.current = lineColor;
  }, [lineColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const scrapWindow = document.getElementById("scrapWindowContentBox");
    const sidebar = document.getElementById("sidebar");
    const drawingModeModal = document.getElementById("drawingModeModal");

    let isDrawing = false;
    let highlighterEndPosition;
    let startPosition;

    const onClick = (event) => {
      if (
        selectedSidebarToolRef.current !== "drawingMode" ||
        isMouseOn(sidebar) ||
        isMouseOn(drawingModeModal)
      )
        return;

      isDrawing = true;
      startPosition = [event.clientX, event.clientY];
      highlighterEndPosition = event.clientY;
    };

    const onMouseMove = (event) => {
      if (!isDrawing) {
        return;
      }

      if (sidebarModeOptionRef.current === "pen") {
        drawPenWithEmit(
          context,
          startPosition,
          [event.clientX, event.clientY],
          lineColorRef.current,
          lineWidthRef.current,
          socketRef,
          canvas
        );

        startPosition = [event.clientX, event.clientY];
      } else if (sidebarModeOptionRef.current === "highlighter") {
        drawHighlighterWithEmit(
          context,
          startPosition,
          [event.clientX, highlighterEndPosition],
          lineColorRef.current,
          lineWidthRef.current,
          lineOpacityRef.current,
          socketRef,
          canvas
        );

        startPosition = [event.clientX, startPosition[1]];
      } else if (sidebarModeOptionRef.current === "eraser") {
        drawEraserWithEmit(
          context,
          startPosition,
          [event.clientX, event.clientY],
          lineWidthRef.current,
          socketRef,
          canvas
        );

        startPosition = [event.clientX, event.clientY];
      }
    };

    const onMouseUp = (event) => {
      if (!isDrawing) {
        return;
      }

      isDrawing = false;

      if (sidebarModeOptionRef.current === "pen") {
        drawPenWithEmit(
          context,
          startPosition,
          [event.clientX, event.clientY],
          lineColorRef.current,
          lineWidthRef.current,
          socketRef,
          canvas
        );
      } else if (sidebarModeOptionRef.current === "highlighter") {
        drawHighlighterWithEmit(
          context,
          startPosition,
          [event.clientX, highlighterEndPosition],
          lineColorRef.current,
          lineWidthRef.current,
          socketRef,
          canvas
        );
      } else if (sidebarModeOptionRef.current === "eraser") {
        drawEraserWithEmit(
          context,
          startPosition,
          [event.clientX, event.clientY],
          lineWidthRef.current,
          socketRef,
          canvas
        );
      }
    };

    window.addEventListener("mousedown", onClick, false);
    window.addEventListener("mouseup", onMouseUp, false);
    window.addEventListener("mouseout", onMouseUp, false);
    window.addEventListener("mousemove", onMouseMove, false);

    const onResize = () => {
      canvas.width = scrapWindow.offsetWidth + 70;
      canvas.height = scrapWindow.offsetHeight;
    };

    scrapWindow.addEventListener("change", onResize, false);
    onResize();

    const onDrawingEvent = (data) => {
      if (data.startPosition) {
        if (data.type === "pen") {
          drawPen(
            context,
            [
              data.startPosition[0] * canvas.width,
              data.startPosition[1] * canvas.height,
            ],
            [
              data.endPosition[0] * canvas.width,
              data.endPosition[1] * canvas.height,
            ],
            data.color,
            data.width
          );
        } else if (data.type === "highlighter") {
          drawHighlighter(
            context,
            [
              data.startPosition[0] * canvas.width,
              data.startPosition[1] * canvas.height,
            ],
            [
              data.endPosition[0] * canvas.width,
              data.endPosition[1] * canvas.height,
            ],
            data.color,
            data.width,
            data.opacity
          );
        } else if (data.type === "eraser") {
          drawEraser(
            context,
            [
              data.startPosition[0] * canvas.width,
              data.startPosition[1] * canvas.height,
            ],
            [
              data.endPosition[0] * canvas.width,
              data.endPosition[1] * canvas.height,
            ],
            data.width
          );
        }
      }
    };

    socketRef.current = io.connect(`${SERVER_ADDRESS}`);
    socketRef.current.on("shareScrapContent", onDrawingEvent);
  }, []);

  return (
    <DrawingCanvasContainer>
      <canvas
        ref={canvasRef}
        id="drawingCanvas"
        style={{
          pointerEvents: selectedSidebarTool !== "drawingMode" && "none",
        }}
      />
    </DrawingCanvasContainer>
  );
};

export default DrawingCanvas;
