import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        borderWrapper: {
            position: 'relative',
            // [theme.breakpoints.down('sm')]: {
            //     width: '100%',
            // },
        },
        divInside: {
            border: 'none',
            // backgroundColor: "#554DAC",
            '&::before': {
              opacity: 0.5,
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              padding: 4,
              borderRadius: 10,
              background: 'linear-gradient(90deg, #A74AFC 0%, rgba(7, 153, 206, 0.95) 100%)',
              '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              '-webkit-mask-composite': 'xor',
              transition: 'all 0.25s ease-in-out',
              // [theme.breakpoints.down('md')]: {
              //   padding: 3,
              // },
              "@media only screen and (max-width: 1700px)": {
                padding: 3,
              },
            },
        }
    }
})