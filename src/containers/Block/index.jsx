import React from "react";
import styled from "styled-components";

const BlockContainer = styled.div``;

const Block = ({ html }) => {
  return (
    <BlockContainer>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </BlockContainer>
  );
};

export default Block;
