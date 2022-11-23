import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";
import { setTheme } from "../../redux/reducers/theme";

const ThemeOptionContainer = styled.div`
  margin: 5px;
  height: 50px;
  width: 50px;
  border: 2px solid ${COLORS.MAIN_COLOR};
  border-radius: 5px;
  user-select: none;
  cursor: pointer;
`;

const ThemeOption = ({ theme }) => {
  const dispatch = useDispatch();

  const changeThemeOnMouseDown = () => {
    const boxes = document.getElementsByClassName("BoxComponent");

    for (let i = 0; i < boxes.length; i++) {
      boxes[i].style.boxShadow = `0 0 0 2px ${theme.BOX_BORDER}`;
    }

    dispatch(setTheme(`theme-${theme.NAME}`));
  };

  return (
    <ThemeOptionContainer
      style={{ backgroundColor: theme.BACKGROUND_COLOR }}
      onMouseDown={changeThemeOnMouseDown}
    />
  );
};

export default ThemeOption;
