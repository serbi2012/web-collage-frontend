import React, { useEffect } from "react";
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
  width: 250px;
  background-color: ${COLORS.MAIN_COLOR};
  border-radius: 5px;
  z-index: 200000;

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
      style={{
        display: selectedSidebarTool !== "editMode" && "none",
      }}
    >
      <select name="fontType" id="fontType">
        <option value="inter">inter</option>
        <option value="gothic">gothic</option>
      </select>
      <select name="fontSize" id="fontSize">
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
      </select>
      <span
        class="material-symbols-outlined"
        onClick={() => {
          // var selected = window.getSelection().getRangeAt(0);

          // var node = document.createElement("b");
          // node.innerText = selected;

          // selected.deleteContents();
          // selected.insertNode(node);
          window.getSelection().execCommand("bold");
        }}
      >
        format_bold
      </span>
      <span class="material-symbols-outlined">format_italic</span>
      <span class="material-symbols-outlined">attachment</span>
    </EditModalContainer>
  );
};

export default EditModal;
