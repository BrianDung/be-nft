import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => {
    return {
        colStyle: {
            width: '50%',
            '&:first-child': {
                marginRight: 20
            },
            '& .MuiTableRow-root': {
                backgroundColor: 'unset',
            },
            '& .MuiTableCell-body': {
                color: '#ffffff',
                fontSize: 14,
                fontWeight: '400',
                borderColor: 'rgba(255, 255, 255, 0.12)'
            },
            '& .MuiTableRow-head': {
                backgroundColor: '#232436',
                borderColor: 'rgba(255, 255, 255, 0.12)'
            },
            '& .MuiTableCell-head': {
                color: '#ffffff',
                opacity: 0.4,
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                borderColor: 'rgba(255, 255, 255, 0.12)'
            },
            '& .MuiPaper-elevation1': {
                backgroundColor: 'unset',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 5,
                borderBottom: 'none',
                '& .MuiButtonBase-root': {
                    color: '#FFFFFF'
                },
                '& .MuiInputBase-root': {
                    color: '#AEAEAE'
                }
            },
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            }
        },
        rowStyle: {
            padding: '24px',
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                 flexDirection: 'column'
            }
        },
        searchBarStyle: {
            marginBottom: '16px',
            border: '1px solid rgba(255, 255, 255, 0.5) !important',
            borderRadius: 5,
        },
        guideSearch: {
            fontSize: 12,
            color: '#FFFFFF',
            opacity: 0.4
        },
        searchError: {
            color:'#F22222'
        }
    }
});
