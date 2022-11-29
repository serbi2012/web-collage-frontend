import selectedElement, {
  setSelectedElement,
} from "../../../redux/reducers/selectedElement";

describe("selectedElement reducer", () => {
  const initialState = {
    selectedElement: "",
  };

  it("Return the initial state when undefined received", () => {
    expect(selectedElement(undefined, { type: undefined })).toEqual({
      selectedElement: "",
    });
  });

  it("should handle setSelectedElement", () => {
    const test = selectedElement(
      initialState,
      setSelectedElement("<div>Hello</div>")
    );

    expect(test.selectedElement).toEqual("<div>Hello</div>");
  });
});
