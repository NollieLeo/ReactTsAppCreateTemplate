import { useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

const TestRoute = lazy(() => import('./test-route'));
const TestImg = lazy(() => import('./test-imgPack'));

const RouteIndex = () => {
  useEffect(() => {
    console.log('rest');
  }, []);

  return (
    <Router>
      <h1>test React</h1>
      <Suspense fallback={<span />}>
        <Route component={TestRoute} path="/test-route" />
        <Route component={TestImg} path="/test-img" />
      </Suspense>
    </Router>
  );
};

export default RouteIndex;
