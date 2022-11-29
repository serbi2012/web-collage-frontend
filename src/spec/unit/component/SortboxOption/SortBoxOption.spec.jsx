import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../../redux/configureStore";
import SortBoxOption from "../../../../components/SortBoxOption";

const sortBoxOnClick = jest.fn();
const sortBoxOptionProps = {
  alignItems: "flex-start",
  flexDirection: "row",
  rotate: false,
  sortDirection: "sortTop",
};

const selectedElement = {
  style: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};

beforeEach(() => {
  sortBoxOnClick.mockImplementation(() => {
    selectedElement.style.display = "flex";
    selectedElement.style.justifyContent = "center";
    selectedElement.style.alignItems = sortBoxOptionProps.alignItems;
    selectedElement.style.flexDirection = sortBoxOptionProps.flexDirection;
  });
});

describe("sortBoxOption", () => {
  it("component must exist.", () => {
    render(
      <Provider store={store}>
        <SortBoxOption
          alignItems={sortBoxOptionProps.alignItems}
          flexDirection={sortBoxOptionProps.flexDirection}
          rotate={sortBoxOptionProps.rotate}
          sortDirection={sortBoxOptionProps.sortDirection}
        />
      </Provider>
    );

    expect(screen.getByTestId("sortBoxOption")).toBeInTheDocument();
  });

  it("depending on the props, the class should be different.", () => {
    render(
      <Provider store={store}>
        <SortBoxOption
          alignItems={sortBoxOptionProps.alignItems}
          flexDirection={sortBoxOptionProps.flexDirection}
          rotate={sortBoxOptionProps.rotate}
          sortDirection={sortBoxOptionProps.sortDirection}
        />
      </Provider>
    );

    expect(screen.getByTestId("sortBoxOption")).toHaveClass("sortTop");
    expect(screen.getByTestId("sortBoxOption")).not.toHaveClass("rotate");
  });

  it("when sortBoxOnClick is executed, the style property should be changed accordingly.", () => {
    render(
      <Provider store={store}>
        <SortBoxOption
          alignItems={sortBoxOptionProps.alignItems}
          flexDirection={sortBoxOptionProps.flexDirection}
          rotate={sortBoxOptionProps.rotate}
          sortDirection={sortBoxOptionProps.sortDirection}
        />
      </Provider>
    );

    sortBoxOnClick();

    expect(selectedElement.style.alignItems).toBe("flex-start");
    expect(selectedElement.style.flexDirection).toBe("row");
  });
});
