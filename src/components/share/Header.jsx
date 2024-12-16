import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../store/loginSlice';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const login = useSelector((state)=> state.login.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(login)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = ()=> {
    dispatch(setLogin(false))
    navigate("/home")
  }


  return (
    <header className="bg-whitep-4 flex justify-between items-center bg-white pr-5">
      <div className="logo">
        <a href="/" className="text-8xl font-bold font-montUnderline text-mygreen ">YOWL</a>
      </div>

      {/* Menu principal */}
      <nav className={`flex gap-4 ${isMenuOpen ? 'block' : 'hidden'} md:flex font-jost text-slate-700 uppercase font-bold`}>
        <ul className="flex items-center space-x-6">
          <Link to="/writereview" className="hover:underlin">Write a review</Link>
          <Link to="/categories" className="hover:underline">Category</Link>
          {login ? 
            <li><a onClick={handleLogout} className="hover:bg-indigo-800 border-solid py-4 px-8 rounded-full bg-slate-700 text-white cursor-pointer">Logout</a></li>
          :
          <Link to="/auth/login" className="hover:bg-mygreen border-solid py-4 px-8 rounded-full bg-slate-600 text-white">Login</Link>
            }
        </ul>
      </nav>

      {/* Bouton burger */}
      <button className="md:hidden" onClick={toggleMenu}>
        ☰
      </button>

      {/* Menu mobile plein écran */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full h-full flex flex-col justify-center items-center text-grey">
            <button className="absolute top-4 right-4 text-2xl text-white" onClick={toggleMenu}>
              X
            </button>
            <ul className="space-y-6">
              <li><a href="/" className="text-xl hover:underline">Write a review</a></li>
              <li><a href="/contact" className="text-xl hover:underline">Category</a></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
