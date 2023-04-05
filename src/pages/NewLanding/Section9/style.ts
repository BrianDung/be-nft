import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin:'24px 0',
            '& .MuiGrid-spacing-xs-4':{
                width:'80%',
                margin: '20px auto',
                "@media (min-width: 992px)": {
                    width:'94%',
                },
            },
           [theme.breakpoints.down('xs')]:{
               marginTop: '45px'
           }
        },
        teamWrapper:{
            background: '#ffffff1a',
            borderRadius:'12px',
            display: 'flex',
            justifyContent:'space-around',
            margin: '20px auto',
            padding: '50px 0',
            
        },
        member:{
            alignItems:'center',
            display: 'flex',
            flexDirection:'column',
        },
        title:{
            marginTop:'10px',
            fontFamily: 'Segoe-Bold',
            fontSize: 16,
            color: '#FFFFFF',
            marginBottom: '10px',
        },
        name:{
            fontFamily: 'Segoe-Regular',
            fontSize: 16,
            color: '#ffffffcc',
            marginBottom:'10px',
        },
        img:{
            borderRadius:'50%',
        },
        accordion: {
            backgroundColor: 'rgba(44,40,65,0.36)',
            color: 'white',
            border: '1px solid #5b87ff50',
            fontFamily: 'Segoe-Regular',
            fontSize: 16
        },
        imgField: {
            '&__img':{
                borderRadius: '50%',
                '&:hover': {
                    boxShadow: '10px 10px 50px 0px rgb(209, 68, 249)',
                },
                '&:hover::before': {
                    borderTopColor: '#a84dff',
                    borderRightColor: '#a84dff',
                    borderBottomColor: '#a84dff',
                    transition: 'border-top-color 0.3s linear, border-right-color 0.3s linear 0.05s, border-bottom-color 0.3s linear 0.05s'
                },
                '&:hover::after': {
                    borderTop: '2px solid #a84ff',
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    transform: 'rotate(270deg)',
                    transition: 'border-left-width 0s linear 0.1s, -webkit-transform 0.7s linear 0s',
                }
            }
        },
        socialMedia: {
            '&:hover':{
                '&>img': {
                    opacity: 0.5
                }
            }
        }
    }
})
