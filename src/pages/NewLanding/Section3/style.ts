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
            alignItems: 'center',
        },

        marginBottomImg: {
            width: '100%',
            maxWidth: 700,
            [theme.breakpoints.down('sm')]: {
                marginBottom: 60,
            }
        },
        imageDistribution: {
            width: '100%',
            maxWidth: 520,
            [theme.breakpoints.down('xs')]: {
                maxWidth: 320
            }
        }
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