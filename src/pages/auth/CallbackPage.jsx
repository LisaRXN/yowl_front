import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../store/loginSlice";
import { useEffect } from "react";

export function CallbackPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const findUser = (email, token) => {
    console.log("EMAIL", email)
    axios
      .put(`http://localhost:3000/api/users/find`, {
        email,
      })
      .then((response) => {
        console.log("RESPONSE", response)
        if (response.data.results.length > 0) {
          console.log(response.data.results[0]);
          console.log("user login successfull");
          dispatch( setUser({id : response.data.results[0].id}));
          dispatch( setToken(token));
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

  // axios
  // .get('http://localhost:3000/api/passport/auth/google/profile')
  // .then((response) => {
  //   if (response.data.results.length > 0) {
  //     console.log(response.data.results[0]);
  //     dispatch(setUser({
  //         name : response.data.results[0].name,
  //         email: response.data.results[0].email
  //     }))
  //     dispatch(setToken(response.data.results[0].token))
  //     dispatch(setLogin(true))
  //     navigate("/home")
  //   }
  // })
  // .catch((err) => console.log(err));

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/passport/auth/google/profile")
      .then((response) => {
        if (response.data.results.length > 0) {
          console.log("YES");
          const email = response.data.results[0].email
          const token = response.data.results[0].token
          findUser(email, token);
        } else {
          console.log("No user");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // axios
  //   .get("http://localhost:3000/api/passport/auth/google/profile")
  //   .then((response) => {
  //     console.log("RESPONSE", response)

  //     if (response.data.success) {
  //       const user = response.data.user;
  //       console.log("USER", user)
  //       dispatch(
  //         setUser({
  //           name: user.displayName,
  //           email: user.email,
  //         })
  //       );
  //       dispatch(setToken(user.token));
  //       dispatch(setLogin(true));
  //       navigate("/home");
  //     } else{
  //       navigate("/auth/register");
  //     }
  //   })
  //   .catch((err) => console.error(err));

  return <div>hello</div>;
}
