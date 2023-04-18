import { Modal } from 'antd';
import { Button } from 'components/Base/Form/Button';
import { useState } from 'react';
import './index.scss';

export const SummitedModal = (props: any) => {
  const { visible, onOk, onCancel, onSubmited } = props;
  const [value, setValue] = useState('');
  const handleOnChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <Modal title="SUBMIT YOUR WALLET ADDRESS" visible={visible} onOk={onOk} onCancel={onCancel} footer={false}>
      <div className="container-modal">
        <div>
          <input className="input" onChange={handleOnChange} />
        </div>
        <div className="wrap-button">
          <Button
            className="submit-btn"
            onClick={() => {
              onSubmited(value);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};
