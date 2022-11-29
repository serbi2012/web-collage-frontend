import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../../redux/configureStore";
import SidebarThemeModeModal from "../../../../components/SidebarThemeModeModal";

const reduceWidthMouseDown = jest.fn();
const increaseWidthMouseDown = jest.fn();

let scrapWindowWidth;

beforeEach(() => {
  scrapWindowWidth = 500;

  reduceWidthMouseDown.mockImplementation(() => {
    scrapWindowWidth -= 100;
  });

  increaseWidthMouseDown.mockImplementation(() => {
    scrapWindowWidth += 100;
  });
});

describe("SidebarThemeModeModal", () => {
  it("component must exist.", () => {
    render(
      <Provider store={store}>
        <SidebarThemeModeModal />
      </Provider>
    );

    expect(screen.getByTestId("sidebarThemeModeModal")).toBeInTheDocument();
  });

  it("when reduceWidthMouseDown is executed, scrapWindowWidth is reduced by 100.", () => {
    render(
      <Provider store={store}>
        <SidebarThemeModeModal />
      </Provider>
    );

    fireEvent.mouseDown(screen.getByTestId("reduceWidth"));
    reduceWidthMouseDown();

    expect(scrapWindowWidth).toBe(400);
  });

  it("when increaseWidthMouseDown is executed, scrapWindowWidth is increased by 100.", () => {
    render(
      <Provider store={store}>
        <SidebarThemeModeModal />
      </Provider>
    );

    fireEvent.mouseDown(screen.getByTestId("increaseWidth"));
    increaseWidthMouseDown();

    expect(scrapWindowWidth).toBe(600);
  });
});
