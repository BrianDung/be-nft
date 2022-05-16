import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return {
        switchNetworkBox: {
            border: '2px solid transparent',
            padding: '13px 15px 13px 20px',
            width: 220,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: '.1s all linear',
            boxSizing: 'border-box',
            borderRadius: 10,
            backgroundColor: '#fff',
            position: 'relative',
            boxShadow: '0px 3px 50px rgba(0, 0, 0, 0.078)',
            margin: '10px 30px 0',
            '&:last-child': {
                marginBottom: 17,
            },
            '&:first-child': {
                marginTop: 20,
            },
            '&__content': {
              display: "flex",
              alignItems: 'center',
            }
        },
        activeNetwork: {
            border: '1px solid #07D600',
        },
        boxTitle: {
            color: '#0B111B',
            margin: '0 0 0 10px',
            textAlign: 'center',
            fontFamily: 'Montserrat-Regular',
            opacity: 0.5,
            fontSize: 14,
        },
        walletBoxIcon: {
            width: 30,
        },
        activeMark: {
        },
        [theme.breakpoints.down('xs')]: {
            walletBox: {
                '&:not(:first-child)': {
                    marginLeft: 0,
                },
            },
        },
    };
});

export default useStyles;
