import React from "react";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";

const SidebarFoldButtonContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15vh;
  padding: 5px;
  bottom: 20px;
  height: 45px;
  width: 45px;
  color: ${COLORS.MAIN_COLOR};
  background-color: ${COLORS.SUB_COLOR};
  border-radius: 10px;
  transform: rotate(180deg);
  user-select: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  :hover {
    background-color: hsl(0, 0%, 80%);
  }

  span {
    font-size: 30px;
  }
`;

const SidebarFoldButton = ({ isFold, setIsFold }) => {
  return (
    <SidebarFoldButtonContainer
      style={{
        backgroundColor: isFold
          ? `${COLORS.MAIN_COLOR}`
          : `${COLORS.SUB_COLOR}`,
        color: isFold ? `${COLORS.SUB_COLOR}` : `${COLORS.MAIN_COLOR}`,
        transform: isFold ? "translateX(100px)" : "translateX(0px)",
      }}
      onClick={() => {
        setIsFold(!isFold);
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{
          transform: isFold ? "rotate(0deg)" : "rotate(180deg)",
        }}
      >
        logout
      </span>
    </SidebarFoldButtonContainer>
  );
};

export default SidebarFoldButton;
