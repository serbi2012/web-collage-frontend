import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import { changeSidebarModeOption } from "../../redux/reducers/sidebarModeOption";

const SelectPenBoxContainer = styled.div`
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

const SelectPenBox = ({ mode, selectedMode, setSelectedMode }) => {
  const dispatch = useDispatch();

  return (
    <SelectPenBoxContainer>
      <div
        className={`sidebarModeOption ${selectedMode === mode && "selected"}`}
        onClick={() => {
          dispatch(changeSidebarModeOption(mode));
          setSelectedMode(mode);
        }}
      >
        {mode}
      </div>
    </SelectPenBoxContainer>
  );
};

export default SelectPenBox;
