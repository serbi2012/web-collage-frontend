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

  const key = "testKey";

  it("should handle setShareKey", () => {
    const test = shareKey(initialState, setShareKey(key));

    expect(test.shareKey).toEqual("testKey");
  });
});
