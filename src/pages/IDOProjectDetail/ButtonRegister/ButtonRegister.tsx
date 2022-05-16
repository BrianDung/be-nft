import { Button } from "@material-ui/core";
import { useStyles } from "./style";
import { joinPool } from "../../../request/pool";

interface ButtonRegisterProps {
  title: string;
}

const ButtonRegister = (props: ButtonRegisterProps) => {
  const campaign_id = 1;
  const classes = useStyles();
  const { title } = props;
  const onClickRegisterToJoin = async () => {
    const res = await joinPool({ campaign_id }).then((response) => response.json());
    console.log(res);
  };
  return (
    <Button onClick={onClickRegisterToJoin} className={classes.root}>
      {title}
    </Button>
  );
};

export default ButtonRegister;
