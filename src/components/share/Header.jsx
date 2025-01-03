import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../store/loginSlice";
import { setToken, setUser } from "../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { HeaderMobile } from "./HeaderMobile";
import axios from "axios";

export function Header() {
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const login = useSelector((state) => state.login.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state)=>state.user.value?.email)
  const server = useSelector((state)=>state.server.value)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const handleLogout = () => {
    axios
    .delete(`${server}/api/passport/auth/google/${email}`)
    .then(() => {
       console.log("user logout successfull");
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(setLogin(false));
        navigate("/home");    
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <header className="bg-white p-4 flex justify-between items-center bg-white pr-5">
      <div className="logo">
        <a href="/"className="text-6xl md:text-8xl font-bold font-montUnderline text-mygreen " > YOWL</a> </div>

      {/* Menu principal */}
      <nav className={`flex gap-4 hidden md:flex font-jost text-slate-700 uppercase font-bold`}>
        <ul className="flex items-center gap-4 lg:gap-6">
          <Link to="/writereview" className="hover:underlin">Write a review </Link>
          <Link to="/categories" className="hover:underline">Category</Link>
          {login && ( <Link to="/profile" className="hover:underline">Profile</Link>
          )}

          {login ? (
            <li>
              <a onClick={handleLogout} className="hover:bg-mygreen border-solid py-4 px-8 rounded-full bg-slate-700 text-white cursor-pointer">
                Logout
              </a>
            </li>
          ) : (
            <Link to="/auth/login" className="hover:bg-mygreen border-solid py-4 px-8 rounded-full bg-slate-600 text-white"
            >
              Login
            </Link>
          )}
        </ul>
      </nav>

      {/* Bouton burger */}
      <button className="md:hidden text-5xl text-slate-600" onClick={toggleMenu} > ☰ </button>

      {/* Menu mobile plein écran */}
      {isMenuOpen && (
        <HeaderMobile toggleMenu={toggleMenu} login={login} handleLogout={handleLogout}/>
      )}
    </header>
  );
}

export default Header;
