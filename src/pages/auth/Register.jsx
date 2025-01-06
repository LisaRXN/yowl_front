import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../store/userSlice";
import { setLogin } from "../../store/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import { LoginInputMail } from "../../components/auth/login/LoginInputMail";
import { LoginInputPass } from "../../components/auth/login/LoginInputPass";
import { LoginButton } from "../../components/auth/login/LoginButton";
import { LoginTitle } from "../../components/auth/login/LoginTitle";
import { RegisterInput } from "../../components/auth/register/RegisterInput";
import { RegisterUpload } from "../../components/auth/register/RegisterUpload";
import axios from "axios";

export function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("/img/users/avatar.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const server = useSelector((state)=>state.server.value)

console.log(firstname, lastname, country, email, password)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${server}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname:firstname,
          lastname:lastname,
          country:country,
          avatar:avatar,
          email: email,
          password: password,
          role:0
        }),
      });


      if (response) {
        console.log("Register successfull!");
        navigate("/auth/login");
      } else {
        setPassword("");
        console.log("Failed to register.");
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };



  return (
    
    <div className="flex relative items-center min-h-screen py-40 bg-gradient-to-t from-white via-[#f2eafb] to-myviolet2">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/img/nuage2.jpg')" }}></div>
      
      <div className="relative w-1/2 max-w-[500px] m-auto ">
      <img src="/img/cat2.png" className=" absolute h-[200px] top-[-100px] left-1/2 transform -translate-x-1/2"></img>

      <form
        onSubmit={handleSubmit}
        action="/submit-review"
        method="POST"
        className=" relative bg-gradient-to-t from-white via-[#f3e8ff] to-myviolet2 flex flex-col m-auto items-start justify-start p-10 rounded-lg gap-2 shadow-lg w-full"
      >

        <LoginTitle 
          title="Create an Account"
          text="Already have an account?"
          register={true}/>

        <RegisterInput input={firstname} setInput={setFirstname} name="Firstname"/> 
        
        <RegisterInput input={lastname} setInput={setLastname} name="Lastname"/> 

        <RegisterInput input={country} setInput={setCountry} name="Country"/> 

        <RegisterUpload avatar={avatar} setAvatar={setAvatar} preview={preview} setPreview={setPreview}/> 

        <LoginInputMail email={email} setEmail={setEmail} />

        <LoginInputPass password={password} setPassword={setPassword} />

        <button
        type="submit"
        className="text-white  mt-5 bg-slate-800 w-full rounded-xl px-4 py-2 hover:bg-indigo-800 "
      >
        Get Started
      </button>

        {/* <LoginButton googleAuth={googleAuth} /> */}

        <div className="flex gap-2 items-center justify-center text-slate-800 w-full pt-10 "><span>Already have an account?</span><Link to="/auth/login" className="font-bold">Sign In</Link></div>
        
      </form>

      </div>
    </div>
  );
}
