import { Dialog } from '@material-ui/core';
import { Button } from 'components/Base/Form/Button';
import useAuth from 'hooks/useAuth';
import { useWalletSignatureAsync } from 'hooks/useWalletSignatureAsync';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { BaseRequest } from '../../../../request/Request';
import {alert } from 'store/actions/alert';
import styles from './styles.module.scss';
import { useState } from 'react';

interface UploadImageModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  admins: string[];
}

const ACCEPT_FILE_SIZE = 8 * 1024 * 1024;
const UPLOAD_IMG = '/images/newPage/upload-img.svg';
const CHECK_ICON = '/images/newPage/check.svg';
const FAIL_ICON = '/images/newPage/X.svg';

function getFileName(fileName: string) {
  if (!fileName) {
    return;
  }

  if (fileName.length < 41) {
    return fileName;
  }

  const splitName = fileName.split('.');
  const fileExtension = splitName[splitName.length - 1];
  const first32Character = fileName.slice(0, 32);
  const lastSplitName = splitName[splitName.length - 2];
  const lastCharacter = lastSplitName.charAt(lastSplitName.length - 1);

  return `${first32Character}...${lastCharacter}.${fileExtension}`;
}

const getFileSize = async (event: any): Promise<any> => {
  const file = await (event.dataTransfer ? event?.dataTransfer?.files[0] : event[0].getFile());

  if (!file?.type?.includes('image')) {
    return [file];
  }

  const promise = new Promise((resolve, reject) => {
    const image = new Image();
    let url: string;
    image.onload = function () {
      file.width = image.width;
      file.height = image.height;
      resolve(file);
    };
    url = URL.createObjectURL(file);
    image.src = url;
  });

  return await Promise.all([promise]);
};

export const UploadImageModal = ({ open, onClose, onSuccess, admins }: UploadImageModalProps) => {
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
    open: openUpload,
  } = useDropzone({
    multiple: false,
    maxSize: ACCEPT_FILE_SIZE,
    accept: {
      'image/svg': ['.svg', '.png', '.jpg'],
      'image/png': ['.svg', '.png', '.jpg'],
      'image/jpg': ['.svg', '.png', '.jpg'],
    },
    getFilesFromEvent: getFileSize,
    validator: function (file: any) {
      //   if (file?.width !== 1024 || file?.height !== 1024) {
      //     return {
      //       code: 'invalid-file-dimension',
      //       message: 'The size of the file must be 1024x1024 px',
      //     };
      //   }

      return null;
    },
  });

  const { web3Sign } = useWalletSignatureAsync();
  const { connectedAccount } = useAuth();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    try {
      if (!open || acceptedFiles.length === 0 || !admins.includes(connectedAccount ?? '')) {
        onClose();
        return;
      }

      setLoading(true);

      const signature = await web3Sign(connectedAccount, true);

      const form = new FormData();
      form.append('banner', acceptedFiles[0]);
      const request = new BaseRequest();
      const res = await request.postImage('/upload-image', signature, connectedAccount, form);

      if (res.status !== 200) {
        throw new Error('Fail to upload image');
      }

      const data = await res.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      dispatch(alert('Change image success'));
      onSuccess();
    } catch (e: any) {
      dispatch(alert(e.massage));
    } finally {
      setLoading(false);
    }
  }

  const hasNotUpload = (acceptedFiles.length === 0 && fileRejections.length) === 0;

  return (
    <Dialog className={styles.modal} open={open} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Upload a new NFT image</h2>
        <section {...getRootProps({ className: styles.dropzone })}>
          <input {...getInputProps()} type="file" hidden />
          <img alt="Drop zone" src={UPLOAD_IMG} />
          <p>
            Drag and drop or <span>browser</span>
          </p>
        </section>
        <section className={styles.tips}>
          <p>1. You can upload only files with SVG, PNG, JPG formats.</p>
          <p>2. The size of the file must be 1024x1024 px.</p>
          <p>3. The file size should not exceed 8mb.</p>
        </section>
        <PreviewFile tryAgain={openUpload} rejectedFiles={fileRejections} acceptedFiles={acceptedFiles} />
        <section className={styles.action}>
          <Button onClick={onClose} className={styles.cancel}>
            Cancel
          </Button>
          <Button
            disabled={hasNotUpload || fileRejections.length > 0 || loading}
            onClick={handleUpload}
            className={styles.confirm}
          >
            Confirm
          </Button>
        </section>
      </div>
    </Dialog>
  );
};

function PreviewFile({
  acceptedFiles,
  rejectedFiles,
  tryAgain,
}: {
  acceptedFiles: File[];
  rejectedFiles: FileRejection[];
  tryAgain: () => void;
}) {
  if (acceptedFiles.length > 0) {
    return (
      <section className={`${styles.preview} ${styles.success}`}>
        {acceptedFiles.map((file) => {
          const url = URL.createObjectURL(file);

          return (
            <>
              <img alt={file.name} src={url} />
              <p>{getFileName(file.name)}</p>
              <img alt="check" src={CHECK_ICON} />
            </>
          );
        })}
      </section>
    );
  }

  if (rejectedFiles.length > 0) {
    return (
      <section className={`${styles.preview} ${styles.failed}`}>
        <img alt="Oops" src={FAIL_ICON} />
        <h3>Oops... Upload failed.</h3>
        <p>The file is not valid.</p>
        <span onClick={tryAgain}>Try again</span>
      </section>
    );
  }

  return <></>;
}
