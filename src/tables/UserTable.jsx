import React from 'react';

const UserTable = (props) => {

    let activeState = "";
    return (
        <table>
            <thead>
                <th>id</th>
                <th>username</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>email</th>
                <th>phone</th>
                <th>accountActive</th>
            </thead>
            <tbody>
                { props.users.length > 0 ? (
                    props.user.map(user => {
                        const {id, userName, first_name, last_name, email, phone_number, account_active} = user;
                        if(account_active = "true"){
                            activeState = "Deactivate";
                        } else {
                            activeState = "Activate";
                        }
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{enabled}</td>
                                <td>{userName}</td>
                                <td>{first_name}</td>
                                <td>{last_name}</td>
                                <td>{email}</td>
                                <td>{phone_number}</td>
                                <td>{account_active}</td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}> No users found</td>
                    </tr>
                )
                }
            </tbody>
        </table>
    )
}