import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import DBTest from './DBTest';
import {LocalStorageStore} from "./LocalStorageContext.js"

ReactDOM.render(
  <LocalStorageStore>
    <DBTest/>
  </LocalStorageStore>,
  document.getElementById('root')
);