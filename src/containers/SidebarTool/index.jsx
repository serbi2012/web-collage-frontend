import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import COLORS from "../../constants/COLORS";

const SidebarToolContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5vh 0;
  padding: 5px;
  height: 45px;
  width: 45px;
  color: ${COLORS.SUB_COLOR};
  border: 3px solid transparent;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  :hover {
    border: 3px solid white;
  }

  span {
    font-size: 30px;
  }

  .Sidebar-selectedTool {
    color: ${COLORS.MAIN_COLOR};
    background-color: ${COLORS.SUB_COLOR};
  }
`;

const SidebarTool = ({ icon, mode }) => {
  const { selectedSidebarTool } = useSelector(
    ({ selectedSidebarTool }) => selectedSidebarTool
  );

  const dispatch = useDispatch();

  return (
    <SidebarToolContainer
      className={`${selectedSidebarTool === mode && "Sidebar-selectedTool"}`}
      onClick={() => {
        dispatch(selectSidebarTool(mode));
      }}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </SidebarToolContainer>
  );
};

export default SidebarTool;
