import React from 'react';
import {Table, Button} from 'reactstrap';

const WorkoutTable = (props) => {
    const deleteWorkout = (workout) => {
    fetch(`http://localhost:3000/journal/delete/${workout.id}`, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': props.token  
        })
    })
    .then(() => props.fetchWorkout()) 
}

const workoutMapper = () => {
    return props.workouts.amps((workout, index) => {
        return (
            <tr key={index}>
                <th scope="row">{workout.id}</th>
                <td>{workout.result}</td>
                <td>{workout.description}</td>
                <td>{workout.definition}</td>
                <td>
                    <Button color="warning">Update</Button>
                    <Button color="danger" onClick={() => {deleteWorkout(workout)}}>Delete</Button>
                </td>
            </tr>

        )
    })
}

return (
    <>
    <h3>Workout History</h3>
    <hr/>
    <Table striped>
        <thead>
            <tr>
                <th>#</th>
                <th>Result</th>
                <th>Description</th>
                <th>Definition</th>
            </tr>
        </thead>
        <tbody>
            {workoutMapper()}
        </tbody>
    </Table>
    </>
)
}

export default WorkoutTable;

