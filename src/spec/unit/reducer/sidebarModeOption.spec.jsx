import sidebarModeOption, {
  changeSidebarModeOption,
} from "../../../redux/reducers/sidebarModeOption";

describe("sidebarModeOption reducer", () => {
  const initialState = {
    sidebarModeOption: "BoxAndBlockMode",
  };

  it("Return the initial state when undefined received", () => {
    expect(sidebarModeOption(undefined, { type: undefined })).toEqual({
      sidebarModeOption: "BoxAndBlockMode",
    });
  });

  const modeOption = "FreePosition";

  it("should handle changeSidebarModeOption", () => {
    const test = sidebarModeOption(
      initialState,
      changeSidebarModeOption(modeOption)
    );

    expect(test.sidebarModeOption).toEqual("FreePosition");
  });
});
