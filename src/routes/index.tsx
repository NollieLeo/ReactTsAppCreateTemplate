import { useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import forEach from 'lodash/forEach';
import TestAntd, { helloworlkd } from './test-antd';

const TestRoute = lazy(() => import('./test-route'));
const TestImg = lazy(() => import('./test-imgPack'));

const RouteIndex = () => {
  useEffect(() => {
    forEach(new Array(3).fill(0), () => {
      console.log('rest hellowdsadsad'); // sdasd
    });
  }, []);

  return (
    <Router>
      <h1>test Webpack 5 by weng</h1>
      <p>this is a demo s s</p>
      <TestAntd />
      <Suspense fallback={<span />}>
        <Route component={TestRoute} path="/test-route" />
        <Route component={TestImg} path="/test-img" />
      </Suspense>
    </Router>
  );
};

export default RouteIndex;
