import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../../redux/configureStore";
import ThemeOption from "../../../../components/ThemeOption";

const changeThemeOnMouseDown = jest.fn();
const themeOptionProps = {
  NAME: "dark",
  FONT_COLOR: "#ffffff",
  BACKGROUND_COLOR: "#373737",
  BOX_BORDER: "#cccccc",
};

let theme = "theme-light";

beforeEach(() => {
  changeThemeOnMouseDown.mockImplementation(() => {
    theme = `theme-${themeOptionProps.NAME}`;
  });
});

describe("ThemeOption", () => {
  it("component must exist.", () => {
    render(
      <Provider store={store}>
        <ThemeOption theme={themeOptionProps} />
      </Provider>
    );

    expect(screen.getByTestId("themeOption")).toBeInTheDocument();
  });

  it("depending on the theme props, the background-color should be different.", () => {
    render(
      <Provider store={store}>
        <ThemeOption theme={themeOptionProps} />
      </Provider>
    );

    expect(screen.getByTestId("themeOption")).toHaveStyle(
      `background-color: ${themeOptionProps.BACKGROUND_COLOR}`
    );
  });

  it("when mousedown event occurs, theme should change accordingly.", () => {
    render(
      <Provider store={store}>
        <ThemeOption theme={themeOptionProps} />
      </Provider>
    );

    expect(theme).toBe("theme-light");

    fireEvent.mouseDown(screen.getByTestId("themeOption"));
    changeThemeOnMouseDown();

    expect(theme).toBe("theme-dark");
  });
});
