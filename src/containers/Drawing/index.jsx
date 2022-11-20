import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  drawLineWithPen,
  drawLineWithHighlighter,
  drawLineWithEraser,
} from "../../../utils/drawLine";
import isMouseOn from "../../../utils/isMouseOn";

const DrawingContainer = styled.div`
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
  }
`;

const Drawing = () => {
  const selectedSidebarToolRef = useRef(false);
  const sidebarModeOptionRef = useRef(null);
  const canvasRef = useRef(null);
  const lineOpacityRef = useRef(null);
  const lineWidthRef = useRef(null);
  const lineColorRef = useRef(null);

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

    let drawing = false;
    let highlighterEndPosition;
    let startPosition;

    const onMouseDown = (event) => {
      if (
        selectedSidebarToolRef.current !== "drawingMode" ||
        isMouseOn(sidebar) ||
        isMouseOn(drawingModeModal)
      )
        return;

      drawing = true;
      startPosition = [event.clientX, event.clientY];
      highlighterEndPosition = event.clientY;
    };

    const onMouseMove = (event) => {
      if (!drawing) {
        return;
      }

      if (sidebarModeOptionRef.current === "Pen") {
        drawLineWithPen(
          context,
          startPosition,
          [event.clientX, event.clientY],
          lineColorRef.current,
          lineWidthRef.current
        );

        startPosition = [event.clientX, event.clientY];
      } else if (sidebarModeOptionRef.current === "Highlighter") {
        drawLineWithHighlighter(
          context,
          startPosition,
          [event.clientX, highlighterEndPosition],
          lineColorRef.current,
          lineWidthRef.current,
          lineOpacityRef.current
        );

        startPosition = [event.clientX, startPosition[1]];
      } else if (sidebarModeOptionRef.current === "Eraser") {
        drawLineWithEraser(
          context,
          startPosition,
          [event.clientX, event.clientY],
          lineColorRef.current,
          lineWidthRef.current
        );

        startPosition = [event.clientX, event.clientY];
      }
    };

    const onMouseUp = (event) => {
      if (!drawing) {
        return;
      }

      drawing = false;

      if (sidebarModeOptionRef.current === "Pen") {
        drawLineWithPen(
          context,
          startPosition,
          [event.clientX, event.clientY],
          lineColorRef.current,
          lineWidthRef.current
        );
      } else if (sidebarModeOptionRef.current === "Highlighter") {
        drawLineWithHighlighter(
          context,
          startPosition,
          [event.clientX, highlighterEndPosition],
          lineColorRef.current,
          lineWidthRef.current
        );
      } else if (sidebarModeOptionRef.current === "Eraser") {
        drawLineWithEraser(
          context,
          startPosition,
          [event.clientX, event.clientY],
          lineColorRef.current,
          lineWidthRef.current
        );
      }
    };

    window.addEventListener("mousedown", onMouseDown, false);
    window.addEventListener("mouseup", onMouseUp, false);
    window.addEventListener("mouseout", onMouseUp, false);
    window.addEventListener("mousemove", onMouseMove, false);

    const onResize = () => {
      canvas.width = scrapWindow.offsetWidth + 70;
      canvas.height = scrapWindow.offsetHeight;
    };

    scrapWindow.addEventListener("change", onResize, false);
    onResize();
  }, []);

  return (
    <DrawingContainer>
      <canvas
        ref={canvasRef}
        id="drawingCanvas"
        style={{
          zIndex: selectedSidebarTool === "drawingMode" ? "1" : "-1",
        }}
      />
    </DrawingContainer>
  );
};

export default Drawing;
