import { Link } from "react-router-dom";

export function LoginTitle( {title, text, register}) {
  return (
    <div className="py-4">
      <h2 className="self-center font-bold text-2xl ">{title}</h2>
      <p className=" flex gap-2 font-light text-sm text-slate-500 py-2">
        {text}
        {register && <span><Link to="/auth/login" className="font-bold text-slate-800">Sign Up</Link></span>}
      </p>
      
    </div>
  );
}
