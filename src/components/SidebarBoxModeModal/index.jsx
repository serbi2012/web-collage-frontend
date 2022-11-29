import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import SORT_BOX_OPTION from "../../constants/SORT_BOX_OPTION";
import { setSelectedElement } from "../../redux/reducers/selectedElement";
import SortBoxOption from "../SortBoxOption";

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
    min-width: 230px;
    flex-wrap: wrap;
  }
`;

const SidebarBoxModeModal = () => {
  const { selectedSidebarTool, isSidebarModalOpen } = useSelector(
    ({ selectedSidebarTool }) => selectedSidebarTool
  );

  const { selectedElement } = useSelector(
    ({ selectedElement }) => selectedElement
  );

  const [isBoxBorder, setIsBoxBorder] = useState(true);

  const dispatch = useDispatch();

  const addBoxOnClick = () => {
    const box = document.createElement("div");
    const scrapWindow = document.getElementById("scrapWindowContentBox");

    box.style.display = "flex";
    box.style.justifyContent = "flex-start";
    box.style.alignItems = "center";
    box.style.flexDirection = "column";
    box.style.margin = "5px 0";
    box.style.padding = "10px";
    box.style.width = "500px";
    box.style.boxShadow = "0 0 0 2px #ccc";

    box.classList.add("BoxComponent");
    scrapWindow.insertAdjacentElement("beforeend", box);
  };

  const toggleBoxBorderOnClick = () => {
    const boxes = document.getElementsByClassName("BoxComponent");

    for (let i = 0; i < boxes.length; i++) {
      if (isBoxBorder) {
        boxes[i].style.boxShadow = "none";
      } else {
        boxes[i].style.boxShadow = "0 0 0 2px #ccc";
      }
    }

    setIsBoxBorder(!isBoxBorder);
  };

  useEffect(() => {
    const scrapWindow = document.getElementById("scrapWindowContentBox");

    const selectElementOnMousedown = (event) => {
      if (event.target !== scrapWindow) {
        dispatch(setSelectedElement(event.target));
      }
    };

    const deleteElementOnKeydown = (event) => {
      if (selectedSidebarTool !== "boxMode") return;
      console.log("window.addEventListener ~ event.keyCode", event.keyCode);

      if (event.keyCode === 46 || event.keyCode === 8) {
        selectedElement.remove();
      }
    };

    scrapWindow.addEventListener("mousedown", selectElementOnMousedown);
    window.addEventListener("keydown", deleteElementOnKeydown);

    return () => {
      scrapWindow.removeEventListener("mousedown", selectElementOnMousedown);
      window.removeEventListener("keydown", deleteElementOnKeydown);
    };
  }, [selectedSidebarTool, selectedElement]);

  return (
    <SidebarBoxModeModalContainer
      style={{
        display:
          (selectedSidebarTool !== "boxMode" || !isSidebarModalOpen) && "none",
      }}
    >
      <h3>Box Mode</h3>
      <div className="sidebarModeOption" onClick={addBoxOnClick}>
        Add Box
      </div>
      <div
        className="sidebarModeOption"
        onClick={() => {
          selectedElement.remove();
        }}
      >
        Delete Element
      </div>
      <hr />
      <div className="sidebarModeOption" onClick={toggleBoxBorderOnClick}>
        Toggle Box Border
      </div>
      <hr />
      <div className="sortContainer">
        {SORT_BOX_OPTION?.map((value, index) => {
          return (
            <SortBoxOption
              alignItems={value.alignItems}
              flexDirection={value.flexDirection}
              rotate={value.rotate}
              sortDirection={value.sortDirection}
              key={index}
            />
          );
        })}
      </div>
    </SidebarBoxModeModalContainer>
  );
};

export default SidebarBoxModeModal;
