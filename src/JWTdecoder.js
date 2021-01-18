import facade from "./apiFacade";

export default function token(){
 let token = facade.getToken;
return (parseJwt(token));
}

const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };