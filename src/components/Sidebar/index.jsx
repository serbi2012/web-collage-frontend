import React from "react";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import SIDEBAR_TOOLS from "../../constants/SIDEBAR_TOOLS";
import SidebarBoxModeModal from "../SidebarBoxModeModal";
import SidebarDrawingModeModal from "../SidebarDrawingModeModal";
import SidebarFoldButton from "../SidebarFoldButton";
import SidebarSaveModeModal from "../SidebarSaveModeModal";
import SidebarSelectModeModal from "../SidebarSelectModeModal";
import SidebarShareModeModal from "../SidebarShareModeModal";
import SidebarThemeModeModal from "../SidebarThemeModeModal";
import SidebarTool from "../SidebarTool";

const SidebarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 70px;
  height: 100vh;
  background-color: ${COLORS.MAIN_COLOR};
  transition: all 0.3s ease-in-out;
  z-index: 200000;

  .Sidebar-selectedTool {
    color: ${COLORS.MAIN_COLOR};
    background-color: ${COLORS.SUB_COLOR};
  }
`;

const Sidebar = () => {
  const [isFold, setIsFold] = useState(false);

  return (
    <SidebarContainer
      id="sidebar"
      style={{
        transform: isFold ? ["translateX(-100px)"] : ["translateX(0px)"],
      }}
    >
      <SidebarSelectModeModal />
      <SidebarBoxModeModal />
      <SidebarDrawingModeModal />
      <SidebarSaveModeModal />
      <SidebarThemeModeModal />
      <SidebarShareModeModal />
      {SIDEBAR_TOOLS.map((value, index) => {
        return <SidebarTool icon={value.ICON} mode={value.MODE} key={index} />;
      })}
      <SidebarFoldButton isFold={isFold} setIsFold={setIsFold} />
    </SidebarContainer>
  );
};

export default Sidebar;
