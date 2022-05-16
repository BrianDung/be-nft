import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
    return {
        cardContainer: {
            margin: (props: any) => (props.isFlexStart ? 'initial' : 'auto'),
            width: (props: any) => {
                if (props?.size === 'small') {
                    return '258px';
                }
                return '354px';
            },
            cursor: 'pointer',
            [theme.breakpoints.down('xs')]: {
                margin: 'auto',
                width: '100% !important',
            },
            "@media (min-width: 600px) and (max-width: 1024px)": {
                margin: 'auto',
                width: 'calc((100%/2) - 12px) !important',
            },
            "@media (min-width: 1025px) and (max-width: 1439px)": {
                margin: 'auto',
                width: 'calc((100%/3) - 16px) !important',
            },
            "@media (min-width: 1440px)": {
                margin: 'auto',
                width: 'calc((100%/4) - 23px) !important',
            },
        },
        cardCoverImage: {
            position: 'relative',
            width: '100%',
            '&--label': {
                position: 'absolute',
                top: 20,
                left: 30,
                background: '#FF5E06',
                padding: '2px 10px',
                fontSize: '12px',
                lineHeight: '21px',
                fontFamily: 'Montserrat-Regular',
                color: '#fff',
                borderRadius: '40px',
            },
        },
        fallbackImage: {
            width: '100%',
            height: (props: any) => {
                if (props?.size === 'small') {
                    return '155px';
                }
                return '155px';
            },
            objectFit: 'cover',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
        },
        cardContent: {
            background: '#131A26',
            '&__tokenName': {
                color: '#fff',
                fontFamily: 'Montserrat-Medium',
            },
            '&__tokenLogo': {
                width: '26px',
                height: '26px',
                borderRadius: '50%',
            },
            padding: '24px',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            "@media (min-width: 1440px)": {
                padding: '24px 15px',
            },
        },
        '&__btnSwap': {
            background: 'linear-gradient(102.92deg, #B347FF 6.55%, #454CF9 47.11%, #0961FE 71.51%, #02ACD3 98.22%)',
            borderRadius: '40px',
            width: '100%',
            textAlign: 'center',
            padding: '9px',
            color: '#fff',
            fontFamily: 'Montserrat-Regular',
            cursor: 'pointer',
            '&::hover': {
                opacity: 0.7,
            },
        },
        cardFooter: {
            '&__btnSwap': {
                margin: '15px 0',
                background: 'linear-gradient(102.92deg, #B347FF 6.55%, #454CF9 47.11%, #0961FE 71.51%, #02ACD3 98.22%)',
                borderRadius: '40px',
                width: '100%',
                textAlign: 'center',
                padding: '9px',
                color: '#fff',
                fontFamily: 'Montserrat-Regular',
                cursor: 'pointer',
                '&::hover': {
                    opacity: 0.7,
                },
            },
        },

        cardLabelChild: {},

        labelCard: {
            background: (props: any) => {
                if (props.is_private === 0) return '#0961FE';
                if (props.is_private === 1) return '#FF5E06';
                return '#B400FF';
            },
            padding: '2px 10px',
            fontSize: '12px',
            lineHeight: '21px',
            fontFamily: 'Inter-Regular',
            color: '#fff',
            borderRadius: '5px',
        },
        cardRow: {
            display: 'flex',
            fontFamily: 'Montserrat-Regular',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#fff',
            fontSize: '14px',
            lineHeight: '24px',
            fontWeight: 400,
            paddingBottom: '13px',
           
            '&__left': {
                opacity: 0.4,
                width: '100px',
            },
            '&__right': {
                marginLeft: 'auto',
                textAlign:'right',
                textTransform:'uppercase'
            },
            '&__highlight': {
                color: '#f22222',
            },
            '&__timeBox': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#A84DFF',
                fontSize: '16px',
                fontFamily: 'Montserrat-Medium',
                fontWeight: 500,
                borderRadius: '5px',
                background: '#232436',
                padding: '4px 11px',
                width:'120px',
            },
        },
        cardLine: {
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '13px',
        },
        progress: {},
    };
});

export default useStyles;
