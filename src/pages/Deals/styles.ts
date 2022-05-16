import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        '& .MuiPaper-root': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            backgroundColor: 'black',
            color: 'white',
            '& .MuiTabs-root': {
                '& .MuiTab-root': {
                    textTransform: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    lineHeight: '20px',
                    [theme.breakpoints.down('sm')]: {
                        minWidth: '100px',
                    },
                },
                '& .MuiTabs-indicator': {
                    height: '4px',
                },
                '& .Mui-selected': {
                    color: '#A84DFF',
                    opacity: 1,
                    background: '#121327',
                    borderRadius: '10px 10px 0px 0px',
                },
            },
        },
        '& .MuiAppBar-root': {
            backgroundColor: '#06071C',
        },
    },
    pageTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontWeight: 600,
        fontSize: '32px',
        lineHeight: '45px',
        color: '#fff',
    },
    tabHeader: {
        '& .MuiAppBar-colorPrimary': {
            backgroundColor: 'none',
            color: 'white',
        },
        [theme.breakpoints.only('xs')]: {
            display: 'none',
        },
    },
    tabPanelWrap: {},
    formControlSelect: {
        display: 'none',
        width: '95%',
        background: '#222228',
        border: '1px solid #44454B',
        borderRadius: 4,

        [theme.breakpoints.down('sm')]: {
            marginRight: 0,
            width: '100%',
        },
        [theme.breakpoints.only('xs')]: {
            display: 'block',
            width: '100%',
        },
    },

    selectBox: {
        fontFamily: 'Helvetica',
        fontSize: 14,
        lineHeight: '20px',
        color: '#FFFFFF',
        height: 36,
        width: '100%',

        '&::before, &::after': {
            display: 'none',
        },

        '& select': {
            paddingLeft: 12,
            paddingTop: 0,
            paddingBottom: 0,
            height: 22,
        },

        '& .MuiSelect-select option': {
            backgroundColor: '#222228',
        },

        '& .MuiSelect-icon': {
            color: '#FFFFFF',
            fontSize: 20,
            top: 'calc(50% - 10px)',
            right: 4,
        },
    },

    selectBoxType: {
        width: 120,
    },
}));

export const useTabPanelStyles = makeStyles((theme: Theme) => ({
    root: {
        color: 'white',
        padding: '40px 0 50px',
        minHeight: '90vh',
    },
    [theme.breakpoints.down('xs')]: {
        root: {
            padding: '16px 0',
        },
    },
}));
