import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import SIDEBAR_TOOLS from "../../constants/SIDEBAR_TOOLS";
import { toggleModalOpen } from "../../redux/reducers/selectedSidebarTool";
import { changeSelectModeOption } from "../../redux/reducers/selectModeOption";
import SidebarFoldButton from "../SidebarFoldButton";
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

  .Sidebar-selectedTool {
    color: ${COLORS.MAIN_COLOR};
    background-color: ${COLORS.SUB_COLOR};
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

  const { isSidebarModalOpen } = useSelector(
    ({ selectedSidebarTool }) => selectedSidebarTool
  );

  const dispatch = useDispatch();

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
            <div
              className="selectModeOption"
              onClick={() => {
                dispatch(changeSelectModeOption("BoxAndBlockMode"));
              }}
            >
              Box & Block
            </div>
            <div
              className="selectModeOption"
              onClick={() => {
                dispatch(changeSelectModeOption("FreePositionMode"));
              }}
            >
              Free Position
            </div>
          </div>,
        ]}
      ></SidebarModal>
      {SIDEBAR_TOOLS.map((value, index) => {
        return <SidebarTool icon={value.ICON} mode={value.MODE} key={index} />;
      })}
      <SidebarFoldButton isFold={isFold} setIsFold={setIsFold} />
    </SidebarContainer>
  );
};

export default Sidebar;
