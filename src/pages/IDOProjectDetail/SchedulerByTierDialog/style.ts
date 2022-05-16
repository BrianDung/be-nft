import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
    titleField: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '21px',
        paddingRight: '41px',
        paddingTop: '12px',
    },
    closeIcon: {
        width: '15px',
        height: '15px',
        textAlign: 'center',
        cursor: 'pointer',
        position: 'absolute',
        right: '20px',
        top: '20px',
    },
    root: {
        '& .MuiDialog-paper':{
            background: '#FFFFFF',
            boxShadow: '0px 3px 50px rgba(0, 0, 0, 0.161)',
        },
        '& .MuiDialogContent-root': {
            padding: 40,
            paddingTop: 12
        },
        '& .MuiTableRow-root':{
            "& > th:nth-child(1)": {
                paddingLeft: 35
            }
        },
        "& .MuiPaper-elevation1":{
            boxShadow:'none',
        },
        "& .MuiTableBody-root":{
            "& > .MuiTableRow-root:nth-child(1)": {
                borderBottom: '2px solid #FFFFFF',
            },
            "& > .MuiTableRow-root:nth-child(2)": {
                borderBottom: '2px solid #FFFFFF',
            },
            "& > .MuiTableRow-root:nth-child(3)": {
                borderBottom: '2px solid #FFFFFF',
            },
        },
       
        '& .MuiTableContainer-root':{
            backgroundColor: '#F4F4F4',
            borderRadius:'10px',
        },
        '& .MuiTableHead-root': {
            backgroundColor: '#E8E8E8',
            borderRadius:'10px 10px 0px 0px',
            '& .MuiTableCell-head': {
                fontSize: '16px',
                fontFamily:'Montserrat-SemiBold',
                color: '#0B111B',
                lineHeight: '45px',
            },
        },
       
        '& .MuiTypography-h6':{
            color: '#0B111B',
            fontSize: '32px',
            fontFamily:'Montserrat-SemiBold',
            lineHeight: '45px',
        },
        
        '& .MuiTableCell-root': {
            color: '#0B111B',
            fontSize: '14px',
            margin:'30px 0px',
            fontFamily:'Montserrat-Regular',
            borderBottom:'none',
        }
    }
});

