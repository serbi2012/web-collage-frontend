import shareKey, { setShareKey } from "../../../redux/reducers/shareKey";

describe("shareKey reducer", () => {
  const initialState = {
    shareKey: "",
  };

  it("Return the initial state when undefined received", () => {
    expect(shareKey(undefined, { type: undefined })).toEqual({
      shareKey: "",
    });
  });

  it("should handle setShareKey", () => {
    const test = shareKey(initialState, setShareKey("testKey"));

    expect(test.shareKey).toEqual("testKey");
  });
});
