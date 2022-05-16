import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { withRouter } from 'react-router-dom';
import {
    Button,
    FormControl,
    Hidden,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withWidth,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useAuth from '../../../hooks/useAuth';
import useFetch from '../../../hooks/useFetch';
import { NULL_AMOUNT } from '../../../constants';
import useStyles from './style';
import { getIconCurrencyUsdt } from '../../../utils/usdt';
import Pagination from '@material-ui/lab/Pagination/Pagination';
import { Input } from 'antd';

const POOL_IS_PRIVATE = {
    PUBLIC: 0,
    PRIVATE: 1,
    COMMUNITY: 2,
};

const POOL_STATUS_JOINED = {
    REGISTERD: 'Registered',
    QUALIFIED: 'Qualified',
    PUBLIC_SELL: 'Public Sell',
    SWAPPING: 'Swapping',
    CLAIMABLE: 'Claimable',
    NOT_QUALIFED: 'Not Qualified',
};

const listStatuses = [
    { value: '', label: 'All Statuses' },
    { value: POOL_STATUS_JOINED.REGISTERD, label: 'Registered' },
    { value: POOL_STATUS_JOINED.QUALIFIED, label: 'Qualified' },
    { value: POOL_STATUS_JOINED.SWAPPING, label: 'Swapping' },
    { value: POOL_STATUS_JOINED.PUBLIC_SELL, label: 'Public sell' },
    { value: POOL_STATUS_JOINED.CLAIMABLE, label: 'Claimable' },
    { value: POOL_STATUS_JOINED.NOT_QUALIFED, label: 'Not Qualified' },
];

const listTypes = [
    { value: 1000, label: 'All types' },
    { value: POOL_IS_PRIVATE.PUBLIC, label: 'Public' },
    { value: POOL_IS_PRIVATE.PRIVATE, label: 'Private' },
    // { value: POOL_IS_PRIVATE.COMMUNITY, babel: "Community" },
];

const MyPools = (props: any) => {
    const styles = useStyles();
    const { connectedAccount } = useAuth();
    const [error, setError] = useState("");
    const [inputName, setInputName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [pools, setPools] = useState([]);

    const [filterStatus, setFilterStatus] = React.useState<{ status: string; label: string }>({
        status: '',
        label: '',
    });

    const [filterType, setFilterType] = useState<{ type: string | number; label: string }>({
        type: 1000,
        label: '',
    });

    const handleChangeStatus = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof filterType;
        const value = event.target.value as keyof typeof filterType;
        setFilterStatus({
            ...filterStatus,
            [name]: value,
        });
    };

    const handleChangeType = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof filterType;
        const value = event.target.value as keyof typeof filterType;
        setFilterType({
            ...filterType,
            [name]: value,
        });
    };

    const getPoolsPrefixUri = () => {
        const uri = '/pools';
        return `${uri}/user/${connectedAccount}/joined-pools`;
    };

    const { data: poolsList, loading: loadingGetPool } = useFetch<any>(
        `${getPoolsPrefixUri()}?page=${currentPage}&limit=7&type=${filterType.type}`
    );

    const handleSearchInputChange = (e: any) => {
        const keyword = e.target.value;
        setInputName(keyword);
        setCurrentPage(1);
    };

    useEffect(() => {
        const manipulatePoolsData = (pools: any) => {
            let listData = pools.data;

            setTotalPage(pools.lastPage);
            setCurrentPage(Number(pools.page));

            if (listData && listData.length > 0) {
                setPools(listData);
            }else{
                setError("You have not participated in any pools.");
            }
            setPools(listData);

            if (filterStatus.status !== '') {
                const filter = listData.filter((u: any) => u?.joined_status === filterStatus.status);
                
                if(listData && listData.length > 0 && filter.length === 0){
                    setError("No Status match your.");
                }
                setPools(filter);
            }
            if (inputName !== '') {
                const results = listData.filter((user: any) => {
                    return user.name.toLowerCase().includes(inputName.toLowerCase());
                });
                if(listData && listData.length > 0 && results.length === 0){
                    setError("No Projects match your search.");
                }
                setPools(results);
            }
        };

        poolsList && poolsList.data && manipulatePoolsData(poolsList);
    }, [poolsList, filterStatus, inputName]);

    const poolStatus = (pool: any) => {
        switch (pool.joined_status) {
            case POOL_STATUS_JOINED.REGISTERD:
                return (
                    <div className="status_pool registered">
                        <span>Registered</span>
                    </div>
                );
            case POOL_STATUS_JOINED.QUALIFIED:
                return (
                    <div className="status_pool qualified">
                        <span>Qualified</span>
                    </div>
                );
            case POOL_STATUS_JOINED.SWAPPING:
                return (
                    <div className="status_pool swapping">
                        <span>Swapping</span>
                    </div>
                );
            case POOL_STATUS_JOINED.PUBLIC_SELL:
                return (
                    <div className="status_pool public-sell">
                        <span>Public Sell</span>
                    </div>
                );
            case POOL_STATUS_JOINED.NOT_QUALIFED:
                return (
                    <div className="status_pool not-qualified">
                        <span>Not Qualified</span>
                    </div>
                );
            default:
                return (
                    <div className="status_pool none">
                        <span>-</span>
                    </div>
                );
        }
    };

    const getAccessPoolText = (pool: any) => {
        if (!pool) return '';
        const isPrivate = pool?.is_private || pool?.isPrivate;
        if (Number(isPrivate) === POOL_IS_PRIVATE.PRIVATE) {
            return 'Private';
        }
        if (Number(isPrivate) === POOL_IS_PRIVATE.COMMUNITY) {
            return 'Community';
        }
        return 'Public';
    };

    const allocationAmount = (pool: any) => {
        if (!pool) return null;

        const { currencyName } = getIconCurrencyUsdt({
            purchasableCurrency: pool?.purchasableCurrency || pool?.accept_currency,
            networkAvailable: pool?.networkAvailable || pool?.network_available,
        });
        if (pool.allowcation_amount === NULL_AMOUNT) return '-';
        let allowcationAmount = pool.allowcation_amount;
        if (new BigNumber(allowcationAmount).lte(0)) return '-';

        const allowcationAmountText = `${new BigNumber(
            allowcationAmount || 0
        ).toFixed()} ${currencyName?.toUpperCase()}`;

        return allowcationAmountText;
    };

    return (
        <div className={styles.pageMyPools}>
            <h2 className={styles.title}>My Projects</h2>
            <div className={styles.borderBottom}></div>
            <div className={styles.headTable}>
                <div className={styles.leftFillter}>
                    <FormControl className={styles.formControlSelect}>
                        <Select
                            className={styles.selectBox}
                            native
                            IconComponent={ExpandMoreIcon}
                            value={filterStatus.status}
                            onChange={handleChangeStatus}
                            inputProps={{
                                name: 'status',
                            }}
                        >
                            {listStatuses?.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className={styles.formControlSelect}>
                        <Select
                            className={styles.selectBox}
                            native
                            IconComponent={ExpandMoreIcon}
                            value={filterType.type}
                            onChange={handleChangeType}
                            inputProps={{
                                name: 'type',
                                id: 'list-types',
                            }}
                        >
                            {listTypes?.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>

                <div className={styles.groupSearch}>
                    <Input
                        value={inputName}
                        type="text"
                        placeholder="Search"
                        onChange={handleSearchInputChange}
                        onPressEnter={handleSearchInputChange}
                    />
                    <Button>
                        <img src="/images/icons/search-icon.svg" alt="" />
                    </Button>
                </div>
            </div>

            <Hidden smDown>
                <TableContainer component={Paper} className={styles.tableContainer}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={styles.tableCellHead}>Project name</TableCell>
                                <TableCell className={styles.tableCellHead} align={'center'}>
                                    Type
                                </TableCell>
                                <TableCell className={styles.tableCellHead} align={'center'}>
                                    Status
                                </TableCell>
                                <TableCell className={styles.tableCellHead} align={'center'}>
                                    Allocation
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pools.length > 0 ? (
                                <>
                                    {pools.map((row: any, index: number) => (
                                        <TableRow key={index} className={styles.tableRow}>
                                            <TableCell className={styles.tableCellBody} component="th" scope="row">
                                                <div className={styles.flexName}>
                                                    <img className={styles.iconToken} src={row.token_images} alt="" />
                                                    <p className={styles.nameToken}>{row.name}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className={styles.tableCellBody1} align={'center'}>
                                                {getAccessPoolText(row)}
                                            </TableCell>
                                            <TableCell className={styles.tableCellBody} align={'center'}>
                                                {poolStatus(row)}
                                            </TableCell>
                                            <TableCell className={styles.tableCellBody1} align={'center'}>
                                                {allocationAmount(row)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        scope="row"
                                        className={styles.textError}
                                    >
                                     {error}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Hidden>

            <Hidden mdUp>
                <div className={styles.datasMobile}>
                    {pools.length > 0 ? (
                        <>
                            {pools.map((row: any, index: number) => (
                                <div key={index} className={styles.boxDataMobile}>
                                    <div className={styles.titleBoxMobile}>
                                        <div className={styles.nameMobile}>Project name</div>
                                        <div>
                                            <img className={styles.iconTokenMobile} src={row.token_images} alt="" />
                                            <span className={styles.nameTokenMobile}>{row.name}</span>
                                        </div>
                                    </div>
                                    <ul className={styles.infoMobile}>
                                        <li className={styles.flexMobile}>
                                            <div className={styles.nameMobile}>Type</div>
                                            <div className={styles.valueMobile}>{getAccessPoolText(row)}</div>
                                        </li>
                                        <li className={styles.flexMobile}>
                                            <div className={styles.nameMobile}>Status</div>
                                            <div className={styles.valueMobile}>{poolStatus(row)}</div>
                                        </li>
                                        <li className={styles.flexMobile}>
                                            <div className={styles.nameMobile}>Allocation</div>
                                            <div className={styles.valueMobile}>{allocationAmount(row)}</div>
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </>
                    ) : (
                       <>
                        <div className={styles.textError}>{error}</div>
                       </>   
                    )}
                </div>
            </Hidden>
            {totalPage > 1 && (
                <div className={styles.pagination}>
                    {
                        <Pagination
                            count={totalPage}
                            shape="rounded"
                            variant="outlined"
                            style={{ marginTop: 30 }}
                            className={styles.pagination}
                            onChange={(e: any, value: any) => {
                                if (!loadingGetPool) {
                                    setCurrentPage(value);
                                }
                            }}
                            page={currentPage}
                        />
                    }
                </div>
            )}
        </div>
    );
};

export default withWidth()(withRouter(MyPools));
