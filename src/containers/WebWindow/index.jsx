import React from "react";
import styled from "styled-components";

const WebWindowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc((100vw - 70px) / 2);
  height: 100vh;

  iframe {
    height: 100%;
    width: 100%;
    border: none;
  }
`;

const WebWindow = () => {
  return (
    <WebWindowContainer>
      <iframe
        src="https://www.google.com/"
        sandbox="allow-scripts allow-modals allow-top-navigation allow-same-origin allow-forms allow-popups"
        allow="clipboard-read; clipboard-write"
      />
    </WebWindowContainer>
  );
};

export default WebWindow;
