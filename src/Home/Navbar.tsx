import { Link } from "react-router-dom";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from '../Account/reducer';
import * as client from '../Account/client';

export default function Navbar() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
  };

  return (
    <nav
      className="navbar sticky top-0 z-50 bg-black/60 backdrop-blur-sm 
                 px-6 md:px-10 h-20 shadow-sm transition-colors duration-300"
    >
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-bold hover:text-green-400 
                     transition-colors duration-300 flex items-center gap-2"
        >
          <RiMoneyDollarCircleFill />
          <div className="[&>*]:inline-block">
            <span className="text-green-500">Fin</span>
            <span className="text-yellow-400">Hub</span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <ul className="menu menu-horizontal gap-4">
          {currentUser && (
            <li>
              <Link
                to="/Dashboard"
                className="text-lg font-bold px-6 py-3 transition-all duration-300 
                           text-green-400 hover:text-yellow-400
                           relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                           after:w-0 hover:after:w-full after:bg-yellow-400 
                           after:transition-all after:duration-300
                           flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
                Dashboard
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/Stocks"
              className="text-lg font-bold px-6 py-3 transition-all duration-300 
                         text-green-400 hover:text-yellow-400
                         relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                         after:w-0 hover:after:w-full after:bg-yellow-400 
                         after:transition-all after:duration-300
                         flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              {currentUser ? "Stocks" : "Preview Stocks"}
            </Link>
          </li>
        </ul>

        {currentUser ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar 
                         hover:ring hover:ring-green-400 hover:ring-offset-2 
                         transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-12 rounded-full ring-2 ring-yellow-400 overflow-hidden">
                <img
                  alt="User profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-black/80 
                         backdrop-blur-md rounded-box w-52 border border-green-500/20"
            >
              <li>
                <Link
                  to="/Account/Profile"
                  className="flex justify-start items-center gap-2 p-3 text-lg font-bold text-green-400 hover:text-yellow-400 hover:bg-black/50 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex justify-start items-center gap-2 p-3 text-lg font-bold text-red-500 hover:text-red-400 hover:bg-black/50 w-full transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/Account/Signin"
            className="btn bg-green-600 hover:bg-green-700 border-0 text-white font-bold"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
