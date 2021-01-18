import React, { useState, useEffect} from "react";
import Popup from 'reactjs-popup';

import facade from "./apiFacade";
import StarWars from "./starWars";
import CRDComponent from "./CreateUpdateDeleteComponent";
import CreateActivityComponent from "./CreateActivityComponent";
import WelcomePage from "./welcomePage";
import { Switch, Route, NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'reactjs-popup/dist/index.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import { hydrate } from "react-dom";


function Header({loggedIn}) {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="selected" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/LoginPage">
            Login Side
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="selected" to="/UserPage">
           User Page
          </NavLink>
        </li>
        {!loggedIn && (
        <li>
          <NavLink exact activeClassName="selected" to="/CRUDPage">
           Opret Bruger
          </NavLink>
        </li>)}
        {loggedIn && (
          <li>
          <NavLink activeClassName="selected" to="/ActivityList">
           Mine Aktiviteter
          </NavLink>
        </li>
        )}
        {loggedIn && (
          <li>
          <NavLink activeClassName="selected" to="/ActivityPage">
           Lav ny aktivitet 
          </NavLink>
        </li>
        )}
        {loggedIn && (
          <li>
          <NavLink activeClassName="selected" to="/StarwarsPage">
            Star Wars
          </NavLink>
        </li>
        )}
  
      </ul>
    </div>
  );
}





function StarWarsPage() {
  const emptyData = {
    planetInfo: [{ name: "Loading..." }],
    characterInfo: [{ name: "Loading..." }],
  };
  const [fetchedData, setfetchedData] = useState(emptyData);
  const [fetchedDataError, setfetchedDataError] = useState("");

  useEffect(() => {
    facade.fetchStarWarsData().then((data) => setfetchedData(data)).catch(err => err.fullError).then(err => setfetchedDataError(err));
  }, []);

  if(fetchedDataError){
  return <h3>{fetchedDataError.message}</h3>
  }
  return <StarWars fetchedData={fetchedData} />;
}

function UserPage(){

  const [fetchedData,setfetchedData] = useState([]);
  useEffect(() => {
    facade.fetchPersonData().then((data) => setfetchedData(data));
  }, []);


  return (
  <div> 
     <div>
  <h3>Click for more info</h3>
    <table>
      <thead>
        <tr>
          <th style={{backgroundColor: "#0275d8", color: "white"}}>Username</th>
     
        </tr>
      </thead>
      <tbody>{mapUsers(fetchedData)}</tbody>
    </table>
  </div>
 
  </div>

  )
  function mapUsers(fetchedData) {
    let returned = fetchedData.map((data) => {
      return (
        <tr key={data.userName}>
          
          <Popup trigger={<td> {data.userName} </td>} >
          Name: {data.userInfo.name} <br/>
          Age: {data.userInfo.age} <br/>
          Weight: {data.userInfo.weight}

       
          </Popup>
       
        </tr>
      );
    });
    return returned;
  }
}




function ActivityList(){

  const [fetchedData,setfetchedData] = useState([]);
  useEffect(() => {
    facade.fetchActivityData(parseJwt(facade.getToken()).sub).then((data) => setfetchedData(data));
  }, []);


  return (
  <div> 
     <div>
  <h3>Click for more info</h3>
    <table>
      <thead>
        <tr>
          <th style={{backgroundColor: "#0275d8", color: "white"}}>Aktivitet</th>
          <th style={{backgroundColor: "#0275d8", color: "white"}}>Tid</th>
          <th style={{backgroundColor: "#0275d8", color: "white"}}>Distance</th>
          <th style={{backgroundColor: "#0275d8", color: "white"}}>Kommentar</th>
     
        </tr>
      </thead>
      <tbody>{mapUsers(fetchedData)}</tbody>
    </table>
  </div>
 
  </div>

  )
  function mapUsers(fetchedData) {
    let returned = fetchedData.map((data) => {
      return (
        <Popup trigger={
        <tr key={data.userName}>
          
         <td> {data.exerciseType} </td>  <td> {data.duration} </td>  <td> {data.distance} </td> <td> {data.exerciseType} </td>
        
         
        </tr>
        }>
            <h4>Sted</h4>
          By: {data.cityInfo.name} <br/>
          Koordinater: {data.cityInfo.geocoordinates} <br/>
          Kommune: {data.cityInfo.municipality}  <br></br>        
          Befolkning: {data.cityInfo.population} personer<br></br>
          <br></br>
          <h4>Vejr</h4>
          Temperatur: {data.weatherInfo.temperature} grader celcius <br/>
          Vejrtekst: {data.weatherInfo.skyText} <br/>
          Luftfugtighed: {data.weatherInfo.humidity}%<br></br>  
          Vind: {data.weatherInfo.windText}<br></br>

   
       
        </Popup>
       
    );
    });
    return returned;
  }
}

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }}








function Home() {
  return (
    <WelcomePage/>
    );
}

function LoginPage({ setLoggedIn, loggedIn }) {
  const [loggedInError, setLoggedInError] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true))
      .catch((err) => err.fullError)
      .then((data) => setLoggedInError(data));
  };

  if (loggedInError) {
    return (
      <div>
        <LogIn login={login} />
        <h3>{loggedInError.message}</h3>
      </div>
    );
  }

  return (
    <div>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <LoggedIn />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input type="password" placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("");
  const jwt = require("jsonwebtoken");
  const token = localStorage.getItem("jwtToken");
  const role = jwt.decode(token).roles;

  let roleToFetch = role;
  if (roleToFetch === "admin,user") {
    roleToFetch = "admin";
  }
  useEffect(() => {
    facade.fetchData(roleToFetch).then((data) => setDataFromServer(data.msg));
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
      <h3>Role: {role}</h3>
    </div>
  );
}


function CRUDPage(){
  const [fetchedDataError, setFetchedDataError] = useState("");

if(fetchedDataError){
  return <h3>{fetchedDataError.message}</h3>
}
return (
<CRDComponent error={fetchedDataError} setError={setFetchedDataError}/>

)
}


function ActivityPage(){
  const [fetchedDataError, setFetchedDataError] = useState("");

if(fetchedDataError){
  return <h3>{fetchedDataError.message}</h3>
}
  return (<CreateActivityComponent error={fetchedDataError} setError={setFetchedDataError}/>)
}


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/LoginPage">
          <LoginPage setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        </Route>
        <Route exact path="/UserPage">
          <UserPage/>
        </Route>
       
        <Route exact path="/StarWarsPage">
          <StarWarsPage />
        </Route>
        <Route exact path="/ActivityList">
          <ActivityList/>
        </Route>
        <Route exact path="/ActivityPage">
          <ActivityPage />
        </Route>
        <Route exact path="/CRUDPage">
          <CRUDPage />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
