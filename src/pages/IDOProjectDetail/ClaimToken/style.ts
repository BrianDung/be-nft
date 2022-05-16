import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    poolDetailClaim: {
      background: '#121327',
      borderRadius: 12,
      padding: '28px 28px',
      marginBottom: 12,
      color: '#FFFFFF',
      // border: '1px solid #6398FF',

      [theme?.breakpoints?.down('sm')]: {
        padding: '28px 20px',
      },

      '& button': {
        color: '#FFFFFF',
        height: 42,
        padding: 5,
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        lineHeight: '24px',
        borderRadius: 40,
        width: 240,
        maxWidth: '100%',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
          marginTop: '30px !important',
        },

        '&:disabled': {
          cursor: 'not-allowed',
          opacity: 0.6,
        }
      },

      [theme.breakpoints.down('sm')]: {
        padding: '36px 20px',

        '& #countdown': {
          marginTop: 30
        },

        '& ul': {
          textAlign: 'center',
          // flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        },

        '& button': {
          width: '100% !important',
          padding: '0 60px',
          height: '42px',
          font: 'normal normal bold 14px/18px DM Sans',
        }
      }
    },
    poolDetailClaimTitle: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 18,
      lineHeight: '24px',
      marginBottom: 20,
      textTransform: 'capitalize',

      [theme?.breakpoints?.down('sm')]: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: '24px',
      },
    },

    poolDetailClaimInfo: {
      margin: '40px 0',
    },

    poolDetailClaimInfoBlock: {
      display: 'grid',
      gridTemplateColumns: '200px 2fr',
      gridColumnGap: 12,

      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexWrap: 'wrap',
        wordBreak: 'break-word',
      },

      '& span:first-child': {
        fontFamily: 'Montserrat-Regular',
        color: '#FFFFFF',
        opacity: 0.4,
        fontSize: '14px',
        lineHeight: '24px',
        textTransform: 'capitalize',
        margin: '15px 0px',
      },

      '&:not(:first-child)': {
        marginTop: 13,
      },

      '& .text-blue': {
        color: '#A84DFF',
        fontFamily: 'Montserrat-Medium',
        opacity: 0.8,
        fontSize: 14,
        lineHeight: '24px',
        margin: '15px 0px',
      }
    },
    textDes: {
      fontFamily: 'Montserrat-Medium',
      color: '#FFFFFF',
      opacity: 0.8,
      fontSize: '14px',
      lineHeight: '24px',
      margin: '15px 0px',
    },
    borderBottom: {
      background: 'rgba(255, 255, 255, 0.12)',
      borderRadius: '5px',
      transform: 'matrix(1, 0, 0, -1, 0, 0)',
      margin: '15px 0',
      height: '1px',
    },
    poolDetailClaimProgress: {
      display: 'flex',
      position: 'relative',

      '&:before': {
        content: '""',
        position: 'absolute',
        top: -12,
        left: 0,
        right: 0,
        height: 10,
        backgroundColor: '#2B313A',
        borderRadius: 41,

        // [theme.breakpoints.down('sm')]: {
        //   top: 0,
        //   left: 6,
        //   right: 'auto',
        //   height: '100%',
        //   width: 5,
        // },
      },

      '& li .mark': {
        position: 'absolute',
        top: -15,
        left: 0,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: '#44454B',
        zIndex: 2,
        '&>img': {
          position: 'absolute',
          top: 0,
          left: 0,
        cursor: 'pointer',
        }

        // [theme.breakpoints.down('sm')]: {
        //   top: 0,
        //   left: 0,
        //   right: 'auto',
        // },
      },

      '& li .info': {
        fontSize: 12,
        lineHeight: '18px',
        marginTop: 12,

        // [theme.breakpoints.down('sm')]: {
        //   textAlign: 'left',
        //   marginTop: 0,
        // },

        '& > div:nth-child(2)': {
          color: '#AEAEAE',
          lineHeight: '20px',
          marginTop: 4,
        },

        '&.show': {
          whiteSpace: 'nowrap',
          transform: 'translateX(50%) !important'
        }
      },

      '& .first-item': {
        // flex: '3 1 0',
        color: 'white',

        // [theme.breakpoints.down('sm')]: {
        //   position: 'relative',
        //   width: '100%',
        //   textAlign: 'left',
        //   paddingLeft: 25,
        //   flex: '0 0 20px'
        // },

        '&.active': {
          color: 'rgba(242, 34, 34, 1)',
          position: 'relative',

          '&:before': {
            content: '""',
            position: 'absolute',
            top: -12,
            left: 5,
            right: 0,
            height: 10,
            background: '#F22222',
            zIndex: 1,

            // [theme.breakpoints.down('sm')]: {
            //   content: 'unset'
            // },
          },

          '& .info > div:first-child': {
            color: 'rgba(242, 34, 34, 1)'
          },

          '&.solo:before': {
            [theme.breakpoints.down('sm')]: {
              top: -12,
              left: 6,
              height: '99%',
              width: 5,
              right: 'auto',
            },
          }
        }
      },

      '& .item.last-item': {
        flex: '5 1 0',

        '& .info.show': {
          transform: 'none !important',
        },

        // [theme.breakpoints.down('sm')]: {
        //   flex: '0 0 80px'
        // },
      },

      '& .item': {
        flex: '2 1 0',
        position: 'relative',

        // [theme.breakpoints.down('sm')]: {
        //   width: '100%',
        //   paddingLeft: 25,
        //   flex: '0 0 50px'
        // },

        '& .mark': {
          left: 'unset',
          right: '-4px',
          cursor: 'pointer',
          // [theme.breakpoints.down('sm')]: {
          //   bottom: 0,
          //   left: 0,
          //   right: 'auto',
          //   top: 'auto'
          // },
        },

        '& .info': {
          textAlign: 'right',

          // [theme.breakpoints.down('sm')]: {
          //   textAlign: 'left',
          //   position: 'absolute',
          //   left: 24,
          //   bottom: -24
          // },
        },

        '&:not(:last-child):not(:first-child) .info': {
          position: 'absolute',
          right: 0,
          textAlign: 'center',
          transform: 'translateX(4px)',

          // [theme.breakpoints.down('sm')]: {
          //   textAlign: 'left',
          //   transform: 'none',
          // },
        },

        '&.active': {
          '&:before': {
            content: '""',
            position: 'absolute',
            top: -12,
            left: 0,
            right: 1,
            height: 10,
            background: '#F22222',
            zIndex: 1,

            // [theme.breakpoints.down('sm')]: {
            //   top: -30,
            //   left: 6,
            //   height: '125%',
            //   width: 5,
            //   right: 'auto',
            // },
          },

          '& .info > div:first-child': {
            color: 'rgba(242, 34, 34, 1)'
          },

          '&.solo:before': {
            // [theme.breakpoints.down('sm')]: {
            //   top: -12,
            //   left: 6,
            //   height: '99%',
            //   width: 5,
            //   right: 'auto',
            // },
          }
        }
      }
    },
    infoToken: {
      color: '#AEAEAE',
      fontSize: 12,
      lineHeight: '24px',
      opacity: 0.8,
      fontFamily: 'Montserrat-Regular',
    },
    textRed: {
      color: '#F22222',
      fontSize: 14,
      lineHeight: '24px',
      fontFamily: 'Montserrat-Medium',
    },
    textDate: {
      color: '#FFFFFF',
      fontSize: 14,
      lineHeight: '24px',
      fontFamily: 'Montserrat-Medium',
      opacity: 0.8,
    },
    claimBtn: {
      background: "linear-gradient(102.92deg, #B347FF 6.55%, #454CF9 47.11%, #0961FE 71.51%, #02ACD3 98.22%)",
      boxShadow: 'none',
      borderRadius: 40,
      fontFamily: 'Montserrat-Medium',
      color: '#FFFFFF',
      fontSize: '14px',
      lineHeight: '24px',
      marginBottom: '20px',
    },
    toolTipClaim: {
      fontSize: 14,
      lineHeight: '20px',
      maxWidth: 300,
      marginBottom: 0,
      padding: 5
    }
  };
});

export default useStyles;
