import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SERVER_ADDRESS } from "../../../utils/env";
import { getCookie, deleteCookie } from "../../../utils/manageCookie";
import COLORS from "../../constants/COLORS";
import { setShareKey } from "../../redux/reducers/shareKey";
import { setUrlAddress } from "../../redux/reducers/urlAddress";

const SidebarShareModeModalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 30px;
  top: 50vh;
  left: 90px;
  min-width: 250px;
  background-color: ${COLORS.SUB_COLOR};
  border: 2px solid ${COLORS.MAIN_COLOR};
  border-radius: 5px;

  .sidebarModeOption {
    margin: 5px 0px;
    padding: 3px 10px;
    text-align: center;
    background-color: ${COLORS.SUB_COLOR};
    border: 1px solid ${COLORS.MAIN_COLOR};
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    user-select: none;
    cursor: pointer;

    :hover {
      color: ${COLORS.SUB_COLOR};
      background-color: ${COLORS.MAIN_COLOR};
    }

    :active {
      opacity: 0.4;
    }
  }

  .selected {
    color: ${COLORS.SUB_COLOR};
    background-color: ${COLORS.MAIN_COLOR};
  }

  hr {
    background-color: ${COLORS.MAIN_COLOR};
    height: 2px;
    width: 200px;
  }
`;

const SidebarShareModeModal = () => {
  const { urlAddress } = useSelector(({ urlAddress }) => urlAddress);
  const { selectedSidebarTool, isSidebarModalOpen } = useSelector(
    ({ selectedSidebarTool }) => selectedSidebarTool
  );

  const [keyInput, setKeyInput] = useState("");

  const dispatch = useDispatch();

  const createShareKeyOnClick = async () => {
    const scrapWindow = document.getElementById("scrapWindowContentBox");
    const copyKey = document.getElementById("shareKeyInput");

    const newScrapContent = await axios.post(
      `${SERVER_ADDRESS}/scrapContent/`,
      {
        content: scrapWindow.innerHTML,
        urlAddress,
      }
    );

    copyKey.value = newScrapContent.data.id.toString();

    dispatch(setShareKey(copyKey.value));
    copyKey.select();
    copyKey.setSelectionRange(0, 99999);
    document.execCommand("Copy");
    alert("Key가 성공적으로 생성되었습니다.");
    copyUrlFnc();
  };

  const connectKeyOnClick = async () => {
    const scrapWindow = document.getElementById("scrapWindowContentBox");
    const scrapContent = await axios.get(
      `${SERVER_ADDRESS}/scrapContent/${keyInput}`
    );

    scrapWindow.innerHTML = scrapContent.data.scrapContent.content;

    dispatch(setShareKey(keyInput));
    dispatch(setUrlAddress(scrapContent.data.scrapContent.urlAddress));
  };

  useEffect(() => {
    (async () => {
      if (getCookie("shareModeKey")) {
        const scrapWindow = document.getElementById("scrapWindowContentBox");
        const scrapContent = await axios.get(
          `${SERVER_ADDRESS}/scrapContent/${getCookie("shareModeKey")}/`
        );

        scrapWindow.innerHTML = scrapContent.data.scrapContent.content;

        dispatch(setShareKey(getCookie("shareModeKey")));
        dispatch(setUrlAddress(scrapContent.data.scrapContent.urlAddress));
        deleteCookie("shareModeKey");
      }
    })();
  }, []);

  return (
    <SidebarShareModeModalContainer
      style={{
        display:
          (selectedSidebarTool !== "shareMode" || !isSidebarModalOpen) &&
          "none",
      }}
    >
      <h3>Share Mode</h3>
      <div className="sidebarModeOption" onClick={createShareKeyOnClick}>
        Create Key
      </div>
      <input id="shareKeyInput" />
      <hr />
      <div className="sidebarModeOption" onClick={connectKeyOnClick}>
        Connect
      </div>
      <input
        onChange={(event) => {
          setKeyInput(event.target.value);
        }}
      />
    </SidebarShareModeModalContainer>
  );
};

export default SidebarShareModeModal;
