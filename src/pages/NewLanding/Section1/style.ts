import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '@media screen and (orientation: landscape)': {
                flexWrap: 'nowrap'
            }
        },
        buttonTheMint: {
            textTransform: 'none',
            padding: '12px 72px !important',
            border: '2px solid #5855EE !important',
            borderRadius: '30px !important',
            color: 'white !important',
            fontSize: '16px !important',
            fontFamily: 'Segoe-Regular !important',
            background: 'rgba(196, 196, 196, 0.25) !important',
            whiteSpace: 'nowrap',
            '@media only screen and (max-width: 750px) and (orientation: landscape)': {
                padding: '12px 48px !important'
            }
        },
        buttonOpensea: {
            textTransform: 'none',
            padding: '12px 72px !important',
            border: '2px solid #5855EE !important',
            borderRadius: '30px !important',
            color: 'white !important',
            fontSize: '16px !important',
            fontFamily: 'Segoe-Regular !important',
            background: 'rgba(196, 196, 196, 0.25) !important',
            '& .MuiButton-startIcon': {
                position: 'absolute',
                left: 6
            },
            '@media only screen and (max-width: 750px) and (orientation: landscape)': {
                padding: '12px 48px !important'
            }
        },
        title: {
            fontFamily: 'Mokoto',
            fontSize: 84,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            marginBottom: 0,
            textShadow: '2px 2px 4px #000000'
        },
        name: {
            fontFamily: 'Segoe-Regular',
            fontSize: 20,
            color: '#FFFFFF',
        },
        texthedear: {
            textAlign: 'center',
            paddingTop: '20vh',
            marginBottom: '3vh',
        },
        countDownField: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1vh',
            '&>div': {
                '&>ul': {
                    marginLeft: 0,
                    '&>li': {
                        '&.number': {
                            background: '#b14a88',
                            width: '66px',
                            height: '66px',
                            fontSize: 18,
                        },
                    },
                    '@media only screen and (max-height: 600px ) and (orientation:landscape)': {
                        margin: '0 10px !important',
                        '&>li': {
                            margin: 1,
                            '&.number': {
                                width: '60px !important',
                                height: '60px !important',
                                '&>span:nth-child(2)':{
                                    lineHeight: '15px'
                                }
                            }
                        }
                    },
                },

            }
        }
    }
});
