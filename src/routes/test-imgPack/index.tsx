import { useEffect } from 'react';
import MainPageSvg from '@/assets/img/MainPage.svg';
import './index.less';
import '../../main.less';

const prefixCls = 'test-img';

const TestImgRoute = () => {
  useEffect(() => {

  }, []);
  return (
    <div className={prefixCls}>
      <p>
        test img
      </p>
      <img src={MainPageSvg} alt="img" />
    </div>
  );
};

export default TestImgRoute;
