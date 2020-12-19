import React from 'react';
import {Table, Button} from 'reactstrap';
import APIURL from '../helpers/environment';

const WorkoutTable = (props) => {
    const deleteWorkout = (workout) => {
    fetch(`${APIURL}/journal/delete/${workout.id}`, {
    // fetch(`http://localhost:4000/journal/delete/${workout.id}`, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': props.token  
        })
    })
    .then(() => props.fetchWorkouts()) 
}

const workoutMapper = () => {
    return props.workouts.map((workout, index) => {
        return (
            <tr key={index}>
                <th scope="row">{workout.id}</th>
                <td>{workout.description}</td>
                <td>{workout.definition}</td>
                <td>{workout.result}</td>
                <td>
                    <Button color="warning" onClick={() => {props.editUpdateWorkout(workout); props.updateOn()}}>Update</Button>
                    <Button color="danger" onClick={() => {deleteWorkout(workout)}}>Delete</Button>
                </td>
            </tr>

        )
    })
}

return (
    <>
    <br/>
    <h3>Workout History</h3>
    {/* <hr/> */}
    <Table striped>
        <thead>
            <tr>
                <th>Log #</th>
                <th>Description</th>
                <th>Definition</th>
                <th>Result</th>
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

