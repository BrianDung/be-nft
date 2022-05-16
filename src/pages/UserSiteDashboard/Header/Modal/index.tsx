import {
    DialogContent as MuiDialogContent,
    DialogTitle as MuiDialogTitle,
    createStyles,
    withStyles,
    WithStyles,
    Typography,
    IconButton,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import useStyles from '../ConnectWalletModal/style';

export interface ComponentProps {
    opened: boolean;
    handleClose: (payload?: any) => void;
    width?: any;
}

const styles = () =>
    createStyles({
        root: {
            margin: 0,
            padding: 0,
            background: '#020616',
        },
        closeButton: {
            position: 'absolute',
            right: 12,
            top: 12,
            color: 'black',
            padding: 4,

            '&:hover': {
                backgroundColor: '#D4D4D4',
            },
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
    customClass?: string;
}

export const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, customClass, onClose, ...other } = props;

    const customStyles = {
        color: 'white',
    };

    return (
        <MuiDialogTitle disableTypography className={`${classes.root} ${customClass}`} {...other} style={customStyles}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <Close />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export const DialogContent = withStyles(() => ({
    root: {
        color: '#999999',
        borderBottom: 'none',
        borderTop: 'none',
    },
}))(MuiDialogContent);

export const ContentSection: React.FC<{
    title: string;
    className?: string;
}> = ({ children, className, title }) => {
    const styles = useStyles();

    return (
        <section className={className}>
            <Typography gutterBottom className={styles.dialogContentTypo}>
                {title}
            </Typography>
            <div className={styles.dialogContentBlock}>{children}</div>
        </section>
    );
};
