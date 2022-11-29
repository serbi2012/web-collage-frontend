import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import EDIT_MODAL_OPTIONS from "../../constants/EDIT_MODAL_OPTIONS";
import EditModalOption from "../EditModalOption";

const EditModalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  top: 10px;
  left: 80px;
  height: 4rem;
  background-color: ${COLORS.MAIN_COLOR};
  border-radius: 5px;
  z-index: 200000;
  user-select: none;

  select {
    color: ${COLORS.SUB_COLOR};
    background-color: ${COLORS.MAIN_COLOR};
    border: none;

    :focus {
      outline: none;
    }
  }

  .verticalLine {
    margin: 0 10px;
    height: 25px;
    width: 1px;
    background-color: ${COLORS.SUB_COLOR};
  }
`;

const EditModal = () => {
  const { selectedSidebarTool } = useSelector(
    ({ selectedSidebarTool }) => selectedSidebarTool
  );

  const [fontSize, setFontSize] = useState(null);
  const [fontName, setFontName] = useState(null);

  const changeFontOption = (event, option) => {
    setFontName(event.target.value);
    document.execCommand(option, false, event.target.value);
  };

  return (
    <EditModalContainer
      id="editModal"
      contentEditable={false}
      style={{
        display: selectedSidebarTool !== "editMode" && "none",
      }}
    >
      <select
        name="fontType"
        id="fontType"
        value={fontName}
        onChange={() => {
          changeFontOption(event, "fontName");
        }}
      >
        <option value="monospace">Monospace</option>
        <option value="Arial">Arial</option>
        <option value="Impact">Impact</option>
        <option value="Georgia">Georgia</option>
        <option value="Verdana">Verdana</option>
      </select>
      <select
        name="fontSize"
        id="fontSize"
        value={fontSize}
        onChange={() => {
          changeFontOption(event, "fontSize");
        }}
      >
        <option value="1">10</option>
        <option value="2">13</option>
        <option value="3">16</option>
        <option value="4">18</option>
        <option value="5">24</option>
        <option value="6">32</option>
        <option value="7">48</option>
      </select>
      <div className="verticalLine" />
      {EDIT_MODAL_OPTIONS.map((value, index) => {
        return (
          <EditModalOption
            option={value.OPTION}
            icon={value.ICON}
            key={index}
          />
        );
      })}
    </EditModalContainer>
  );
};

export default EditModal;
