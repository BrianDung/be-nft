/* eslint-disable react-hooks/exhaustive-deps */

import styles from './style.module.scss';
import { Content } from '..';
import Pagination from '@material-ui/lab/Pagination';
import { useEffect, useRef, useState } from 'react';
import Empty from '../../../../components/Empty';
import axios from '../../../../services/axios';

//const ArrowIcon = () => <img src="images/icons/arrow-icon.svg" alt="icon" />;
// const TitleIcon = () => {
//   return <img src="images/icons/icon_title.svg" alt="title-icon" />;
// };
// const IMAGE = "images/CardImage.png";

interface TabAllProps {
    list: any;
    tabIndex: number
}

const listTab = [
    {
        name: 'In progress',
        tabIndex: 2,
    },
    {
        name: 'Next to launch',
        tabIndex: 1,
    },
    {
        name: 'Upcoming ',
        tabIndex: 0,
    },
    {
        name: 'End',
        tabIndex: 3,
    },
];

const TabAll = (props: TabAllProps) => {
    const { list , tabIndex } = props;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [listData, setListData] = useState<any>([]);
    const LIMIT = 8;
    const [totalPage, setTotalPage] = useState<number>(0);
    const ref = useRef(false);

    const fetchAllData = async () => {
        const values = await Promise.all([
            axios.get(`/pools/v3/active-pools?page=${currentPage}&limit=${LIMIT}`),
            axios.get(`/pools/v3/next-to-launch-pools?page=${currentPage}&limit=${LIMIT}`),
            axios.get(`/pools/v3/upcoming-pools?page=${currentPage}&limit=${LIMIT}`),
            axios.get(`/pools/v3/complete-sale-pools?page=${currentPage}&limit=${LIMIT}`),
        ]);
        setListData(values);
    };

    useEffect(() => {
        const listClone = [...list];
        const reverseList = listClone.reverse();
        setListData([...reverseList.slice(1, 4), reverseList[0]]);
    }, []);

    useEffect(() => {
        if (!ref.current) {
            ref.current = true;
            return;
        }

        fetchAllData();
    }, [currentPage]);

    return (
        <>
            {
                // listData?.length ? (
                <>
                    <>
                        {listData?.map((item: any, index: number) => {
                            const itemData = item?.data?.data || [];
                            const lastPage = itemData?.lastPage;
                            if (lastPage > totalPage) {
                                setTotalPage(lastPage);
                            }
                            return (
                                <div key={index}>
                                    <div className={styles.itemTitle}>{listTab[index].name}</div>
                                    <div className={styles.itemContainer}>
                                        {itemData?.data?.length ? Content(itemData ,tabIndex) : <Empty text="No deals for now" />}
                                    </div>
                                </div>
                            );
                        })}

                        <Pagination
                            count={totalPage}
                            color="primary"
                            style={{ marginTop: 30 }}
                            className={styles.pagination}
                            onChange={(e: any, value: any) => {
                                setCurrentPage(value);
                            }}
                            page={currentPage}
                        />
                    </>
                </>
            }
        </>
    );
};

export default TabAll;
