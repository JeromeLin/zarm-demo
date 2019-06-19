
import 'core-js/es';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { LocaleProvider } from 'zarm';
import zhCN from 'zarm/lib/locale-provider/locale/zh_CN.js';
// import enUS fr./pparm/lib/locale-provider/locale/en_US.js';
import cssVars from 'css-vars-ponyfill';
import App from './App';

cssVars();

ReactDOM.render((
  <LocaleProvider locale={zhCN}>
    <HashRouter>
      <App />
    </HashRouter>
  </LocaleProvider>
), document.getElementById('app'));
