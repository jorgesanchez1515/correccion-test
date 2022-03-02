import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import './index.scss';

import 'semantic-ui-css/semantic.min.css';
import "react-toastify/dist/ReactToastify.css";
import App from './App';

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

