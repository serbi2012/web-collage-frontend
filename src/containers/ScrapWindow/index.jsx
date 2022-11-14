import React from "react";
import styled from "styled-components";
import COLORS from "../../constants/COLORS";

const ScrapWindowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc((100vw - 70px) / 2);
  height: 100vh;
  border-right: 3px solid ${COLORS.MAIN_COLOR};
`;

const ScrapWindow = () => {
  return <ScrapWindowContainer></ScrapWindowContainer>;
};

export default ScrapWindow;
