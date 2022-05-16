/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useTabStyles } from './styles';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

import PoolDetails from './PoolDetails';
import QualifiedUsers from './QualifiedUsers';
import { useParams } from 'react-router-dom';
import { getListSnapShot } from '../../../request/pool';

interface StyledTabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles({
    root: {
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        width: '96%',
        margin: '10px auto',
        '& .MuiTab-wrapper': {
            display: 'unset',
            justifyContent: 'unset',
            flexDirection: 'unset',
            fontFamily: 'Montserrat-Medium',
            fontSize: '18px',
            lineHeight: '25px',
            color: '#FFFFFF',
            textAlign: 'left',
        },
        '& .MuiTab-root': {
            padding: '10px 0',
            minWidth: '80px',
            marginRight: 60
        },
    },
    indicator: {
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        '& > span': {
            width: '100%',
            backgroundColor: '#A84DFF',
        },
    },
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

interface StyledTabProps {
    label: string;
}

const StyledTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textTransform: 'none',
            color: '#FFFFFF',
            fontFamily: 'Montserrat-Medium',
            fontSize: 18,
            opacity: 0.2,
            marginRight: theme.spacing(1),
            '&:focus': {
                opacity: 1,
            },
        },
    })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <div>{children}</div>}
        </div>
    );
};

interface SnapShotUser {
    id: number;
    wallet_address: string;
}

const PoolDetailsAndQualifiedUsers = (props: any) => {
    const {poolDetail} = props;
    const classes = useTabStyles();
    const [value, setValue] = useState(0);
    const [snapShotUsers, setSnapShotUsers] = useState<SnapShotUser[]>([]);
    const { id } = useParams() as any;
    const [searched, setSearched] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const getSnapShotUsers = async () => {
        const res = await getListSnapShot(id || 0, searched).then((response) => response.json());
        // let filteredSnapShotUsers =
        //     res.data?.length > 0
        //         ? res.data.map((element: any, index: number) => {
        //               return { id: element.id, wallet_address: element.wallet_address };
        //           })
        //         : [];
        res.data && setSnapShotUsers(res.data);
      };
    
      useEffect(() => {
        getSnapShotUsers();
        // eslint-disable-next-line
      }, [id, searched]);

    const Tab_Names = ['Pool Details', `Qualified Users (${snapShotUsers.length})`];

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
                    {Tab_Names.map((element, index) => {
                        return <StyledTab label={element} key={index} />;
                    })}
                </StyledTabs>
                <TabPanel value={value} index={0}>
                    <PoolDetails poolDetails={poolDetail}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <QualifiedUsers data={snapShotUsers} onSearch={setSearched}/>
                </TabPanel>
            </AppBar>
        </div>
    );
};

export default PoolDetailsAndQualifiedUsers;
