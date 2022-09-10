import React, { useState } from "react";
import axios from "axios";

const CreateUsers = () => {

    const [username, setUsername] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username
        }
        axios.post('http://localhost:5000/users/add', user)
            .then((response) => {
                alert(response.data)
            }).catch((err) => {
                console.log(err);
            })
    }


    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary mt-3" />
                </div>
            </form>
        </div>
    )
}

export default CreateUsers;