import { Link } from "react-router-dom";

export function HeaderMobile({toggleMenu, login, handleLogout}){

    return(
      <div className="fixed inset-0 bg-slate-100 flex justify-center items-center z-50">
          <button
            className="absolute top-4 right-4 text-2xl "
            onClick={toggleMenu}
          >
            X
          </button>
          <ul className="flex flex-col gap-20 text-3xl font-montserrat font-bold">
            <Link to="/writereview" className="hover:underlin" onClick={toggleMenu}>Write a review</Link>
            <Link to="/categories" className="hover:underline" onClick={toggleMenu}>Category</Link>
            {login && (
              <Link to="/profile" className="hover:underline" onClick={toggleMenu}>Profile</Link>
            )}
            {login ? (
              <li>
                <a
                  onClick={handleLogout}
                  className="hover:bg-mygreen border-solid py-6 px-10 rounded-full bg-slate-700 text-white cursor-pointer mt-10"
                >
                  Logout
                </a>
              </li>
            ) : (
              <Link
                to="/auth/login"
                className="hover:bg-mygreen border-solid py-6 px-10 rounded-full bg-slate-600 text-white"
              >
                Login
              </Link>
            )}
          </ul>
        </div>
    )


}