import React from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  text-align: center;
  height: 100%;
  padding: 10px;
  background-color: #27292d;
  color: white;

  hr {
    margin: 30px 0;
    width: 200px;
  }

  .App-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .App-startScrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100px;
    color: #27292d;
    background-color: white;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .App-startScrap:hover {
    background-color: hsl(0, 0%, 90%);
  }

  .App-startScrap:active {
    background-color: hsl(0, 0%, 70%);
  }

  .App-startScrap > span {
    font-size: 50px;
  }
`;

const Popup = () => {
  return (
    <PopupContainer>
      <header className="App-header">
        <h1>Web Collage</h1>
      </header>
      <div
        className="App-startScrap"
        onClick={() => {
          window.open('main.html');
        }}
      >
        <span className="material-symbols-outlined">file_copy</span>
      </div>
      <h3>Scrap this page</h3>
      <hr />
      <h3>Enter shared page</h3>
      <input />
      <button>Connect</button>
    </PopupContainer>
  );
};

export default Popup;
