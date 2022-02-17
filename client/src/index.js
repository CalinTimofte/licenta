import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import {LocalStorageStore} from "./LocalStorageContext.js"

ReactDOM.render(
  <LocalStorageStore>
    <Router/>
  </LocalStorageStore>,
  document.getElementById('root')
);