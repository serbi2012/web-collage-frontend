export const drawLineWithPen = (
  context,
  startPosition,
  endPosition,
  color,
  width
) => {
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

export const drawLineWithHighlighter = (
  context,
  startPosition,
  endPosition,
  color,
  width,
  opacity
) => {
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
