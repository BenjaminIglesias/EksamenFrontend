import React, { useState, useEffect} from "react";
import Popup from 'reactjs-popup';

import facade from "./apiFacade";
import StarWars from "./starWars";
import CRDComponent from "./CreateUpdateDeleteComponent";
import WelcomePage from "./welcomePage";
import { Switch, Route, NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'reactjs-popup/dist/index.css';


import 'bootstrap/dist/css/bootstrap.min.css';


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
          <th style={{backgroundColor: "#0275d8", color: "white"}}>FirstName</th>
          <th style={{backgroundColor: "#0275d8", color: "white"}}>LastName</th>
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
        <tr key={data.firstName}>
          
          <Popup trigger={<td> {data.firstName} </td>} >
          Race: {data.lastName} <br/>
          Navn: {data.birthyear}
          <img src={"https://images.dog.ceo/breeds/affenpinscher/n02110627_11759.jpg"}  style={{width:"100%"}} />
          
          </Popup>
       
        </tr>
      );
    });
    return returned;
  }
}













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
        <Route exact path="/CRUDPage">
          <CRUDPage />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
