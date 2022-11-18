import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import {
  setLineColor,
  setLineOpacity,
  setLineWidth,
} from "../../redux/reducers/lineStyle";
import { changeSidebarModeOption } from "../../redux/reducers/sidebarModeOption";

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

  .selectPenBox {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 100%;

    div {
      margin: 0 2px;
      padding: 2px 10px;
      min-width: 80px;
      text-align: center;
      border: 2px solid ${COLORS.MAIN_COLOR};
      border-radius: 2px;
    }
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

  const [selectedMode, setSelectedMode] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const scrapWindow = document.getElementById("scrapWindowContentBox");

    scrapWindow.addEventListener("mousedown", (event) => {
      setSelectedElement(event.target);
    });
  }, []);

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
        <div
          className={`sidebarModeOption ${
            selectedMode === "pen" && "selected"
          }`}
          onClick={() => {
            dispatch(changeSidebarModeOption("Pen"));
            setSelectedMode("pen");
          }}
        >
          Pen
        </div>
        <div
          className={`sidebarModeOption ${
            selectedMode === "highlighter" && "selected"
          }`}
          onClick={() => {
            dispatch(changeSidebarModeOption("Highlighter"));
            setSelectedMode("highlighter");
          }}
        >
          Highlighter
        </div>
        <div
          className={`sidebarModeOption ${
            selectedMode === "eraser" && "selected"
          }`}
          onClick={() => {
            dispatch(changeSidebarModeOption("Eraser"));
            setSelectedMode("eraser");
          }}
        >
          Eraser
        </div>
      </div>
      <div className="drawingOptionBox">
        <div className="drawingOption">
          <p>Width</p>
          <input
            id="widthChange"
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
        <div className="drawingOption">
          <p>Opacity</p>
          <input
            id="opacityChange"
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
        <div className="drawingOption">
          <p>Color</p>
          <input
            id="colorChange"
            type="color"
            onChange={(event) => {
              dispatch(setLineColor(event.target.value));
            }}
          />
        </div>
      </div>
    </SidebarDrawingModeModalContainer>
  );
};

export default SidebarDrawingModeModal;
