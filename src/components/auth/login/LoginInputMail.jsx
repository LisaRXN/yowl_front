export function LoginInputMail({email, setEmail}) {
  return (
    <div className="relative flex items-center w-full py-1">
      <span className="absolute left-3">
        <img src="/img/icons/mail.png" className="h-[23px] w-[20px] opacity-60" alt="" />
      </span>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {setEmail(e.target.value);}}
        required
        className="font-normal pl-10 py-2 w-full rounded-xl text-slate-800 focus:outline-none focus:ring-violet-500 bg-slate-100"
      />
    </div>
  );
}
