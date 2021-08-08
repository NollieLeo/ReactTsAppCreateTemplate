import React from 'react';

import { render } from 'react-dom';

type TestProps = {
  name: string
}

const Test = (props:TestProps) => {
  const {
    name,
  } = props;
  return <div>
    <h1>test React {name}</h1>
  </div>
}

render(<Test name="weng" />, window.document.getElementById('app'));