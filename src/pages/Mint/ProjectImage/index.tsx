import { useMediaQuery, useTheme } from '@material-ui/core';
import { UploadImageModal } from './UploadImageModal';
import useAuth from 'hooks/useAuth';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BaseRequest } from '../../../request/Request';
import { alert } from 'store/actions/alert';
import styles from './style.module.scss';

const defaultImage = '/images/newPage/project-image.svg';
const UPLOAD_IMG = '/images/newPage/open-upload.svg';
const S3_IMG_URL = process.env.REACT_APP_PROJECT_IMG || defaultImage;

export const ProjectImage = () => {
  const { isAuth, connectedAccount: account } = useAuth();
  const [open, setOpen] = useState(false);
  const [alt, setAlt] = useState('project-image');
  const theme = useTheme();
  const [admins, setAdmin] = useState<string[]>([]);
  const dispatch = useDispatch();

  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const canUpload = useMemo(() => {
    if (!account || !admins) {
      return false;
    }

    return isAuth && matches && admins.includes(account);
  }, [account, admins, isAuth, matches]);

  useEffect(() => {
    async function getAdminList() {
      try {
        const request = new BaseRequest();
        const res = await request.get('/getlist-admin');

        if (res.status !== 200) {
          throw new Error('Fail to get list admin');
        }

        const data = await res.json();

        if (data.status !== 200) {
          throw new Error(data.message);
        }

        setAdmin(data?.data?.map((item: any) => item.wallet_address));
      } catch (e: any) {
        dispatch(alert(e.message));
      }
    }

    if (isAuth) {
      getAdminList();
    }
  }, [dispatch, isAuth]);

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
          src={`${S3_IMG_URL}?time=${alt}&r=${new Date().getTime()}`}
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
          admins={admins}
          open={open}
          onClose={handleCloseUpload}
        />
      )}
    </>
  );
};
