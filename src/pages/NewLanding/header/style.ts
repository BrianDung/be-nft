import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            position: 'absolute',
            background: 'rgba(0, 0, 0, 0.25)',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1
        },
        container: {
            margin: '0px 106px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 72,
            [theme.breakpoints.down('sm')]: {
                margin: '0px 30px'
            }
        },
        logoField: {

        },
        linkField: {
            display: 'flex',
            gap: 18
        },
        linkItem: {

        }
    }
})
