import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:'72px',
            [theme.breakpoints.down('sm')]: {
                marginTop: '24px'             
            }
        },
        imagesField: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            margin: '0px 18px'
        }, 
        imagesItem: {

        },
        image: {
            width: '100%',
            height: '100%'
        }
    }
})

export const useCardStyles = makeStyles((theme: any) => {
    return {
        cardContainer: {
            background: 'linear-gradient(90deg, #A1A8E1 0%, #3B48B9 100%)',
            //borderRadius: '20px',
            padding: '50px',
            width: '100%',
            maxWidth: '742px',
            marginBottom: 36,
            backgroundImage: (props: any) => props.backgroundImage,
            backgroundRepeat:'no-repeat',
            backgroundSize:'contain',
            backgroundPosition:'center',
            '& .MuiGrid-container':{
                marginLeft: 25,
                justifyContent: 'flex-start',
                flexWrap:'nowrap',
                "@media (min-width: 375px) and (max-width: 717px)": {
                    flexDirection:'column',
                    marginLeft: 0,
                    backgroundPosition:'unset',
                    justifyContent: 'center',
                },
            },
            '& .MuiGrid-item':{
                "@media (min-width: 375px) and (max-width: 717px)": {
                    marginLeft: 0,
                    display: 'flex',
                    alignItems:'center',
                    gap:7,
                    backgroundPosition:'unset',
                    justifyContent: 'center',
                },
            },
            "@media (min-width: 375px) and (max-width: 717px)": {
                marginBottom: 30,
                padding: 20,
            },
        },
        phaseText: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 26,
            color: 'white',
            marginBottom: 0,
            textTransform:'uppercase',
            "@media (min-width: 375px) and (max-width: 717px)": {
                fontSize: 16,
            },
        },
        monthText: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 24,
            color: 'white',
            marginBottom: 0,
            "@media (min-width: 375px) and (max-width: 717px)": {
                fontSize: 14,
            },
        },
        eventFieldGrid: {
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            marginLeft: 15
        },
        eventField: {
            minWidth:'382px',
            maxWidth:'100%',
            padding: 12,
            backgroundColor: 'rgba(117, 117, 117, 0.4)',
            borderRadius: 10,
            "@media (min-width: 375px) and (max-width: 717px)": {
                minWidth:'300px',
                maxWidth:'100%',
                padding: 5,
            },
        },
        eventText: {
            fontSize: 16,
            fontFamily: 'Montserrat-Regular',
            color: 'white',
            margin: 0,
            "@media (min-width: 375px) and (max-width: 717px)": {
                fontSize: 12,
            },
        }
    }
})