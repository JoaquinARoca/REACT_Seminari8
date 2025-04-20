import React, {useState}from "react";
import { User } from '../../types';
import styles from './UsersList.module.css'; // Import CSS module
import UpdateUser from '../UpdateUser/UpdateUser';

interface Props {
    users: User[];
    onUpdateUser: (updatedUser:User) => void;
}

const UsersList: React.FC<Props> = ({ users,onUpdateUser }) => {
    const [updateUser, setUpdateUser] = useState<User | null>(null);

    const handleUserClick = (user: User) => {
        setUpdateUser(user);
    };

    const handleCloseEdit = () => {
        setUpdateUser(null);
    }

    const renderList = (): React.ReactNode[] => {
        return users.map((user) => (
            <li key={user.name} className={styles.listItem} >
                <div className={styles.userInfo}>
                    <h2 className={styles.user}>{user.name}</h2>
                    <h3 className={styles.age}>Age: {user.age}</h3>
                    <p className={styles.email}>{user.email}</p>
                    <button onClick={() => handleUserClick(user)}> Update an user</button>
                </div>
            </li>
        ));
    };

    return (
        <div>
        <ul className={styles.list}>{renderList()}</ul>
        {updateUser && (
            <UpdateUser
                user={updateUser}
                onClose={handleCloseEdit}
                onSave={(updatedUser) => {
                    onUpdateUser(updatedUser);
                    handleCloseEdit();
                }}
            />
        )}
    </div>
    );
};

export default UsersList;