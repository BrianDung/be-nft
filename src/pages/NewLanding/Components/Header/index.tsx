import { useStyles } from './style';

interface HeaderProps {
  content: string;
}

const Header = (props: HeaderProps) => {
  const classes = useStyles();

  const { content } = props;
  return (
    <div className={classes.root}>
      <span className={classes.content}>{content}</span>
      <span className={classes.borderLine}></span>
    </div>
  );
};
export default Header;
