import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setGoogleUser, setToken, setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../store/loginSlice";
import { useEffect } from "react";

export function CallbackPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const server = useSelector((state)=>state.server.value)


  const findUser = (email, token) => {
    axios
      .put(`${server}/api/users/find`, {
        email,
      })
      .then((response) => {
        if (response.data.results.length > 0) {
          console.log("user login successfull");
          dispatch( setUser({id : response.data.results[0].id, email: email}));
          dispatch( setToken(token));
          dispatch( setGoogleUser(true))
          dispatch( setLogin(true));
          navigate("/home");
        } else {
          console.log("register first");
          navigate("/auth/register");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    axios
      .get(`${server}/api/passport/auth/google/profile`)
      .then((response) => {
        if (response.data.results.length > 0) {
          const email = response.data.results[0].email
          const token = response.data.results[0].token
          findUser(email, token);
        } else {
      console.log("Connection with Google failed");
        }
      })
      .catch((err) => console.log(err));
  }, []);


  return <div>hello</div>;
}
