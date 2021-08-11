import { useEffect } from 'react';
import JohnWick from '../../assets/img/John-Wick.jpg';

const TestRoute = () => {
  useEffect(() => {

  }, []);

  var a = 1;

  return (
    <div>
      hello world
      <img src={JohnWick} alt="img" />
    </div>
  );
};

export default TestRoute;
