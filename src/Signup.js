import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => { 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
     
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:4000/user/register", {
            method: 'POST',
            body: JSON.stringify({user: {name: name, email: email, password: password}}),
            headers: new Headers({
                'Content-Type': "application/json"
            }) 
        }) 
          .then(
            (response) => response.json()
        ) .then((data) => {
            console.log('data:',data) 
            props.updateToken(data.sessionToken)
        }) .then((error) => setMessage("Signup failed")) 
    } 
    
    return (
        <div>
            <h3>Sign Up</h3>
            <Form onSubmit={handleSubmit}> 
                <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input onChange={(e) => setName(e.target.value)} name="name" value={name}/>      
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} name="email" value={email}/>      
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password}/>       
                </FormGroup>
                <Button type="submit">Signup</Button> 
                <br/>
                <br/> 
                <p>{message}</p>
            </Form>
        </div>
    )
}

export default Signup;