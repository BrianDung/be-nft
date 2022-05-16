import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        container: {
            marginTop: 120
        },
        carousel: {
            '& .slick-dots': {
                bottom: 6,
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
        },
        imageCarousel:{
            width: '100%',
            height: '100%',
           
        },
        slide :{
            transform: 'scale(0.9)',
            transition: 'transform ease .3s',
            opacity: '0.5',
          },
          
        slideWrapper: {
            display: 'flex',
            justifyContent:'center',
          }
          
    }
})
