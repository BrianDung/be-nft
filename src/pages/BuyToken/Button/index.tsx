import React from 'react';
import useStyles from './style';
import { BeatLoader } from 'react-spinners';

type ButtonPropsType = {
  backgroundColor?: string;
  text: string;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  style?: {};
};

const Button: React.FC<ButtonPropsType> = (props: ButtonPropsType) => {
  const styles = useStyles({
    background: props.backgroundColor || 'transparent',
  });
  const { style, text = '', disabled = false, onClick, loading = false } = props;
  const customStyle = {
    ...style,
  };

  return (
    <button style={customStyle} className={styles.button} disabled={disabled || loading} onClick={onClick}>
      {loading ? <BeatLoader color={'white'} size={8} /> : `${text}`}
    </button>
  );
};

export default Button;
