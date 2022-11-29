import theme, { setTheme } from "../../../redux/reducers/theme";

describe("theme reducer", () => {
  const initialState = {
    theme: "theme-light",
  };

  it("Return the initial state when undefined received", () => {
    expect(theme(undefined, { type: undefined })).toEqual({
      theme: "theme-light",
    });
  });

  const darkTheme = "theme-dark";

  it("should handle setTheme", () => {
    const test = theme(initialState, setTheme(darkTheme));

    expect(test.theme).toEqual("theme-dark");
  });
});
