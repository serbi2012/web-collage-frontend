import React from "react";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import SIDEBAR_TOOLS from "../../constants/SIDEBAR_TOOLS";
import SidebarModal from "../SidebarModal";
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

  .Sidebar-folding {
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
  }

  .Sidebar-folding:hover {
    background-color: hsl(0, 0%, 80%);
  }

  .Sidebar-folding > span {
    font-size: 30px;
  }

  .selectModeOption {
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
`;

const Sidebar = () => {
  const [isFold, setIsFold] = useState(false);

  return (
    <SidebarContainer
      style={{
        transform: isFold ? ["translateX(-100px)"] : ["translateX(0px)"],
      }}
    >
      <SidebarModal
        content={[
          <div>
            <h3>Select Mode</h3>
            <div className="selectModeOption">Box & Block</div>
            <div className="selectModeOption">Free Position</div>
          </div>,
        ]}
      ></SidebarModal>
      {SIDEBAR_TOOLS.map((value, index) => {
        return <SidebarTool icon={value.ICON} mode={value.MODE} />;
      })}
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
