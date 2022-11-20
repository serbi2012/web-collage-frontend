import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import THEME from "../../constants/THEME";
import { setTheme } from "../../redux/reducers/theme";

const SidebarThemeModeModalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 30px;
  top: 43vh;
  left: 90px;
  min-width: 250px;
  background-color: ${COLORS.SUB_COLOR};
  border: 2px solid ${COLORS.MAIN_COLOR};
  border-radius: 5px;

  .scrapWindowWidthBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 130px;
  }

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

  hr {
    background-color: ${COLORS.MAIN_COLOR};
    height: 2px;
    width: 200px;
  }

  .themeBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 200px;

    .theme {
      margin: 5px;
      height: 50px;
      width: 50px;
      border: 2px solid ${COLORS.MAIN_COLOR};
      border-radius: 5px;
      user-select: none;
      cursor: pointer;
    }

    .light {
      background-color: white;
    }

    .dark {
      background-color: ${THEME.DARK.BACKGROUND_COLOR};
    }

    .brown {
      background-color: ${THEME.BROWN.BACKGROUND_COLOR};
    }

    .blue {
      background-color: ${THEME.BLUE.BACKGROUND_COLOR};
    }

    .skyblue {
      background-color: ${THEME.SKY_BLUE.BACKGROUND_COLOR};
    }

    .green {
      background-color: ${THEME.GREEN.BACKGROUND_COLOR};
    }
  }

  .selected {
    color: ${COLORS.SUB_COLOR};
    background-color: ${COLORS.MAIN_COLOR};
  }
`;

const SidebarThemeModeModal = () => {
  const { selectedSidebarTool, isSidebarModalOpen } = useSelector(
    ({ selectedSidebarTool }) => selectedSidebarTool
  );

  const [scrapWindowWidth, setScrapWindowWidth] = useState(500);

  const dispatch = useDispatch();

  const { DARK, BROWN, BLUE, SKY_BLUE, GREEN } = THEME;

  return (
    <SidebarThemeModeModalContainer
      style={{
        display:
          (selectedSidebarTool !== "themeMode" || !isSidebarModalOpen) &&
          "none",
      }}
    >
      <h3>Theme Mode</h3>
      <h5>Width</h5>
      <div className="scrapWindowWidthBox">
        <div
          className="sidebarModeOption"
          onClick={() => {
            if (scrapWindowWidth > 300) {
              const boxes = document.getElementsByClassName("BoxComponent");

              for (let i = 0; i < boxes.length; i++) {
                boxes[i].style.width = `${scrapWindowWidth - 100}px`;
              }

              setScrapWindowWidth(scrapWindowWidth - 100);
            }
          }}
        >
          -
        </div>
        {scrapWindowWidth}px
        <div
          className="sidebarModeOption"
          onClick={() => {
            if (scrapWindowWidth < 1000) {
              const boxes = document.getElementsByClassName("BoxComponent");

              for (let i = 0; i < boxes.length; i++) {
                boxes[i].style.width = `${scrapWindowWidth + 100}px`;
              }

              setScrapWindowWidth(scrapWindowWidth + 100);
            }
          }}
        >
          +
        </div>
      </div>
      <hr />
      <h5>Theme</h5>
      <div className="themeBox">
        <div
          className="theme light"
          onClick={() => {
            const boxes = document.getElementsByClassName("BoxComponent");

            for (let i = 0; i < boxes.length; i++) {
              boxes[i].style.boxShadow = "0 0 0 2px #ccc";
            }

            dispatch(setTheme("theme-light"));
          }}
        />
        <div
          className="theme dark"
          onClick={() => {
            const boxes = document.getElementsByClassName("BoxComponent");

            for (let i = 0; i < boxes.length; i++) {
              boxes[i].style.boxShadow = `0 0 0 2px ${DARK.BOX_BORDER}`;
            }

            dispatch(setTheme("theme-dark"));
          }}
        />
        <div
          className="theme brown"
          onClick={() => {
            const boxes = document.getElementsByClassName("BoxComponent");

            for (let i = 0; i < boxes.length; i++) {
              boxes[i].style.boxShadow = `0 0 0 2px ${BROWN.BOX_BORDER}`;
            }

            dispatch(setTheme("theme-brown"));
          }}
        />
        <div
          className="theme blue"
          onClick={() => {
            const boxes = document.getElementsByClassName("BoxComponent");

            for (let i = 0; i < boxes.length; i++) {
              boxes[i].style.boxShadow = `0 0 0 2px ${BLUE.BOX_BORDER}`;
            }

            dispatch(setTheme("theme-blue"));
          }}
        />
        <div
          className="theme skyblue"
          onClick={() => {
            const boxes = document.getElementsByClassName("BoxComponent");

            for (let i = 0; i < boxes.length; i++) {
              boxes[i].style.boxShadow = `0 0 0 2px ${SKY_BLUE.BOX_BORDER}`;
            }

            dispatch(setTheme("theme-skyblue"));
          }}
        />
        <div
          className="theme green"
          onClick={() => {
            const boxes = document.getElementsByClassName("BoxComponent");

            for (let i = 0; i < boxes.length; i++) {
              boxes[i].style.boxShadow = `0 0 0 2px ${GREEN.BOX_BORDER}`;
            }

            dispatch(setTheme("theme-green"));
          }}
        />
      </div>
    </SidebarThemeModeModalContainer>
  );
};

export default SidebarThemeModeModal;
