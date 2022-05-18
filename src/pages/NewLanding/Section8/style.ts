import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            "@media (min-width: 375px) and (max-width: 717px)": {
                marginTop: '45px',
                padding: '0 20px',
            },
            "@media (min-width: 992px)": {
                marginTop: '30px',
                padding: '0 20px',
            },
        },
        accordionField: {
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            maxWidth: 812,
            width: '100%',
        }, 
        accordionItem: {
            
            '& .MuiAccordionDetails-root':{
                borderTop:'1px solid #5b87ff50',
            },
            '& .MuiIconButton-root':{
                color:'#FFFFFF',
            },
        },
        accordion: {
            backgroundColor: 'rgba(44,40,65,0.36)',
            color: 'white',
            border: '1px solid #5b87ff50',
            fontFamily: 'Montserrat-Regular',
            fontSize: 16
        }
    }
})
