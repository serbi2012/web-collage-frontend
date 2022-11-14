import React from 'react';
import styled from 'styled-components';

const ScrapWindowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc((100vw - 70px) / 2);
  height: 100vh;
  border-right: 3px solid #27292d;
`;

const ScrapWindow = () => {
  return (
    <ScrapWindowContainer>
      <div></div>
    </ScrapWindowContainer>
  );
};

export default ScrapWindow;
