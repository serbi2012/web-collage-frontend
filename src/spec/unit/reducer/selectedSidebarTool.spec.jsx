import selectedSidebarTool, {
  selectSidebarTool,
  toggleModalOpen,
} from "../../../redux/reducers/selectedSidebarTool";

describe("selectedSidebarTool reducer", () => {
  const initialState = { selectedSidebarTool: "", isSidebarModalOpen: false };

  it("Return the initial state when undefined received", () => {
    expect(selectedSidebarTool(undefined, { type: undefined })).toEqual({
      selectedSidebarTool: "",
      isSidebarModalOpen: false,
    });
  });

  const tool = { mode: "editMode", isModalOpen: true };

  it("should handle selectSidebarTool", () => {
    const test = selectedSidebarTool(
      initialState,
      selectSidebarTool(tool.mode)
    );

    expect(test.selectedSidebarTool).toEqual("editMode");
  });

  it("should handle toggleModalOpen", () => {
    const test = selectedSidebarTool(
      initialState,
      toggleModalOpen(tool.isModalOpen)
    );

    expect(test.isSidebarModalOpen).toEqual(true);
  });
});
