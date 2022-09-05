import { ActionButtons, Search, Table } from '../ActionItems';
import { useEffect, useState } from 'react';

import config from '../../config';

import styles from '../Dashboard/Dashboard.module.css'

const Dashboard = ({
    userDetails,
    rowLimit,
    onDelete,
    onSelect,
    onSelectAll,
    onBunchDelete,
    onEdit,
    onEditValues,
    onSearch,
}) => {

    const [noOfPages, setNoOfPages] = useState(1);
    const [pageLimit, setPageLimit] = useState(1);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);

    useEffect(() => {
        let _detailSize = userDetails.reduce((total, user) => {
            if (user.visible && !user.deleted) {
                return (total += 1);
            }
            return total;
        }, 0);
        let pages = Math.ceil(_detailSize / rowLimit);
        setNoOfPages(pages);
        if (pages <= config.PAGE_LIMIT) {
            if (pages <= 0) pages = 1;
            setPageLimit(pages);
            return;
        }
        setPageLimit(config.PAGE_LIMIT);
    }, [rowLimit, userDetails]);

    const getToFirstPage = () => {
        setCurrentPageIndex(1);
    };
    const getToLastPage = () => {
        setCurrentPageIndex(noOfPages);
    };
    const getToNextPage = () => {
        setCurrentPageIndex((curr) => curr + 1);
    };
    const getToPreviousPage = () => {
        setCurrentPageIndex((curr) => curr - 1);
    };
    const moveToPage = (event) => {
        event.preventDefault();
        setCurrentPageIndex(Number(event.target.innerText));
    };

    const getItemsPerPage = () => {
        let _data = userDetails.filter((user) => user.visible && !user.deleted);
        const startIndex = currentPageIndex * rowLimit - rowLimit;
        return _data.splice(startIndex, rowLimit);
    };

    const getSelectedCount = () => {
        const visibleUsers = getItemsPerPage();
        let selectedCount = visibleUsers.every((user) => !user.checked);
        return selectedCount;
    };

    const getAllSelected = () => {
        const visibleUsers = getItemsPerPage();
        let selectedFlag = visibleUsers.every((user) => user.checked);
        return selectedFlag;
    };

    const getPagination = () => {
        let _startValue =
            Math.floor((currentPageIndex - 1) / pageLimit) * pageLimit;
        const _pagination = [];

        for (let i = 0; i < pageLimit; i++) {
            let value = i + _startValue + 1;
            _pagination.push(value);
        }

        if (_pagination.at(0) > noOfPages) {
            if (_startValue <= 0) {
                return _pagination;
            }
            setCurrentPageIndex(_startValue);
        }

        return _pagination;
    };

    return (
        <div className={styles.dashboard}>
            <Search
                placeholder="Search by name, email or role"
                onChange={onSearch}
            />

            <Table
                getAllSelected={getAllSelected}
                onSelectAll={onSelectAll}
                itemsPerPage={getItemsPerPage}
                onSelect={onSelect}
                onEdit={onEdit}
                onDelete={onDelete}
                onEditValues={onEditValues}
            />

            <ActionButtons
                currentPageIndex={currentPageIndex}
                noOfPages={noOfPages}
                moveToFirstPage={getToFirstPage}
                moveToPreviousPage={getToPreviousPage}
                moveToPage={moveToPage}
                moveToNextPage={getToNextPage}
                moveToLastPage={getToLastPage}
                getSelectedCount={getSelectedCount}
                getPagination={getPagination}
                onBunchDelete={onBunchDelete.bind(null, getItemsPerPage())}
            />
        </div>
    );
};

export default Dashboard;
