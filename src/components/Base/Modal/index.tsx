import { Modal } from 'antd';
import React from 'react';
import './index.scss';

const BeModal = (props: any) => {
  const { visible, onOk, onCancel, tittle } = props;
  return (
    <Modal title={tittle} visible={visible} onOk={onOk} onCancel={onCancel}>
      {props.children}
    </Modal>
  );
};

export default BeModal;
