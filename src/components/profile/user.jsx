import { RegisterInput } from "../auth/register/RegisterInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../store/userSlice";
import { setLogin } from "../../store/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import { LoginInputMail } from "../auth/login/LoginInputMail";
import { LoginInputPass } from "../auth/login/LoginInputPass";
import { LoginButton } from "../auth/login/LoginButton";
import { LoginTitle } from "../auth/login/LoginTitle";
import { RegisterUpload } from "../auth/register/RegisterUpload";
import axios from "axios";

export function user(){

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [country, setCountry] = useState("");
    const [avatar, setAvatar] = useState("/img/users/avatar.png");
    const [preview, setPreview] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const server = useSelector((state)=>state.server.value)
  

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


    return(
    <div className="">

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


        <div className="flex gap-2 items-center justify-center text-slate-800 w-full pt-10 "><span>Don{"'"}t have an account?</span><Link to="/register" className="font-bold">Sign Up</Link></div>
        
      </form>
    </div>

    )





}