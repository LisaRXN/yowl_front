import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../store/loginSlice";

export function CallbackPage(){

    const dispatch = useDispatch()
    const navigate = useNavigate();

    axios
    .get('http://localhost:3000/api/passport/auth/google/profile')
    .then((response) => {
      if (response.data.results.length > 0) {
        console.log(response.data.results[0]);

        dispatch(setUser({
            name : response.data.results[0].name,
            email: response.data.results[0].email
        }))
        dispatch(setToken(response.data.results[0].token))
        dispatch(setLogin(true))
        navigate("/home")
      }
    })
    .catch((err) => console.log(err));

    return(
        <div>hello</div>
    )
}