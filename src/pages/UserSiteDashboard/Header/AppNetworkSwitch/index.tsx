import { Dialog } from "@material-ui/core";
import { APP_NETWORKS, appNetworkType } from "../../../../constants/network";

import useStyles from "./style";
import { ComponentProps, DialogContent, DialogTitle } from "../Modal";
import SwitchNetworkBox from "./SwitchNetworkBox";
import { useDispatch } from "react-redux";
import { NetworkUpdateType, settingAppNetwork } from "../../../../store/actions/appNetwork";

const AppNetworkSwitch: React.FC<ComponentProps> = ({ opened, handleClose }: ComponentProps) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleNetworkChange = (networkId: string) => {
    dispatch(settingAppNetwork(NetworkUpdateType.App, networkId));
    handleClose && handleClose();
  };

  return (
    <Dialog open={opened} onClose={handleClose} className={styles.dialog}>
      <div className={styles["dialog-container"]}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} customClass={styles.header}>
          Switch Network
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          {Object.keys(APP_NETWORKS).map((key: string) => {
            const network = APP_NETWORKS[key as appNetworkType];
            return <SwitchNetworkBox key={key} appNetwork={network} onClick={handleNetworkChange} />;
          })}
          {/* {appNetworkLoading && (
            <div className={styles.loadingIcon}>
              <img src="/images/loading.png" alt="loading" />
            </div>
          )} */}
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default AppNetworkSwitch;
