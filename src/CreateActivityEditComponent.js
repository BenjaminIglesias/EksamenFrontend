import Popup from 'reactjs-popup';
import React, { useState, useEffect} from "react";
import facade from "./apiFacade";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import 'reactjs-popup/dist/index.css';


export default function CreateActivity(props){
    let {id,} = props;
    console.log(id);
    function Create(){
        
     
       
        
      const [type, setType] = useState("");
      const [min, setMin] = useState("");
      const [distance, setDistance] = useState("");
      const [comment, setComment ]= useState("");
      const forceUpdate = useForceUpdate();

     
      const activity = {
        exerciseType: type,
        duration: min ,
        distance: distance ,
        comment: comment
      }
      
      function validateForm() {
        
        return type.length > 0 && min.length > 0 && distance.length > 0 && comment.length > 0 ;
      
      }
      
      
        
        function handleSubmit(event) {
            forceUpdate();
           facade.editActivityData(id , activity).catch(err => err.fullError)
        
          event.preventDefault();
        }
        
        
        
        
        
        
          return(
            <div className="CreateActivity">
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="type">
                <Form.Label>Aktivitetstype</Form.Label>
                <Form.Control
                  autoFocus
                  type="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="min">
                <Form.Label>Antal minutter</Form.Label>
                <Form.Control
                  type="min"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="distance">
                <Form.Label>Distance i km</Form.Label>
                <Form.Control
                  type="distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </Form.Group>
             
              <Form.Group size="lg" controlId="age">
                <Form.Label>Kommentar til træning</Form.Label>
                <Form.Control
                  type="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
             
             



              <Button block size="lg" type="submit" disabled={!validateForm()} >
               Lav aktivitet
              </Button>
            </Form>
          
          </div> )
        }
        





    return (
        <div class="d-flex justify-content-center">
        
            <div className="btn-group " role="group" aria-label="Basic example">
         
          <Create/>
         
        
        
     
        </div>
        
        </div>
          ) 
}
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }}

  function useForceUpdate(){
    const [value, setValue] = useState(0); 
    return () => setValue(value => value + 1);}