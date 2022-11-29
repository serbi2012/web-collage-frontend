import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../../redux/configureStore";
import SidebarFoldButton from "../../../../components/SidebarFoldButton";
import COLORS from "../../../../constants/COLORS";

let isFoldProps = false;

const setIsFold = jest.fn();

beforeEach(() => {
  setIsFold.mockImplementation(() => {
    isFoldProps = true;
  });
});

describe("SidebarFoldButton", () => {
  it("component must exist.", () => {
    render(
      <Provider store={store}>
        <SidebarFoldButton isFold={isFoldProps} setIsFold={setIsFold} />
      </Provider>
    );

    expect(screen.getByTestId("sidebarFoldButton")).toBeInTheDocument();
  });

  it("if isFold is true, the correct color is set.", () => {
    render(
      <Provider store={store}>
        <SidebarFoldButton isFold={isFoldProps} setIsFold={setIsFold} />
      </Provider>
    );

    expect(screen.getByTestId("sidebarFoldButton")).toHaveStyle(
      `background-color: ${COLORS.SUB_COLOR}`
    );

    expect(screen.getByTestId("sidebarFoldButton")).toHaveStyle(
      `color: ${COLORS.MAIN_COLOR}`
    );
  });

  it("if isFold is false, the correct color is set.", () => {
    setIsFold();

    render(
      <Provider store={store}>
        <SidebarFoldButton isFold={isFoldProps} setIsFold={setIsFold} />
      </Provider>
    );

    expect(screen.getByTestId("sidebarFoldButton")).toHaveStyle(
      `background-color: ${COLORS.MAIN_COLOR}`
    );

    expect(screen.getByTestId("sidebarFoldButton")).toHaveStyle(
      `color: ${COLORS.SUB_COLOR}`
    );
  });
});
