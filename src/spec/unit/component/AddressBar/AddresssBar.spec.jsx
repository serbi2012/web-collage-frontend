import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../../redux/configureStore";
import axios from "axios";
import AddressBarBox from "../../../../components/AddressBar";
import sampleWebsiteHtml from "../../../__mocks__/sampleWebsiteHtml";

const setWebContainerDom = jest.fn();
const setUrlAddressInput = jest.fn();
const manipulateDom = jest.fn();
const connectToUrlAddressOnClick = jest.fn();
jest.mock("axios");

describe("AddressBar", () => {
  it("depending on the value entered in the input, urlAddressInput should also change.", () => {
    let urlAddressInput;

    setUrlAddressInput.mockImplementation((value) => {
      return (urlAddressInput = value);
    });

    render(
      <Provider store={store}>
        <AddressBarBox />
      </Provider>
    );

    fireEvent.change(screen.getByTestId("addressInput"), {
      target: { value: "https://www.sample.com" },
    });

    expect(screen.getByTestId("addressInput").value).toBe(
      "https://www.sample.com"
    );

    setUrlAddressInput(screen.getByTestId("addressInput").value);

    expect(urlAddressInput).toBe("https://www.sample.com");
  });

  it("can get Html Data through urlAddressInput.", () => {
    let urlAddressInput;
    let htmlString;

    setUrlAddressInput.mockImplementation((value) => {
      return (urlAddressInput = value);
    });

    setWebContainerDom.mockImplementation((data) => {
      if (urlAddressInput === "https://www.sample.com") {
        htmlString = sampleWebsiteHtml;
      }
    });

    manipulateDom.mockImplementation((data) => {
      return data;
    });

    axios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: sampleWebsiteHtml })
    );

    render(
      <Provider store={store}>
        <AddressBarBox setWebContainerDom={setWebContainerDom} />
      </Provider>
    );

    fireEvent.change(screen.getByTestId("addressInput"), {
      target: { value: "https://www.sample.com" },
    });

    expect(screen.getByTestId("addressInput").value).toBe(
      "https://www.sample.com"
    );

    setUrlAddressInput(screen.getByTestId("addressInput").value);

    expect(urlAddressInput).toBe("https://www.sample.com");

    fireEvent.click(screen.getByTestId("addressConnect"));

    connectToUrlAddressOnClick();
    setWebContainerDom(sampleWebsiteHtml);

    expect(htmlString).toBe(sampleWebsiteHtml);
  });
});
