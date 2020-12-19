import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';
import APIURL from '../helpers/environment';
import '../workouts/WorkoutStyle.css'; 
   
const WorkoutEdit = (props) => {
    const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
    const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
    const [editRes, setEditRes] = useState(props.workoutToUpdate.result);
    const workoutUpdate = (event, workout) => {
        event.preventDefault();
        fetch(`${APIURL}/journal/update/${props.workoutToUpdate.id}`, {   
        // fetch(`http://localhost:4000/journal/update/${props.workoutToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({log: {description: editDesc, definition: editDef, result: editRes}}),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token 
            })
        }) .then((res) => {
            props.fetchWorkouts();
            props.updateOff();
    })
}
  
return (
    <Modal isOpen={true}>
       <ModalHeader>Log a Workout
        <div class="close">   
        <Button onClick={props.updateOff}>X</Button> 
        </div>
       </ModalHeader>
       <ModalBody> 
        <Form onSubmit={workoutUpdate}>
         <FormGroup>
             <Label htmlFor="description">Edit Description:</Label>
             <Input name="description" value={editDesc} onChange={(e) => setEditDesc(e.target.value)}/>
         </FormGroup>
         <FormGroup> 
         <Label htmlFor="definition">Edit Definition:</Label>
            <Input type="select" name="definition" value={editDef} onChange={(e) => setEditDef(e.target.value)}> 
            <option></option>
            <option value="Time">Time</option>
            <option value="Weight">Weight</option>
            <option value="Distance">Distance</option>
            </Input>    
         </FormGroup>
         <FormGroup>
             <Label htmlFor="result">Edit Result:</Label>
             <Input name="result" value={editRes} onChange={(e) => setEditRes(e.target.value)}/>
         </FormGroup>     
         <Button type="submit">Update the workout!</Button>
        </Form>
       </ModalBody>
    </Modal>
  )
}

export default WorkoutEdit;
