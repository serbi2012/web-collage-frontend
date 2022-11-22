export const drawPen = (context, startPosition, endPosition, color, width) => {
  context.globalCompositeOperation = "source-over";
  context.beginPath();
  context.moveTo(...startPosition);
  context.lineTo(...endPosition);
  context.strokeStyle = color;
  context.lineWidth = width;
  context.lineCap = "round";
  context.globalAlpha = 1;
  context.stroke();
  context.closePath();
};

export const drawHighlighter = (
  context,
  startPosition,
  endPosition,
  color,
  width,
  opacity
) => {
  context.globalCompositeOperation = "source-over";
  context.beginPath();
  context.moveTo(...startPosition);
  context.lineTo(...endPosition);
  context.strokeStyle = color;
  context.lineWidth = width;
  context.lineCap = "butt";
  context.globalAlpha = opacity * 0.01;
  context.stroke();
  context.closePath();
};

export const drawEraser = (context, startPosition, endPosition, width) => {
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  context.moveTo(...startPosition);
  context.lineTo(...endPosition);
  context.lineWidth = width;
  context.lineCap = "round";
  context.globalAlpha = 1;
  context.stroke();
  context.closePath();
};

export const drawPenWithEmit = (
  context,
  startPosition,
  endPosition,
  color,
  width,
  socket,
  canvas
) => {
  context.globalCompositeOperation = "source-over";
  context.beginPath();
  context.moveTo(...startPosition);
  context.lineTo(...endPosition);
  context.strokeStyle = color;
  context.lineWidth = width;
  context.lineCap = "round";
  context.globalAlpha = 1;
  context.stroke();
  context.closePath();

  socket.current.emit("shareScrapContent", {
    startPosition: [
      startPosition[0] / canvas.width,
      startPosition[1] / canvas.height,
    ],
    endPosition: [
      endPosition[0] / canvas.width,
      endPosition[1] / canvas.height,
    ],
    color,
    width,
    type: "pen",
  });
};

export const drawHighlighterWithEmit = (
  context,
  startPosition,
  endPosition,
  color,
  width,
  opacity,
  socket,
  canvas
) => {
  context.globalCompositeOperation = "source-over";
  context.beginPath();
  context.moveTo(...startPosition);
  context.lineTo(...endPosition);
  context.strokeStyle = color;
  context.lineWidth = width;
  context.lineCap = "butt";
  context.globalAlpha = opacity * 0.01;
  context.stroke();
  context.closePath();

  socket.current.emit("shareScrapContent", {
    startPosition: [
      startPosition[0] / canvas.width,
      startPosition[1] / canvas.height,
    ],
    endPosition: [
      endPosition[0] / canvas.width,
      endPosition[1] / canvas.height,
    ],
    color,
    width,
    opacity,
    type: "highlighter",
  });
};

export const drawEraserWithEmit = (
  context,
  startPosition,
  endPosition,
  width,
  socket,
  canvas
) => {
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  context.moveTo(...startPosition);
  context.lineTo(...endPosition);
  context.lineWidth = width;
  context.lineCap = "round";
  context.globalAlpha = 1;
  context.stroke();
  context.closePath();

  socket.current.emit("shareScrapContent", {
    startPosition: [
      startPosition[0] / canvas.width,
      startPosition[1] / canvas.height,
    ],
    endPosition: [
      endPosition[0] / canvas.width,
      endPosition[1] / canvas.height,
    ],
    width,
    type: "eraser",
  });
};
