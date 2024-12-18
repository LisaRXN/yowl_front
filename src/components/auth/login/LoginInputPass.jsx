import { Link } from "react-router-dom";

export function LoginInputPass({password, setPassword, placeholder, login}) {
  return (
    <div className="flex flex-col w-full">
    <div className="relative flex items-center w-full py-1 ">
      <span className="absolute left-3.5">
        <img src="/img/icons/password.png" className="h-[18px] w-[14px] opacity-60" alt="" />
      </span>
      <input
      type="password"
      name="password"
      placeholder={placeholder}
      value={password}
      onChange={(e) => { setPassword(e.target.value);}}
      required
        className="font-normal pl-10 py-2 w-full rounded-xl text-slate-800 focus:outline-none focus:ring-violet-500 bg-slate-100"
      />
    </div>
    {login &&
    <Link to="/auth/sendmail" 
    className="self-end text-sm"
    >Forgot password?</Link>}



    </div>
    
  );
}
