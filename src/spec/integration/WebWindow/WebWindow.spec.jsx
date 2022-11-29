import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../../../redux/configureStore";
import WebWindow from "../../../components/WebWindow";
import sampleWebsiteHtml from "../../__mocks__/sampleWebsiteHtml";

jest.mock("axios");

describe("WebWindow", () => {
  describe("after website is loaded", () => {
    beforeEach(async () => {
      axios.get.mockImplementation(() =>
        Promise.resolve({ status: 200, data: sampleWebsiteHtml })
      );
    });

    it("There are no highlight on a element or style scan modal before mouse moves over a element", () => {
      render(
        <Provider store={store}>
          <WebWindow />
        </Provider>
      );

      const heading = screen.findByText("Sample website");

      expect(heading.classList.contains("selectedDom")).toBe(false);
    });

    it("Highlight the element when mouse is moving over a element", () => {
      render(
        <Provider store={store}>
          <WebWindow />
        </Provider>
      );

      const heading = screen.findByText("Sample website");
      fireEvent.mouseMove(heading);

      expect(heading.classList.contains("selectedDom")).toBe(true);
    });
  });
});
