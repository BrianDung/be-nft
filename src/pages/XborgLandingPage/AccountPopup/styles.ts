import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => {
    return {
        dialog: {
            '& .MuiPaper-root': {
                borderRadius: 10,
                width: 280,
                position: 'relative',
            },
        },
        'user-info': {
            margin: '0 30px',
            '& > button.MuiButton-root': {
                marginTop: '25px',
                width: '100%',
                padding: '13.5px 47px',
                borderRadius: 40,
                border: '1px solid #F22222',
                '& > .MuiButton-label': {
                    color: '#ff0000',
                    fontSize: 14,
                    fontWeight: 700,
                    textTransform: 'initial',
                },
            },
            '& > div > div:last-child': {
                marginBottom: 0,
            },
        },
        'dialog-container': {
            background: '#fff',
            padding: '30px 0px 46px',
        },
        'dialog-header': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 30px 20px 30px',
            '& > h6': {
                color: '#000000',
                fontSize: 18,
                lineHeight: '25px',
                fontFamily: 'Montserrat-Medium',
                margin: 0,
            },
            '& > img': {
                cursor: 'pointer',
            },
        },
        'header-title': {
            cursor: 'pointer',
            display: 'flex',
            marginBottom: 11,
            '& > img': {
                marginLeft: 19,
            },
        },
        'account-info': {
            background: '#fff',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            padding: '13px 20px',
            margin: '21px 30px 18px',
            justifyContent: "space-between",
            boxShadow: '0px 3px 50px rgba(0, 0, 0, 0.078)',
            '& > p': {
                fontFamily: 'Montserrat-Medium',
                fontSize: 14,
                color: "#0B111B",
                opacity: 0.5,
                margin: "0 10px"
            },
            '& > img:last-child': {
                cursor: "pointer"
            }
        },
        'account-address': {
            display: 'flex',
            alignItems: 'center',
            marginRight: 15,
            '& > img': {
                marginRight: 15,
            },
            '& > p': {
                margin: 0,
                fontSize: 14,
                color: '#62019E',
                fontWeight: 700,
            },
        },
        data: {
            margin: '0 0 15px',
            width: 'auto',
            '& > div:first-child': {
                color: '#0B111B',
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
                opacity: 0.5,
                lineHeight: "34px",
            },
            '& > div:last-child': {
                color: '#0B111B',
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
                lineHeight: "34px",
            },
        },
    };
});

export default useStyles;
