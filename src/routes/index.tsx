import { useEffect, lazy } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

const TestRoute = lazy(() => import('./test-route'));

const RouteIndex = () => {
  useEffect(() => {
    console.log('rest');
  }, []);

  return (
    <Router>
      <h1>test React</h1>
      <Route component={TestRoute} path="/test-route" />
    </Router>
  );
};

export default RouteIndex;
