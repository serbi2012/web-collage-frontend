import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import THEME from "../../constants/THEME";
import ThemeOption from "../ThemeOption";

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

  const reduceWidthMouseDown = () => {
    if (scrapWindowWidth > 300) {
      const boxes = document.getElementsByClassName("BoxComponent");

      for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.width = `${scrapWindowWidth - 100}px`;
      }

      setScrapWindowWidth(scrapWindowWidth - 100);
    }
  };

  const increaseWidthMouseDown = () => {
    if (scrapWindowWidth < 1000) {
      const boxes = document.getElementsByClassName("BoxComponent");

      for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.width = `${scrapWindowWidth + 100}px`;
      }

      setScrapWindowWidth(scrapWindowWidth + 100);
    }
  };

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
        <div className="sidebarModeOption" onMouseDown={reduceWidthMouseDown}>
          -
        </div>
        {scrapWindowWidth}px
        <div className="sidebarModeOption" onMouseDown={increaseWidthMouseDown}>
          +
        </div>
      </div>
      <hr />
      <h5>Theme</h5>
      <div className="themeBox">
        {Object.values(THEME).map((value, index) => {
          return <ThemeOption theme={value} />;
        })}
      </div>
    </SidebarThemeModeModalContainer>
  );
};

export default SidebarThemeModeModal;
