import React from "react";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";

const EditModalOptionContainer = styled.div`
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
`;

const EditModalOption = ({ option, icon }) => {
  return (
    <EditModalOptionContainer>
      <span
        className="material-symbols-outlined"
        onMouseDown={() => {
          document.execCommand(option);
        }}
      >
        {icon}
      </span>
    </EditModalOptionContainer>
  );
};

export default EditModalOption;
