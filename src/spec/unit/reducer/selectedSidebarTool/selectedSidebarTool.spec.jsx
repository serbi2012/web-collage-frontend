import selectedSidebarTool, {
  selectSidebarTool,
  toggleModalOpen,
} from "../../../../redux/reducers/selectedSidebarTool";

describe("selectedSidebarTool reducer", () => {
  const initialState = { selectedSidebarTool: "", isSidebarModalOpen: false };
  const testTool = { mode: "editMode", isModalOpen: true };

  it("Return the initial state when undefined received", () => {
    expect(selectedSidebarTool(undefined, { type: undefined })).toEqual({
      selectedSidebarTool: "",
      isSidebarModalOpen: false,
    });
  });

  it("should handle selectSidebarTool", () => {
    const test = selectedSidebarTool(
      initialState,
      selectSidebarTool(testTool.mode)
    );

    expect(test.selectedSidebarTool).toEqual("editMode");
  });

  it("should handle toggleModalOpen", () => {
    const test = selectedSidebarTool(
      initialState,
      toggleModalOpen(testTool.isModalOpen)
    );

    expect(test.isSidebarModalOpen).toEqual(true);
  });
});
