import React from 'react';
import { render } from 'react-dom';
import './index.css';

const Main = () => {
  return <div>Main Page</div>;
};

render(<Main />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
