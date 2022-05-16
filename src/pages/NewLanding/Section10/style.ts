import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '24px 178px',
            [theme.breakpoints.down('sm')]: {
               '& .MuiGrid-container':{
                   justifyContent:'center',
               },
               margin: '24px 60px'
            },
        },
        teamWrapper:{
            background: '#ffffff1a',
            borderRadius:'12px',
            display: 'flex',
            justifyContent:'space-around',
            margin: '50px auto',
            maxWidth:'900px',
            padding: '50px 0',
        },
        member:{
            alignItems:'center',
            display: 'flex',
            flexDirection:'column',
        },
        title:{
            marginTop:'10px',
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: '#FFFFFF',
        },
        name:{
            marginTop:'15px',
            fontFamily: 'Montserrat-Bold',
            fontSize: 16,
            color: '#ffffffcc',
        },
        img:{
            borderRadius:'50%',
            width: '100%',
            height: '100%',
        },
        imgField: {
            '&__img':{
                width: '160px',
                height: '160px',
                borderRadius: '50%'
            }
        },
        imgFieldLogistics: {
            maxWidth: '480px',
            height: '120px',
            width: '100%',
            [theme.breakpoints.down('xs')]: {
                height: '72px'
            }
        },
        imgLogistics: {
            width: '100%',
            height: '100%'
        }
    }
})
