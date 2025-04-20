import React, { useState } from "react";
import { User } from '../../types';
import { updateUser } from "../../services/usersService";

interface UserEditProps {
    user: User;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
}

const UpdateUser: React.FC<UserEditProps> = ({ user, onClose, onSave }) => {
    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age);

    const handleSave = async () => {
        try {
            if (!user.email) {
                console.error("Email is required to update the user.");
                return;
            }

            const updatedUser = { ...user, name, age };
            await updateUser(user.email, updatedUser);
            onSave(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div>
            <h2>Edit User</h2>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <span>{user.email}</span>
                </div>
                <div>
                    <button type="button" onClick={handleSave}>Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
