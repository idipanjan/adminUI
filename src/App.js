import './App.css';

import { useEffect, useState } from 'react';

import Dashboard from './components/Dashboard';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import config from './config';

function App() {
    const [error, setError] = useState({});
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        dataApiCall();
    }, []);

    const dataApiCall = async () => {
        let API_response;
        try {
            API_response = await axios.get(config.API_URL);
            if (API_response.status !== StatusCodes.OK) {
                throw new Error(
                    'Something happened calling the API..'
                );
            }
            API_response.data = API_response.data.map((element) => ({
                ...element,
                visible: true,
                deleted: false,
                checked: false,
                edit: false,
            }));
            setUserData(API_response.data);
        } catch (error) {
            const statusCode = error.response.status
                ? error.response.status
                : StatusCodes.BAD_REQUEST;
            setError({ statusCode, message: error.message });
        }
    };

    const performSearch = (event) => {
        const searchText = event.target.value.toLowerCase();
        const users = [...userData];
        const userDetails = users.map((user) => {
            if (
                user.name.toLowerCase().includes(searchText) ||
                user.role.toLowerCase().includes(searchText) ||
                user.email.toLowerCase().includes(searchText)
            ) {
                return { ...user, visible: true };
            } else {
                return { ...user, visible: false };
            }
        });
        setUserData(userDetails);
    };

    const performDelete = (id) => {
        const users = [...userData];
        const userDetails = users.map((user) => {
            if (user.id === id) {
                return { ...user, deleted: true };
            }
            return user;
        });
        setUserData(userDetails);
    };

    const performBunchDelete = (items) => {
        const userDetails = [...userData];
        userDetails.forEach((userDetail) => {
            items.forEach((item) => {
                if (item.id === userDetail.id && item.checked) {
                    userDetail.deleted = true;
                }
            });
        });
        setUserData(userDetails);
    };

    const handleSelect = (event, user) => {
        const current_selected = event.target;
        const userDetails = [...userData];
        const userIdx = userDetails.indexOf(user);
        if (current_selected.checked) {
            userDetails[userIdx].checked = true;
        } else {
            userDetails[userIdx].checked = false;
        }
        setUserData(userDetails);
    };
    const handleSelectAll = (event, items) => {
        // event.preventDefault();
        const current = event.target;
        const userDetails = [...userData];
        if (current.checked) {
            userDetails.forEach((userDetail) => {
                items.forEach((item) => {
                    if (item.id === userDetail.id) {
                        userDetail.checked = true;
                    }
                });
            });
        } else {
            userDetails.forEach((userDetail) => {
                items.forEach((item) => {
                    if (item.id === userDetail.id) {
                        userDetail.checked = false;
                    }
                });
            });
        }
        setUserData(userDetails);
    };

    const performEdit = (user) => {
        const userDetails = [...userData];
        const userIdx = userDetails.indexOf(user);
        userDetails[userIdx].edit = true;
        setUserData(userDetails);
    };

    const performValueEdit = (user, editedValues) => {
        const userDetails = [...userData];
        const _userIdx = userDetails.indexOf(user);
        if (editedValues['name']) {
            userDetails[_userIdx].name = editedValues.name;
        }
        if (editedValues['email']) {
            userDetails[_userIdx].email = editedValues.email;
        }
        if (editedValues['role']) {
            userDetails[_userIdx].role = editedValues.role;
        }
        userDetails[_userIdx].edit = false;
        setUserData(userDetails);
    };

    return (
        <div className="App">
            {error.message && <h1>{error.message}</h1>}
            {userData.length !== 0 && (
                <Dashboard
                    userDetails={userData}
                    rowLimit={config.ROW_LIMIT}
                    onDelete={performDelete}
                    onSelect={handleSelect}
                    onSelectAll={handleSelectAll}
                    onBunchDelete={performBunchDelete}
                    onEdit={performEdit}
                    onEditValues={performValueEdit}
                    onSearch={performSearch}
                />
            )}
        </div>
    );
}

export default App;
