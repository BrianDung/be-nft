import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
    return {
        pageSlider: {
            padding: '30px 20px 18px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '15px',
            [theme.breakpoints.down('xs')]: {
                marginBottom: '20px',
                justifyContent: 'center',
                flexDirection: 'column',
            },
            "@media (min-width: 960px)": {
                padding: '28px 10px 18px 0',
            },
        },
        textHeader: {
            fontFamily: 'Montserrat-Regular !important',
            fontSize: '14px',
            fontWeight: 500,
        },
        accountInfo: {
            display: 'flex',
            cursor: 'pointer',
            border: '2px solid #2B313A',
            padding: '9px 20px',
            borderRadius: 8,
            [theme.breakpoints.down('md')]: {
                width: "auto",
                justifyContent: 'flex-end',
                padding: '6px 9px',
            },
            '&__networks': {
                display: 'flex',
                alignItems: 'center',
                '& > *': {
                    marginRight: 10,
                },
                borderRight: '3px solid #2B313A',
                marginRight: 10,
                color: '#A84DFF',
                '& > p': {
                    marginBottom: 0,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Regular',
                    lineHeight: '24px',
                },
            },
            '&__balance': {
                color: '#FFFFFF',
                fontSize: '14px',
                marginBottom: 0,
                fontFamily: 'Montserrat-Regular',
                lineHeight: '24px',
            },
        },
        'connect-wallet': {
            gap: '15px',
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column-reverse',
            },
        },
        textnetworks: {
            color: '#FFFFFF',
            fontSize: '14px',
            textAlign: 'right',
            marginBottom: 0,
            '&.MuiInput-underline:before': {
                borderBottom: 'none',
            },
            '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: 'none',
            },
            '&.MuiInput-underline:after': {
                borderBottom: 'none',
            },
        },
        listnetwork: {
            background: '#2B313A',
            borderRadius: '40px',
            display: 'flex',
            alignItems: 'center',
            height: '42px',
            justifyContent: 'center',
            gap: '10px',
            padding: '12px 20px',
            cursor: 'pointer',
            '& .MuiSelect-icon': {
                display: 'none',
            },
            [theme.breakpoints.down('sm')]: {
                width: 300,
            },
        },
        networkName: {
            marginBottom: 0,
        },
        'network-icon': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        'accountInfo-icon': {
            margin: '0 21px 0 24px',
            width: 25,
            height: 25,
            borderRadius: '50%',
            background: '#8247E5',
            '& > img': {
                width: 13,
            },
        },
        'listNetwork-icon': {
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: '#8247E5',
            '& > img': {
                width: 12,
            },
            '&.eth >img': {
                marginBottom: 10,
            },
        },
        'eth-icon': {
            background: 'none',
            '& > img': {
                width: '100%',
            },
        },
    };
});

export default useStyles;
