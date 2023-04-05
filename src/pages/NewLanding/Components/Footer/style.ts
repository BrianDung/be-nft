import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            display: 'flex',
            alignItems:'center',
            justifyContent:'space-between',
            margin: '50px 100px 0',
            [theme.breakpoints.down('sm')]: {
                flexDirection:'column',
                justifyContent:'center',
                margin: '50px 20px 0',
               },
            "@media (min-width: 992px)": {
                margin: '50px 20px 0',
            },
        },
        footerLeft:{
            display: 'flex',
            alignItems:'center',
            gap: '5px',
        },
        title:{
            fontFamily: 'Segoe-Regular',
            fontSize: 16,
            color: '#FFFFFF',
            marginBottom:0,
        },
        boxLink:{
            display: 'flex',
            alignItems:'center',
            gap: '15px',
        },
        name:{
            fontFamily: 'Segoe-Bold',
            fontSize: 16,
            color: '#34258b',
        }
    }
})