import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../store/userSlice";
import { setLogin } from "../../store/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import { LoginInputMail } from "../../components/auth/login/LoginInputMail";
import { LoginInputPass } from "../../components/auth/login/LoginInputPass";
import { LoginButton } from "../../components/auth/login/LoginButton";
import { LoginTitle } from "../../components/auth/login/LoginTitle";

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
      
      <div className="relative w-1/2 max-w-[500px] m-auto">
      <img src="/img/cat2.png" className=" absolute h-[200px] top-[-100px] left-1/2 transform -translate-x-1/2"></img>

      <form
        onSubmit={handleSubmit}
        action="/submit-review"
        method="POST"
        className=" relative bg-gradient-to-t from-white via-[#f3e8ff] to-myviolet2 flex flex-col m-auto items-start justify-start p-10 rounded-lg gap-2 shadow-lg w-full"
      >

        <LoginTitle 
          title="Login to your Account"
          text="Welcome back! Select method to log in:" />
 
        <LoginInputMail email={email} setEmail={setEmail} />

        <LoginInputPass password={password} setPassword={setPassword} placeholder="Password" login="true" />

        <LoginButton />

        <div className="flex gap-2 items-center justify-center text-slate-800 w-full pt-10 "><span>Don{"'"}t have an account?</span><Link to="/auth/register" className="font-bold">Sign Up</Link></div>
        
      </form>

      </div>
    </div>
  );
}
