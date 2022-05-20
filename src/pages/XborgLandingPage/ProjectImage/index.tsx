import { ChangeEvent } from 'react';
import { CloudUpload } from '@material-ui/icons';
import styles from './style.module.scss';
import { IconButton } from '@material-ui/core';

const image = '/images/newPage/project-image.svg';

export const ProjectImage = () => {
  function onUploadImage(e: ChangeEvent<HTMLInputElement>) {
    const uploadImage = e.target?.files?.item(0);
    if (!uploadImage) {
      return;
    }

    console.log(uploadImage);
  }

  return (
    <div className={styles['project-image-container']}>
      <img src={image} alt="XBORG" />
      <IconButton component="label" htmlFor="upload-image-file" color="primary" className={styles['upload-btn']}>
        <CloudUpload fontSize="large" />
      </IconButton>
      <input id="upload-image-file" onChange={onUploadImage} type="file" accept="image/*" />
    </div>
  );
};
