import React from 'react';
import { render } from 'react-dom';
import RouteEntry from './routes';
import './index.less';

render(
  <RouteEntry />,
  window.document.getElementById('app'),
);
