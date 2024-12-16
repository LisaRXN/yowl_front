import * as jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../store/loginSlice';


export const checkTokenValidity = () => {

    const dispatch = useDispatch()
    const token = useSelector( (state) => state.token.value)
    const login = useSelector( (state) => state.login.value)

    if(!login){
        dispatch(setLogin(false))
        return;
    }

    if (!token) {
        dispatch(setLogin(false))
        return;
    }

    const { exp } = jwt_decode(token);
    const now = Date.now() / 1000;

    if (exp < now) {
        dispatch(setLogin(false))
    }

};