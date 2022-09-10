import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";


function Exercise(props) {
    return (<tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={`/edit/${props.exercise._id}`} state={{id: props.exercise._id}}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
    )
}

const ExerciseList = () => {
    useEffect(() => {
        axios.get("http://localhost:5000/exercises")
            .then(async (response) => {
                setExercises(response.data);
            })
    }, [])

    const [exercises, setExercises] = useState([]);

   
    // const handleEdit=(id)=>{
    //     console.log(id);
    //     axios.get("http://localhost:5000/exercises/"+ id)
    //     .then((response)=>{
    //         console.log(response.data);
    //     })
    // }
    const handleDelete = ((id) => {
        axios.delete("http://localhost:5000/exercises/" + id)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    })
    const exerciseList = (() => {
        return exercises.map(currentExercises => {

            return <Exercise exercise={currentExercises} deleteExercise={handleDelete} key={currentExercises._id} />

        })

    })
    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList()}

                </tbody>

            </table>
        </div>
    )
}

export default ExerciseList;