import React, {useState, useEffect} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import APIURL from '../helpers/environment';
 
const WorkoutCreate = (props) => {
    const [description, setDescription] = useState('');
    const [definition, setDefinition] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/journal/create`, {  
        // fetch('http://localhost:4000/journal/create', {
            method: 'POST',
            body: JSON.stringify({log: {description: description, definition: definition, result: result}}),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token 
            })
        }) .then((res) => res.json())
        .then((logData) => {
            console.log(logData);
            setDescription('');
            setDefinition('');
            setResult('');
            props.fetchWorkouts();
        })
    }

    return (
        <>
        <br/>
        <h3>Log a Workout</h3>
        <br/>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                {/* <Label htmlFor="description"/> */}
                <Label htmlFor="description">Description</Label>
                <Input name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </FormGroup>
            <FormGroup> 
                <Label htmlFor="definition">Definition</Label>
                <Input type="select" name="definition" value={definition} onChange={(e) => setDefinition(e.target.value)}>
                <option value=""></option>
                <option value="Distance">Distance</option>
                <option value="Time">Time</option>
                <option value="Weight">Weight</option>                
                </Input>    
            </FormGroup>    
            <FormGroup>
                <Label htmlFor="result">Result</Label>
                <Input name="result" value={result} onChange={(e) => setResult(e.target.value)}/>
            </FormGroup>
            <Button type="submit">Click to Submit</Button>
        </Form>
        </>
    )
}

export default WorkoutCreate;