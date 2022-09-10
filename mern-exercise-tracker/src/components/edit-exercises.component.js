import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from 'react-router-dom'

const EditExercises = () => {
    const location = useLocation();
    const { id } = location.state
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [startDate, setStartDate] = useState(new Date());


    useEffect(() => {
        axios.get("http://localhost:5000/exercises/" + id)
            .then((response) => {
                console.log(response.data);
                setUsername(response.data.username);
                setDescription(response.data.description);
                setDuration(response.data.duration);
                setStartDate (new Date(response.data.date));

            })
            .catch((err) => {
                console.log(err);
            })

        axios.get("http://localhost:5000/users")
            .then((response) => {
                if (response.data.length > 0) {
                    let users = response.data.map(users => users.username)
                    setUsers(users);
                    setUsername(users[0])
                }

            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const handleSubmit=(e)=>{
        e.preventDefault();

        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: startDate
        }

        axios.post("http://localhost:5000/exercises/update/" + id, exercise)
        .then((response)=>{
            console.log(response.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label>Username : </label>
                    <select
                        required
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}>
                        {users.map((user) => {


                            return (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            )
                        })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}

                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={(e)=>setDuration(e.target.value)}

                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
export default EditExercises;