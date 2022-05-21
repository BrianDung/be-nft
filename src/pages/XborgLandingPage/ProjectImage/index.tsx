import { useMediaQuery, useTheme } from '@material-ui/core';
import { ACCEPT_UPLOAD } from 'constants/upload';
import useAuth from 'hooks/useAuth';
import { useMemo, useState } from 'react';
import styles from './style.module.scss';
import { UploadImageModal } from './UploadImageModal';

const defaultImage = '/images/newPage/project-image.svg';
const UPLOAD_IMG = '/images/newPage/open-upload.svg';
const S3_IMG_URL = process.env.REACT_APP_PROJECT_IMG || defaultImage;

export const ProjectImage = () => {
  const { isAuth, connectedAccount: account } = useAuth();
  const [open, setOpen] = useState(false);
  const [alt, setAlt] = useState('project-image');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const canUpload = useMemo(() => {
    if (!account) {
      return false;
    }

    return isAuth && matches && ACCEPT_UPLOAD.has(account);
  }, [account, isAuth, matches]);

  function handleOpenUpload() {
    setOpen(canUpload);
  }

  function handleCloseUpload() {
    setOpen(false);
  }

  return (
    <>
      <div onClick={handleOpenUpload} className={styles['project-image-container']}>
        <img
          src={`${S3_IMG_URL}?time=${alt}`}
          alt="XBORG"
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
          open={open}
          onClose={handleCloseUpload}
        />
      )}
    </>
  );
};
