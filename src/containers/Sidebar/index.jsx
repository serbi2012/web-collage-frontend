import React from "react";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";

const SidebarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 70px;
  height: 100vh;
  background-color: ${COLORS.MAIN_COLOR};
  transition: all 0.3s ease-in-out;

  .Sidebar-tools {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5vh 0;
    padding: 5px;
    height: 35px;
    width: 35px;
    color: ${COLORS.SUB_COLOR};
    border: 3px solid transparent;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .Sidebar-tools:hover {
    border: 3px solid white;
  }

  .Sidebar-tools > span {
    font-size: 30px;
  }

  .Sidebar-folding {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15vh;
    padding: 5px;
    height: 35px;
    width: 35px;
    color: ${COLORS.MAIN_COLOR};
    background-color: ${COLORS.SUB_COLOR};
    border-radius: 10px;
    transform: rotate(180deg);
    user-select: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .Sidebar-folding:hover {
    background-color: hsl(0, 0%, 80%);
  }

  .Sidebar-folding > span {
    font-size: 30px;
  }
`;

const Sidebar = () => {
  const [isFold, setIsFold] = useState(false);

  return (
    <SidebarContainer
      style={{
        transform: isFold ? ["translateX(-100px)"] : ["translateX(0px)"],
      }}
    >
      <div className="Sidebar-tools">
        <span className="material-symbols-outlined">arrow_selector_tool</span>
      </div>
      <div className="Sidebar-tools">
        <span
          className="material-symbols-outlined"
          style={{ transform: ["translateY(-3px)"] }}
        >
          edit_square
        </span>
      </div>
      <div className="Sidebar-tools">
        <span className="material-symbols-outlined">border_color</span>
      </div>
      <div className="Sidebar-tools">
        <span className="material-symbols-outlined">
          check_box_outline_blank
        </span>
      </div>
      <div className="Sidebar-tools">
        <span className="material-symbols-outlined">link</span>
      </div>
      <div className="Sidebar-tools">
        <span className="material-symbols-outlined">save</span>
      </div>
      <div className="Sidebar-tools">
        <span className="material-symbols-outlined">layers</span>
      </div>
      <div
        className="Sidebar-folding"
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
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;