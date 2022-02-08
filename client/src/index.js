import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import {LocalStorageStore} from "./LocalStorageContext.js"

ReactDOM.render(
  <LocalStorageStore>
    <App/>
  </LocalStorageStore>,
  document.getElementById('root')
);