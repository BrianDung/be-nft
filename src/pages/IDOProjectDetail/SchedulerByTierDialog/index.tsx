import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import SchedulerTable from './SchedulerTable';
import { useStyles } from './style';

const IconClose = "images/icons/icon-close.svg";
interface CloseIconProps {
    handleClose: () => void
}

interface SchedulerByTierProps {
    closeSchedulerByTier: ()=>void,
    isOpen: boolean
}

const CloseIcon = (props: CloseIconProps) => {
    const { handleClose } = props
    const classes = useStyles();
    return (
      <img className={classes.closeIcon} onClick={handleClose} src={IconClose} alt="" />
    )
}
const SchedulerByTierDialog = (props: SchedulerByTierProps) => {
    const {closeSchedulerByTier, isOpen } = props;
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={isOpen}
                onClose={closeSchedulerByTier}
                aria-labelledby="responsive-dialog-title"
                maxWidth='lg'
                className={classes.root}
            >
                <CloseIcon handleClose={closeSchedulerByTier} />
                <div className={classes.titleField}>
                    <DialogTitle>{'Schedule by Tiers'}</DialogTitle>
                </div>
                <DialogContent>
                    <div>
                        <SchedulerTable />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default SchedulerByTierDialog