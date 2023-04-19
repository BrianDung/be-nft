import { useMediaQuery, useTheme } from '@material-ui/core';
import { UploadImageModal } from './UploadImageModal';
import useAuth from 'hooks/useAuth';
import { useMemo, useState } from 'react';
import styles from './style.module.scss';
import useWindowDimensions from 'hooks/useWindowDimensions';

const defaultImage = '/images/newPage/project-image.svg';
const UPLOAD_IMG = '/images/newPage/open-upload.png';
const S3_IMG_URL = process.env.REACT_APP_PROJECT_IMG || defaultImage;

export const ProjectImage = () => {
  const { isAuth, connectedAccount: account } = useAuth();
  const [open, setOpen] = useState(false);
  const [alt, setAlt] = useState('project-image');
  const theme = useTheme();
  const [admins] = useState<string[]>([]);

  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const canUpload = useMemo(() => {
    if (!account || !admins) {
      return false;
    }

    return isAuth && matches && admins.includes(account);
  }, [account, admins, isAuth, matches]);

  function handleOpenUpload() {
    setOpen(canUpload);
  }

  function handleCloseUpload() {
    setOpen(false);
  }

  const { width } = useWindowDimensions();

  const isMobile = useMemo(() => {
    return width < 550;
  }, [width]);

  return (
    <>
      <div
        onClick={handleOpenUpload}
        className={styles['project-image-container']}
        style={isMobile ? { marginTop: 25 } : {}}
      >
        <img
          src={`${S3_IMG_URL}?time=${alt}&r=${new Date().getTime()}`}
          alt="Be-Nft"
          className={canUpload ? styles.canUpload : undefined}
          onError={(e) => {
            (e.target as any).src = defaultImage;
          }}
        />
        {canUpload && <img className={styles.upload} alt="upload" src={UPLOAD_IMG} />}
      </div>
      {canUpload && open && (
        <UploadImageModal
          onSuccess={() => {
            handleCloseUpload();
            setAlt('' + new Date().getTime());
          }}
          admins={admins}
          open={open}
          onClose={handleCloseUpload}
        />
      )}
    </>
  );
};
