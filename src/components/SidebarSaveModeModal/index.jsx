import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ReactToPrint from "react-to-print";
import COLORS from "../../constants/COLORS";

const SidebarSaveModeModalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 30px;
  top: 60vh;
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

  @page {
    size: A4;
    margin: 20mm;
  }
`;

const SidebarSaveModeModal = () => {
  const { selectedSidebarTool, isSidebarModalOpen } = useSelector(
    ({ selectedSidebarTool }) => selectedSidebarTool
  );

  return (
    <SidebarSaveModeModalContainer
      style={{
        display:
          (selectedSidebarTool !== "saveMode" || !isSidebarModalOpen) && "none",
      }}
    >
      <h3>Save Mode</h3>
      <ReactToPrint
        trigger={() => (
          <div className="sidebarModeOption">Save Scrap Window</div>
        )}
        content={() => document.getElementById("scrapWindowContentBox")}
      />
    </SidebarSaveModeModalContainer>
  );
};

export default SidebarSaveModeModal;
