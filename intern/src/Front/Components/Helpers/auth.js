//import {setLocalStorage, getLocalStorage} from './localStorage';

export const setAuthenticated= (token, user) => {
    window.localStorage.setItem("token",token);
    window.localStorage.setItem("user", JSON.stringify(user));

}

export const isAuth = () => {
    if (window.localStorage.getItem("token") && JSON.parse((window.localStorage.getItem(('user'))))) {
        return JSON.parse(window.localStorage.getItem(('user')));
    }else{
        return false;
    }
}
