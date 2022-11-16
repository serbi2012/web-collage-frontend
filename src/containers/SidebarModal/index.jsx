import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";

const SidebarModalContainer = styled.div`
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
`;

const SidebarModal = ({ content }) => {
  const { selectedSidebarTool } = useSelector(
    ({ selectedSidebarTool }) => selectedSidebarTool
  );

  return (
    <SidebarModalContainer
      style={{ display: selectedSidebarTool !== "selectMode" && "none" }}
    >
      {content}
    </SidebarModalContainer>
  );
};

export default SidebarModal;
