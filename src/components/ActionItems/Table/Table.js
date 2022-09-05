import { TableHeading, User } from '../index';

import { useState } from 'react';

const Table = ({
    getAllSelected,
    onSelectAll,
    itemsPerPage,
    onSelect,
    onEdit,
    onDelete,
    onEditValues,
}) => {
    const [editedUser, setEditedUser] = useState({});

    const handleUserEditing = (event) => {
        setEditedUser({
            ...editedUser,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <table>
            <TableHeading
                getAllSelected={getAllSelected}
                onSelectAll={onSelectAll}
                getItemsPerPage={itemsPerPage}
            />
            <tbody>
                {itemsPerPage().map((items, idx) => (
                    <User
                        key={idx}
                        user={items}
                        onSelect={onSelect}
                        handleEdit={handleUserEditing}
                        onEditClick={onEdit.bind(null, items)}
                        onDeleteClick={onDelete.bind(null, items.id)}
                        onConfirmEdit={onEditValues.bind(
                            null,
                            items,
                            editedUser
                        )}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default Table;
