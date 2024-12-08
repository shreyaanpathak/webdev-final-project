export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 px-6 md:px-10 h-20 shadow-sm">
      <div className="flex-1">
      <a href="/" className="btn btn-ghost text-2xl font-bold hover:text-green-500 transition-colors duration-300 flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4m12 4l-4-4m4 4l-4-4"/>
  </svg>
  <div className="[&>*]:inline-block">
    <span className="text-green-600">Fin</span><span className="text-yellow-500">Hub</span>
  </div>
</a>
      </div>

      <div className="flex items-center gap-6">
        <ul className="menu menu-horizontal gap-4">
          <li>
            <a
              href="/dashboard"
              className="text-lg font-bold px-6 py-3 transition-all duration-300 
              text-green-600 hover:text-yellow-500
              relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
              after:w-0 hover:after:w-full after:bg-yellow-400 
              after:transition-all after:duration-300
              flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
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
            </a>
          </li>
          <li>
            <a
              href="/stocks"
              className="text-lg font-bold px-6 py-3 transition-all duration-300 
              text-green-600 hover:text-yellow-500
              relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
              after:w-0 hover:after:w-full after:bg-yellow-400 
              after:transition-all after:duration-300
              flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
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
              Stocks
            </a>
          </li>
        </ul>

        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            aria-label="Open user menu"
            aria-haspopup="true"
            className="btn btn-ghost btn-circle avatar 
              hover:ring hover:ring-green-400 hover:ring-offset-2 
              transition-all duration-300 transform hover:scale-105"
          >
            <div className="w-12 rounded-full ring-2 ring-yellow-400">
              <img
                alt="User profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu shadow-xl bg-base-100 rounded-box w-23
    absolute right-0 -mr-6 md:-mr-10 mt-3 overflow-hidden" // Negative margin matching your nav padding
          >
            <li className="w-full">
              <a
                href="/profile"
                className="flex justify-center items-center gap-2 p-3 text-lg font-bold text-green-600 hover:text-yellow-500 hover:bg-base-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
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
              </a>
            </li>
            <li className="w-full">
              <a
                href="/logout"
                className="flex justify-center items-center gap-2 p-3 text-lg font-bold text-error hover:text-red-400 hover:bg-base-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
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
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
