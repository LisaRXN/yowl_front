import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../store/userSlice";
import { setLogin } from "../store/loginSlice";
import { useNavigate } from "react-router-dom";
import { LoginInputMail } from "../components/login/LoginInputMail";
import { LoginInputPass } from "../components/login/LoginInputPass";
import { LoginButton } from "../components/login/LoginButton";
import { LoginTitle } from "../components/login/LoginTitle";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        console.log("Login successfull!");
        const data = await response.json();
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
        dispatch(setLogin(true));
        navigate("/home");
      } else {
        setPassword("");
        console.log("Failed to login.");
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    
    <div className="flex relative items-center min-h-screen py-40 bg-gradient-to-t from-white via-[#f2eafb] to-myviolet2">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/img/nuage2.jpg')" }}></div>
      
      <div className="relative w-1/2 max-w-[500px] m-auto bg-blue-200">
      <img src="/img/cat2.png" className=" absolute h-[200px] top-[-100px] left-1/2 transform -translate-x-1/2"></img>

      <form
        onSubmit={handleSubmit}
        action="/submit-review"
        method="POST"
        className=" relative bg-gradient-to-t from-white via-[#f3e8ff] to-myviolet2 flex flex-col m-auto items-start justify-start p-10 rounded-lg gap-2 shadow-lg w-full"
      >

        <LoginTitle/>
 
        <LoginInputMail email={email} setEmail={setEmail} />

        <LoginInputPass password={password} setPassword={setPassword} />

        <LoginButton />
      </form>

      </div>
    </div>
  );
}
