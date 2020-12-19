import React, {useState} from 'react';
import {Container, Row, Col} from 'reactstrap'; //1
import Signup from '../Signup';
import Login from '../Login';
import '../auth/Auth.css';
import APIURL from '../helpers/environment';

// const Auth = (props) => { //2
//   return(
//     <Container className="auth-container">
//         <Row>
//             <Col md="6">
//                 <Login updateToken={props.updateToken}/>                 
//             </Col>
//             <Col md="6" className="login-col">
//                 <Signup updateToken={props.updateToken}/>
//             </Col>
//         </Row>
//     </Container>  
//   )
// }

const Auth = (props) => { 
  console.log(props);

  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [login, setLogin] = useState(true);
  const [message, setMessage] = useState('');
     
  const handleSubmit = (event) => {
    // stops browser from refreshing when form is submitted
    event.preventDefault();
    // sets up the value of the url dependent on if logging in or signing up
    // const url = login ? 'http://localhost:4000/user/login' : 'http://localhost:4000/user/register';  
    const url = login ? `${APIURL}/user/login` : `${APIURL}/user/register`;  
    // sets up the value of the data we are going to send to the url based on login value
    const bodyObj = login ? {user: {
      email: email,
      password: password
    }} : {user: {
      name: name,
      email: email,
      password: password
    }}

    fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': "application/json"      
      }),
      body: JSON.stringify(bodyObj)
    })
    .then(response => response.json())
    // .then(data => props.updateToken(data.sessionToken))
    .then((data) => {
      console.log('data:',data);     
      props.updateToken(data.sessionToken);  
      setMessage(data.message);  
    }) .then((error) => login ? setMessage("Login failed") : setMessage("Signup failed")) 
  }
          
  const title = () => {
      return login ? 'Login' : 'Signup';         
      // if login is true, return the string of 'Login', Else return 'Signup';
  }
  
  const loginToggle = (event) => {
    event.preventDefault();
    setLogin(!login) //=> set login to be the opposite of its current value  
    setName("");
    setEmail("");
    setPassword("");
    setMessage("");
  }

  const signupFields = () => {
    return !login ? ( 
      <div>
          <label htmlFor="name">Name:</label>
          <br/>
          <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          />
      </div>
    ) : null
  }
        
  return (
      <div class="Login">
         <form onSubmit={handleSubmit}> 
           <br/>
           <h1>{title()}</h1>
           {signupFields()}
           <label htmlFor="email">Email:</label>    
           <br/>
           <input 
               type="text" 
               id="email" 
               // two-way data binding. This builds a closed circuit to display 
               // and update an input field
               // The data comes in  and changes the state variable via setEmail.
               //The state variable (email) is tied to the input field via the value attribute.
               value={email} 
               placeholder="email@email.com" 
               onChange={(event) => {
               //console.log(event) 
               setEmail(event.target.value);  
               }} 
           /> 
           <br/>     
           <label htmlFor="password">Password:</label>    
           <br/>
           <input 
               type="password" 
               id="password" 
               value={password} 
               //placeholder="password" 
               onChange={(event) => {
               //console.log(event) 
               setPassword(event.target.value);
               }} 
           /> 
           <br/>
           <br/>
           <button onClick={loginToggle}>Login/Signup Toggle</button>
           <br/>
           <br/>
           <button type="submit">Submit</button>
           <br/>
           <br/>
           <p>{message}</p>  
         </form>  
      </div>
);
};

export default Auth;
