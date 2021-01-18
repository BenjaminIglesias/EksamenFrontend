import Popup from 'reactjs-popup';
import React, { useState, useEffect} from "react";
import facade from "./apiFacade";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import 'reactjs-popup/dist/index.css';


export default function CRD(props){
    let {setError , error} = props;

    
    function Create(){
        

        
        
      const [userName, setUserName] = useState("");
      const [userPass, setUserPass] = useState("");
      const [name, setName] = useState("");
      const [age, setAge] = useState("");
      const [weight, setWeight] = useState("");
     
      const person = {
        userName: userName,
        userPass: userPass,
        userInfo:{ 
          name: name,
          age: age ,
          weight: weight 
        }
        
      }
      
      function validateForm() {
        
        return userName.length > 0 && userPass.length > 0 && name.length > 0 && age.length > 0 && weight.length > 0;
      
      }
      
        
        
        function handleSubmit(event) {
           facade.addUser(person).catch(err => err.fullError).then(err => setError(err));
        
          event.preventDefault();
        }
        
        
        
        
        
        
          return(
            <div className="CreateUser">
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="firstName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  autoFocus
                  type="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="userPass">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="lastName"
                  value={userPass}
                  onChange={(e) => setUserPass(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
             
              <Form.Group size="lg" controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Group>
             
              <Form.Group size="lg" controlId="weight">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </Form.Group>
             



              <Button block size="lg" type="submit" disabled={!validateForm()} >
                Create User
              </Button>
            </Form>
          
          </div> )
        }
      
        function Edit(){
            
        const [firstName, setFirstName] = useState("");
        const [lastName, setlastName] = useState("");
        const [birthyear, setBirthyear] = useState("");
 
        
        const person = {
          firstName: firstName,
          lastName: lastName,
          birthyear: birthyear
          
        }
        
        function validateForm() {
          
          return firstName.length > 0 && lastName.length > 0 && birthyear.length > 0;
        
        }
        
        
        function handleSubmit(event) {
           facade.addPerson(person)
          console.log(person);
          event.preventDefault();
        }
        
        
        
        
        
        
          return(
            <div  className="CreateUser">
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  autoFocus
                  type="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="LastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="lastName"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="birthyear">
                <Form.Label>Birthyear</Form.Label>
                <Form.Control
                  type="birthyear"
                  value={birthyear}
                  onChange={(e) => setBirthyear(e.target.value)}
                />
              </Form.Group>
             
              <Button block size="lg" type="submit" disabled={!validateForm()} >
                Create User
              </Button>
            </Form>
          </div> )
        }
        





    return (
        <div><h2>Her kan du lave en bruger, tryk på knappen og begynd</h2>
        <div class="d-flex justify-content-left">
        
            <div className="btn-group " role="group" aria-label="Basic example">
          <Popup trigger={<button type="button" className="btn btn-secondary">Tilføj Bruger</button>} position="bottom left">
          <Create/>
          </Popup>
        
        
        
     
        </div>
        
        </div>
        </div>
          ) 
}

