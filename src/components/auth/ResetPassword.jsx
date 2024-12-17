import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LoginTitle } from "./login/LoginTitle";
import { LoginInputPass } from "./login/LoginInputPass";
import { LoginInputMail } from "./login/LoginInputMail";
import { LoginButton } from "./login/LoginButton";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const verifyToken = () => {
    axios
      .post(`http://localhost:3000/api/auth/verifytoken`, {
        token: token,
      })
      .then((response) => {
        console.log(response.data.results.email);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    verifyToken();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/auth/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          confirmPassword
        }),
      });

      if (response.ok) {
        navigate("/auth/login");
      } else {
        setPassword("");
        console.log("Failed to login.");
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    !login && (
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
          title="Reset Your Password"
          text="" />
 
        <LoginInputPass password={password} setPassword={setPassword} placeholder="New password" />

        <LoginInputPass password={confirmPassword} setPassword={setConfirmPassword} placeholder="Confirm your password"/>

        <div className="flex flex-col w-full items-center gap-3">
      
      <button
        className="text-white  mt-5 bg-slate-800 w-full rounded-xl px-4 py-2 hover:bg-indigo-800 "
        type="submit"
      >
        Send
      </button>
    </div>
        
      </form>

      </div>
    </div>
    )
  );
}
