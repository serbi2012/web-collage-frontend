import urlAddress, {
  setUrlAddress,
} from "../../../../redux/reducers/urlAddress";

describe("urlAddress reducer", () => {
  const initialState = {
    urlAddress: "https://illuminating-extol-innovation.w3spaces.com",
  };

  it("Return the initial state when undefined received", () => {
    expect(urlAddress(undefined, { type: undefined })).toEqual({
      urlAddress: "https://illuminating-extol-innovation.w3spaces.com",
    });
  });

  it("should handle setUrlAddress", () => {
    const test = urlAddress(
      initialState,
      setUrlAddress("https://www.google.com")
    );

    expect(test.urlAddress).toEqual("https://www.google.com");
  });
});
