import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        container: {
            paddingTop: 60,
            display: 'flex',
            flexDirection: 'row',
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'wrap',
            },
            gap: 60
        },
        chartFieldGrid: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        chartField: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                padding: 6
            }
        },
        headerItem: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        imageField: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        // supplyImageField: {
        //     width: 400,
        //     height: 225
        // },
        // distributionImageField: {
        //     widht: 320,
        //     height: 225
        // }
    }
})