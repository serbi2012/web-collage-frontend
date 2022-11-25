import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import {
  setLineColor,
  setLineOpacity,
  setLineWidth,
} from "../../redux/reducers/lineStyle";
import SelectPenBox from "../SelectPenBox";

const SidebarDrawingModeModalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 30px;
  top: 25vh;
  left: 90px;
  min-width: 250px;
  background-color: ${COLORS.SUB_COLOR};
  border: 2px solid ${COLORS.MAIN_COLOR};
  border-radius: 5px;

  .selected {
    color: ${COLORS.SUB_COLOR};
    background-color: ${COLORS.MAIN_COLOR};
  }

  .selectPenBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    width: 230px;
  }

  .drawingOptionBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 30px 0;
  }

  .drawingOption {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 200px;

    p {
      width: 80px;
      text-align: center;
    }

    input {
      width: 120px;
    }
  }
`;

const SidebarDrawingModeModal = () => {
  const { lineWidth, lineOpacity } = useSelector(({ lineStyle }) => lineStyle);
  const { selectedSidebarTool, isSidebarModalOpen } = useSelector(
    ({ selectedSidebarTool }) => selectedSidebarTool
  );
  const { sidebarModeOption } = useSelector(
    ({ sidebarModeOption }) => sidebarModeOption
  );

  const [selectedMode, setSelectedMode] = useState(null);

  const dispatch = useDispatch();

  return (
    <SidebarDrawingModeModalContainer
      id="drawingModeModal"
      style={{
        display:
          (selectedSidebarTool !== "drawingMode" || !isSidebarModalOpen) &&
          "none",
      }}
    >
      <h3>Drawing Mode</h3>
      <div className="selectPenBox">
        {["pen", "highlighter", "eraser"].map((value, index) => {
          return (
            <SelectPenBox
              mode={value}
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
              key={index}
            />
          );
        })}
      </div>
      <div className="drawingOptionBox">
        <div className="drawingOption">
          <p>Width</p>
          <input
            type="range"
            min="1"
            max="50"
            defaultValue="3"
            onChange={(event) => {
              dispatch(setLineWidth(event.target.value));
            }}
          />
          <div>{lineWidth}</div>
        </div>
        <div
          className="drawingOption"
          style={{
            display: sidebarModeOption !== "highlighter" && "none",
          }}
        >
          <p>Opacity</p>
          <input
            type="range"
            min="10"
            max="100"
            defaultValue="10"
            onChange={(event) => {
              dispatch(setLineOpacity(event.target.value));
            }}
          />
          <div>{lineOpacity}</div>
        </div>
        <div
          className="drawingOption"
          style={{
            display: sidebarModeOption === "eraser" && "none",
          }}
        >
          <p>Color</p>
          <input
            type="color"
            onChange={(event) => {
              dispatch(setLineColor(event.target.value));
            }}
          />
        </div>
        <button
          className="drawingOption"
          style={{
            display: sidebarModeOption !== "eraser" && "none",
          }}
        >
          <p>Erase All</p>
        </button>
      </div>
    </SidebarDrawingModeModalContainer>
  );
};

export default SidebarDrawingModeModal;
