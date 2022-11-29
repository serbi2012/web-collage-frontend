import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";

const SortBoxOptionContainer = styled.div`
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

const SortBoxOption = ({
  alignItems,
  flexDirection,
  rotate,
  sortDirection,
}) => {
  const { selectedElement } = useSelector(
    ({ selectedElement }) => selectedElement
  );

  const sortBoxOnClick = () => {
    selectedElement.style.display = "flex";
    selectedElement.style.justifyContent = "center";
    selectedElement.style.alignItems = alignItems;
    selectedElement.style.flexDirection = flexDirection;
  };

  return (
    <SortBoxOptionContainer
      data-testid="sortBoxOption"
      className={`sortBox ${sortDirection} ${rotate && "rotate"}`}
      onClick={sortBoxOnClick}
    >
      <div className="smallFigure"></div>
      <div className="bigFigure"></div>
    </SortBoxOptionContainer>
  );
};

export default SortBoxOption;
