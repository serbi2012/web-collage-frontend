import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";

const EditModalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  top: 17vh;
  left: 90px;
  height: 50px;
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

  span {
    padding: 2px;
    color: ${COLORS.SUB_COLOR};
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    :hover {
      color: ${COLORS.MAIN_COLOR};
      background-color: ${COLORS.SUB_COLOR};
      opacity: 0.7;
    }

    :active {
      color: ${COLORS.MAIN_COLOR};
      background-color: ${COLORS.SUB_COLOR};
      opacity: 0.4;
    }
  }
`;

const EditModal = () => {
  const { selectedSidebarTool } = useSelector(
    ({ selectedSidebarTool }) => selectedSidebarTool
  );

  const [fontSize, setFontSize] = useState(null);
  const [fontName, setFontName] = useState(null);

  useEffect(() => {
    const editModal = document.getElementById("editModal");
    const scrapWindow = document.getElementById("scrapWindowContentBox");

    scrapWindow.addEventListener("mouseup", (event) => {
      if (
        !(
          editModal.getBoundingClientRect().top < event.clientY &&
          editModal.getBoundingClientRect().bottom > event.clientY &&
          editModal.getBoundingClientRect().left < event.clientX &&
          editModal.getBoundingClientRect().right > event.clientX
        )
      ) {
        editModal.style.top = `${event.clientY - 60}px`;
        editModal.style.left = `${event.clientX}px`;
      }
    });
  });

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
        onChange={(event) => {
          setFontName(event.target.value);
          document.execCommand("fontName", false, event.target.value);
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
        onChange={(event) => {
          setFontSize(event.target.value);
          document.execCommand("fontSize", false, event.target.value);
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
      <span
        class="material-symbols-outlined"
        onClick={() => {
          document.execCommand("bold");
        }}
      >
        format_bold
      </span>
      <span
        class="material-symbols-outlined"
        onClick={() => {
          document.execCommand("italic");
        }}
      >
        format_italic
      </span>
      <span class="material-symbols-outlined">attachment</span>
    </EditModalContainer>
  );
};

export default EditModal;
