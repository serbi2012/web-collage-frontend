import lineStyle, {
  setLineColor,
  setLineOpacity,
  setLineWidth,
} from "../../../../redux/reducers/lineStyle";

describe("lineStyle reducer", () => {
  const initialState = {
    lineColor: "black",
    lineWidth: 3,
    lineOpacity: 20,
  };

  const testStyle = {
    color: "red",
    width: 10,
    opacity: 40,
  };

  it("Return the initial state when undefined received", () => {
    expect(lineStyle(undefined, { type: undefined })).toEqual({
      lineColor: "black",
      lineWidth: 3,
      lineOpacity: 20,
    });
  });

  it("should handle setLineColor", () => {
    const test = lineStyle(initialState, setLineColor(testStyle.color));

    expect(test.lineColor).toEqual("red");
  });

  it("should handle setLineWidth", () => {
    const test = lineStyle(initialState, setLineWidth(testStyle.width));

    expect(test.lineWidth).toEqual(10);
  });

  it("should handle setLineOpacity", () => {
    const test = lineStyle(initialState, setLineOpacity(testStyle.opacity));

    expect(test.lineOpacity).toEqual(40);
  });
});
