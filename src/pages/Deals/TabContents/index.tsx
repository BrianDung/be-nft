/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */

import { Spin } from 'antd';
import { debounce, get, isArray, isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import Empty from 'components/Empty';
import axios from 'services/axios';
import styles from './style.module.scss';
import CarProjectsDetail from 'components/Base/CardProject/CardProjectDetail';

interface TabContentProps {
    tabIndex: number;
}

const LIMIT = 12;

const listTab = [
    {
        endpoint: '/pools/v3/upcoming-pools',
    },
    {
        endpoint: '/pools/v3/next-to-launch-pools',
    },
    {
        endpoint: '/pools/v3/active-pools',
    },
    {
        endpoint: '/pools/v3/complete-sale-pools',
    },
    {
        endpoint: '/pools',
    },
];

export const Content = (data: any , tabIndex: number) => {
    return (
        <div className={styles.rowWrapper}>
            {data.map((ele: any) => {
                return <CarProjectsDetail data={ele} key={ele.id} isFlexStart={true} tabIndex={tabIndex} />;
            })}
        </div>
    );
};



const TabContent = (props: TabContentProps) => {
    const { tabIndex } = props;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [list, setList] = useState<any>([]);
    const [metadata, setMetadata] = useState({
        lastPage: 0,
        page: 0,
    });

    const [loading, setLoading] = useState<boolean>(false);

    const fetchDataInTab = async (page: number) => {
        try {
            setLoading(true);
            const uri = `${listTab[tabIndex].endpoint}?page=${page}&limit=${LIMIT}`;
            const res = (await axios.get(uri as string)) as any;
            setMetadata({
                lastPage: get(res, 'data.data.lastPage', 0),
                page: get(res, 'data.data.page', 0),
            });
            setList([...list, ...get(res, 'data.data.data', [])]);
        } catch (e: any) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataInTab(currentPage);
    }, [currentPage]);

    const onLoadMore = debounce(() => {
        if (loading) return;
        setCurrentPage((currentPage) => currentPage + 1);
    }, 300);

    return (
        <>
            {isArray(list) && !isEmpty(list) ? (
                <>
                    {Content(list ,tabIndex)}
                    {metadata?.lastPage > metadata?.page && (
                        <div className={styles.loadmore} onClick={onLoadMore}>
                            {loading ? (
                                <Spin />
                            ) : (
                                <>
                                    <span>Load more</span> &nbsp;
                                    <img alt="btn" src="/images/icons/loadmore.svg" />
                                </>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <Empty text="No deals for now" />
            )}
        </>
    );
};

export default TabContent;
