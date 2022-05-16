import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        container: {
            display: 'flex',
            paddingTop: 48
        },
        imageFieldGrid: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        imageField: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        textField: {
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            color: 'white', 
            paddingRight: 108,
            '& h3': {
                fontSize: 48,
                fontFamily: 'Montserrat-Medium',
                color: 'white',
                fontWeight: 700,
                marginBottom: 0
            },
            '& p': {
                fontSize: 16,
                fontFamily: 'Montserrat-Regular',
                marginBottom: 0
            },
            [theme.breakpoints.down('sm')]: {
                padding: 12,
                '& h3': {
                    fontSize: 24
                },
                '& p': {
                    fontSize: 14
                }
            }
        }
    }
})