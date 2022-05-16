import MainDefaultLayout from '../../Base/MainDefaultLayout';
import FooterLandingLayout from '../../Base/FooterLandingLayout';
import { useCommonStyle } from '../../../styles';

const LandingLayout = (props: any) => {
  const commonStyle = useCommonStyle();

  return (
    <div className={commonStyle.DefaultLayout} style={{background: '#020618'}}>
      <MainDefaultLayout backgroundColor="#020618">{props.children}</MainDefaultLayout>
      <FooterLandingLayout/>
    </div>
  );
};

export default LandingLayout;