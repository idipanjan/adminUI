
import CircularButton from './CircularButton/CircularButton';

import styles from './ActionButtons.module.css';

const ActionButtons = ({
    currentPageIndex,
    noOfPages,
    moveToFirstPage,
    moveToPreviousPage,
    moveToPage,
    moveToNextPage,
    moveToLastPage,
    getSelectedCount,
    getPagination,
    onBunchDelete,
}) => {
    return (
        <div className={styles.action__btn}>
            <button
                className={styles.actionBtn__delete}
                disabled={getSelectedCount()}
                onClick={onBunchDelete}
            >
                <span>Delete Selected</span>
            </button>

            <CircularButton
                content={`${String.fromCharCode(60)}${String.fromCharCode(60)}`}
                isDisabled={currentPageIndex === 1 ? true : false}
                isSelected={false}
                onClick={moveToFirstPage}
            />

            <CircularButton
                content={String.fromCharCode(60)}
                isDisabled={currentPageIndex === 1 ? true : false}
                isSelected={false}
                onClick={moveToPreviousPage}
            />
            {getPagination().map((item, idx) => (
                <CircularButton
                    key={idx}
                    content={item}
                    isDisabled={false}
                    isSelected={currentPageIndex === idx + 1 ? true : false}
                    onClick={moveToPage}
                />
            ))}
            <CircularButton
                content={String.fromCharCode(62)}
                isDisabled={
                    currentPageIndex === noOfPages || noOfPages === 0
                        ? true
                        : false
                }
                isSelected={false}
                onClick={moveToNextPage}
            />
            <CircularButton
                content={`${String.fromCharCode(62)}${String.fromCharCode(62)}`}
                isDisabled={
                    currentPageIndex === noOfPages || noOfPages === 0
                        ? true
                        : false
                }
                isSelected={false}
                onClick={moveToLastPage}
            />
        </div>
    );
};

export default ActionButtons;
