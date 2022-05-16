import { createStyles, FormControl, Theme, withStyles, Select } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
// import Upcoming from "./TabContents/TabAll";
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
// import useGetParamFromUrl from '../../hooks/useGetParamFromUrl'
import { useStyles, useTabPanelStyles } from './styles';
import TabContent from './TabContents';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}
interface StyledTabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

interface StyledTabProps {
    label: string;
}

const StyledTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textTransform: 'none',
            fontFamily: 'Montserrat-Regular',
            fontWeight: 400,
            color: '#fff',
            opacity: 0.6,
            fontSize: theme.typography.pxToRem(15),
            marginRight: theme.spacing(1),
            '&:hover': {
                cursor: 'pointer',
                opacity: 1,
            },
        },
    })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    const classes = useTabPanelStyles();
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div className={classes.root}>{children}</div>}
        </div>
    );
};

const a11yProps = (index: any) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const Tab_Names: string[] = ['Upcoming', 'Next to launch', 'In Progress', 'Ended', 'All'];

const Deals = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeMobile = (event: any) => {
        setValue(Number(event.target.value));
    };

    return (
        <div className={classes.root}>
            <h1 className={classes.pageTitle}>IDO Projects</h1>
            <AppBar className={classes.tabHeader} position="static">
                <StyledTabs value={value} onChange={handleChange}>
                    {Tab_Names.map((element, index) => {
                        return <StyledTab key={element} label={element} {...a11yProps(index)} />;
                    })}
                </StyledTabs>
            </AppBar>
            <FormControl className={classes.formControlSelect}>
                <Select
                    className={classes.selectBox}
                    native
                    IconComponent={ExpandMoreIcon}
                    value={value}
                    onChange={handleChangeMobile}
                >
                    {Tab_Names.map((elm, i) => (
                        <option value={i} key={elm}>
                            {elm}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <TabPanel key={value} value={value} index={value}>
                <TabContent tabIndex={value} />
            </TabPanel>
        </div>
    );
};

export default Deals;
