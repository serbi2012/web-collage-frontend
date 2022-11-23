import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import { changeSidebarModeOption } from "../../redux/reducers/sidebarModeOption";

const SidebarSelectModeModalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 30px;
  top: 17vh;
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
`;

const SidebarSelectModeModal = () => {
  const { selectedSidebarTool, isSidebarModalOpen } = useSelector(
    ({ selectedSidebarTool }) => selectedSidebarTool
  );

  const [selectedMode, setSelectedMode] = useState(null);

  const dispatch = useDispatch();

  const changeSelectModeOnClick = (mode) => {
    dispatch(changeSidebarModeOption(`${mode}Mode`));
    setSelectedMode(mode);
  };

  return (
    <SidebarSelectModeModalContainer
      style={{
        display:
          (selectedSidebarTool !== "selectMode" || !isSidebarModalOpen) &&
          "none",
      }}
    >
      <h3>Select Mode</h3>
      <div
        className={`sidebarModeOption ${
          selectedMode === "BoxAndBlock" && "selected"
        }`}
        onClick={() => {
          changeSelectModeOnClick("BoxAndBlock");
        }}
      >
        Box & Block
      </div>
      <div
        className={`sidebarModeOption ${
          selectedMode === "FreePosition" && "selected"
        }`}
        onClick={() => {
          changeSelectModeOnClick("FreePosition");
        }}
      >
        Free Position
      </div>
    </SidebarSelectModeModalContainer>
  );
};

export default SidebarSelectModeModal;
