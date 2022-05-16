import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        container: {
            marginTop: 120,
            // [theme.breakpoints.down('xs')]: {
            //     padding: '0px 12px'
            // }
        },
        carousel: {
            '& .slick-dots': {
                '& li': {
                    margin: 0,
                    '& button': {
                        '&:before': {
                            fontSize: 10,
                            opacity: '0.99'
                        }
                    }
                }
            }
        }
    }
})
