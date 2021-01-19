import URL from "./settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };
  const fetchData = (role) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/" + role, options).then(handleHttpErrors);
  };

  const editActivityData = (id, activity) => {
    const options = makeOptions("PUT", true, activity); //True add's the token
    return fetch(URL + "/api/Activity/update/" + id,options).then(handleHttpErrors);
  };

  const fetchPersonData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/User/getAll",options).then(handleHttpErrors);
  };

  const fetchActivityData = (name) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/Activity/getAll/" + name,options).then(handleHttpErrors);
  };


  function addActivity(activity, location, userName){
    const options = makeOptions("POST", true, activity)
    return fetch(URL + "/api/Activity/add" +"/" + location + "/" +userName ,options).then(handleHttpErrors);
}
 

  function addUser(user){
    const options = makeOptions("POST", false, user)
    return fetch(URL + "/api/User/add",options).then(handleHttpErrors);
}
  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    fetchPersonData,
    addUser,
    addActivity,
    fetchActivityData,
    editActivityData
  };
}
const facade = apiFacade();
export default facade;
