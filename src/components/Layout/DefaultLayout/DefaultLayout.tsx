import React from 'react';
import MainDefaultLayout from '../../Base/MainDefaultLayout';
import FooterLandingLayout from '../../Base/FooterLandingLayout';
import { useCommonStyle } from '../../../styles';

const DefaultLayout = (props: any) => {
  const commonStyle = useCommonStyle();

  return (
    <div className={commonStyle.DefaultLayout}>
      <div className={commonStyle.bgBody}>
        <MainDefaultLayout>{props.children}</MainDefaultLayout>
        <FooterLandingLayout/>
      </div>
    </div>
  );
};

export default DefaultLayout;
