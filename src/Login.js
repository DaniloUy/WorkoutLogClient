import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'; //1

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
     
    const handleSubmit = (event) => {
      event.preventDefault();
      fetch('http://localhost:4000/user/login',{
          method: 'POST',
          body: JSON.stringify({user:{email: email, password: password}}), 
          headers: new Headers({
              'Content-Type': 'application/json'
          })
        }) .then(
            (response) => response.json()    
        )  .then((data) => {
            console.log('data:',data);     
            props.updateToken(data.sessionToken);  
            setMessage(data.message);  
        }) .then((error) => setMessage("Login failed")) 
    }

    return(
        <div>
            <h3>Login</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} name="email" type="email" value={email}/>  
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password}/>  
                </FormGroup>
                <Button type="submit">Login</Button>
                <br/>
                <br/>
                <p>{message}</p> 
            </Form>
        </div>
    )
}

export default Login;