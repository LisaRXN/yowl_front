export function LoginButton({googleAuth}) {
  return (
    <div className="flex flex-col w-full items-center gap-3">
      <button
        className="text-white  mt-5 bg-slate-800 w-full rounded-xl px-4 py-2 hover:bg-indigo-800 "
        type="submit"
      >
        Get Started
      </button>
      <span className="text-[12px] text-slate-500">Or sign in with</span>

      <div onClick={googleAuth} className="flex flex-col items-center rounded-xl w-full border-slate-100 p-2  shadow-sm bg-white">
        <img src="/img/icons/google.png" className="h-[20px] "></img>
      </div>
    </div>
  );
}
