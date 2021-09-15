import { useEffect } from 'react';
import JohnWick from '@/assets/img/John-Wick.jpg';
import MainPageSvg from '@/assets/img/MainPage.svg';
import './index.less';

const prefixCls = 'test-img';

const TestImgRoute = () => {
  useEffect(() => {

  }, []);
  return (
    <div className={prefixCls}>
      <p>
        test img
      </p>
      <img src={JohnWick} alt="img" />
      <img src={MainPageSvg} alt="img" />
    </div>
  );
};

export default TestImgRoute;
