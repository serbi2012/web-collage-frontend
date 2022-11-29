import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../../redux/configureStore";
import EditModalOption from "../../../../components/EditModalOption";

const editModalOptionProps = { option: "bold", icon: "bold" };

describe("EditModalOption", () => {
  it("depending on the icon props, the icon content should be different.", () => {
    render(
      <Provider store={store}>
        <EditModalOption
          option={editModalOptionProps.option}
          icon={editModalOptionProps.icon}
        />
      </Provider>
    );

    expect(screen.getByText("bold")).toBeInTheDocument();
  });

  it("depending on the option props, the executed option should be different.", () => {
    render(
      <Provider store={store}>
        <EditModalOption
          option={editModalOptionProps.option}
          icon={editModalOptionProps.icon}
        />
      </Provider>
    );

    document.execCommand = jest.fn();

    fireEvent.mouseDown(screen.getByText("bold"));

    expect(document.execCommand).toHaveBeenCalledWith("bold");
  });
});
