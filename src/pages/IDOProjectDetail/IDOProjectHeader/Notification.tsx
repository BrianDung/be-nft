import { ReactNode, useState } from 'react';
import useStyles from './styles';

interface NotificationProps {
  type: 'warning' | 'infor' | 'success' | 'star';
  children: ReactNode;
}

const data = {
  warning: {
    src: '/images/icons/warning-white.svg',
    background: '#8203D0',
  },
  infor: {
    src: '/images/icons/icon-info.svg',
    background: '#244A9C',
  },
  success: {
    src: '/images/icons/success-icon.svg',
    background: '#244A9C',
  },
  star: {
    src: '/images/icons/Star.svg',
    background: 'linear-gradient(90.08deg, #A84DFF -58.13%, #454CF9 24.91%, #454CF9 100.35%)',
  },
};

// eslint-disable-next-line
export default (props: NotificationProps) => {
  const styles = useStyles();
  const { type, children } = props;
  const [isHidden, setIsHidden] = useState<boolean>(false);

  if (isHidden) return null;

  return (
    <div className={styles.notification} style={{ backgroundColor: data[type].background }}>
      <img src={data[type].src} style={{ marginRight: '10px', marginLeft: '17px' }} alt="" />
      {children}
      <img
        src="/images/icons/xBanner.svg"
        style={{ marginLeft: 'auto', marginRight: '17px' }}
        onClick={() => setIsHidden(true)}
        alt=""
      />
    </div>
  );
};
