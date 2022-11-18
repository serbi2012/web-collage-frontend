import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";

const SidebarBoxModeModalContainer = styled.div`
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

  hr {
    background-color: ${COLORS.MAIN_COLOR};
    height: 2px;
    width: 200px;
  }

  .sortContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    flex-wrap: wrap;
  }

  .sortBox {
    display: flex;
    justify-content: center;
    margin: 5px;
    padding: 10px 5px;
    height: 50px;
    width: 50px;
    background-color: ${COLORS.SUB_COLOR};
    border: 1px solid ${COLORS.MAIN_COLOR};
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    user-select: none;
    cursor: pointer;

    :hover {
      color: ${COLORS.SUB_COLOR};
      background-color: ${COLORS.MAIN_COLOR};

      .bigFigure,
      .smallFigure {
        border: 2px solid ${COLORS.SUB_COLOR};
      }
    }

    :active {
      opacity: 0.4;
    }
  }

  .sortTop {
    align-items: flex-start;
  }

  .sortCenter {
    align-items: center;
  }

  .sortBottom {
    align-items: flex-end;
  }

  .bigFigure {
    margin: 0 1px;
    height: 30px;
    width: 14px;
    border: 2px solid ${COLORS.MAIN_COLOR};
    border-radius: 2px;
  }

  .smallFigure {
    margin: 0 1px;
    height: 20px;
    width: 14px;
    border: 2px solid ${COLORS.MAIN_COLOR};
    border-radius: 2px;
  }

  .rotate {
    transform: rotate(270deg);
  }
`;

const SidebarBoxModeModal = () => {
  const { selectedSidebarTool, isSidebarModalOpen } = useSelector(
    ({ selectedSidebarTool }) => selectedSidebarTool
  );

  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    const scrapWindow = document.getElementById("scrapWindowContentBox");

    scrapWindow.addEventListener("mousedown", (event) => {
      setSelectedElement(event.target);
    });
  }, []);

  return (
    <SidebarBoxModeModalContainer
      style={{
        display:
          (selectedSidebarTool !== "boxMode" || !isSidebarModalOpen) && "none",
      }}
    >
      <h3>Box Mode</h3>
      <h4>Add Box</h4>
      <div
        className="sidebarModeOption"
        onClick={() => {
          const boxes = document.getElementsByClassName("BoxComponent");
          const scrapWindow = document.getElementById("scrapWindowContentBox");
          const copiedBox = boxes[0].cloneNode(false);

          scrapWindow.insertAdjacentElement("beforeend", copiedBox);
        }}
      >
        Add Box
      </div>
      <hr />
      <div className="sortContainer">
        <div
          className="sortBox sortTop"
          onClick={() => {
            selectedElement.style.display = "flex";
            selectedElement.style.justifyContent = "center";
            selectedElement.style.alignItems = "flex-start";
            selectedElement.style.flexDirection = "row";
          }}
        >
          <div className="smallFigure"></div>
          <div className="bigFigure"></div>
        </div>
        <div
          className="sortBox sortCenter"
          onClick={() => {
            selectedElement.style.display = "flex";
            selectedElement.style.justifyContent = "center";
            selectedElement.style.alignItems = "center";
            selectedElement.style.flexDirection = "row";
          }}
        >
          <div className="smallFigure"></div>
          <div className="bigFigure"></div>
        </div>
        <div
          className="sortBox sortBottom"
          onClick={() => {
            selectedElement.style.display = "flex";
            selectedElement.style.justifyContent = "center";
            selectedElement.style.alignItems = "flex-end";
            selectedElement.style.flexDirection = "row";
          }}
        >
          <div className="smallFigure"></div>
          <div className="bigFigure"></div>
        </div>
        <div
          className="sortBox sortTop rotate"
          onClick={() => {
            selectedElement.style.display = "flex";
            selectedElement.style.justifyContent = "center";
            selectedElement.style.alignItems = "flex-start";
            selectedElement.style.flexDirection = "column";
          }}
        >
          <div className="smallFigure"></div>
          <div className="bigFigure"></div>
        </div>
        <div
          className="sortBox sortCenter rotate"
          onClick={() => {
            selectedElement.style.display = "flex";
            selectedElement.style.justifyContent = "center";
            selectedElement.style.alignItems = "center";
            selectedElement.style.flexDirection = "column";
          }}
        >
          <div className="smallFigure"></div>
          <div className="bigFigure"></div>
        </div>
        <div
          className="sortBox sortBottom rotate"
          onClick={() => {
            selectedElement.style.display = "flex";
            selectedElement.style.justifyContent = "center";
            selectedElement.style.alignItems = "flex-end";
            selectedElement.style.flexDirection = "column";
          }}
        >
          <div className="smallFigure"></div>
          <div className="bigFigure"></div>
        </div>
      </div>
    </SidebarBoxModeModalContainer>
  );
};

export default SidebarBoxModeModal;
