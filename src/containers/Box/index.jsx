import React from "react";
import styled from "styled-components";

const BoxContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  width: 500px;
  border: 2px solid #ccc;
`;

const Box = ({ content }) => {
  return <BoxContainer>{content}</BoxContainer>;
};

export default Box;
