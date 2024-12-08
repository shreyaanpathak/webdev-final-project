export default function Navbar() {
  return (
    <div className="navbar bg-base-100 px-6 md:px-10 h-20 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl font-bold hover:text-green-500 transition-colors duration-300">
          <span className="text-green-600">Fin</span>
          <span className="text-yellow-500">Hub</span>
        </a>
      </div>

      <div className="flex items-center gap-6">
        <ul className="menu menu-horizontal gap-4">
          <li>
            <a className="text-lg font-bold px-6 py-3 transition-all duration-300 
              text-green-600 hover:text-yellow-500
              relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
              after:w-0 hover:after:w-full after:bg-yellow-400 
              after:transition-all after:duration-300">
              Dashboard
            </a>
          </li>
          <li>
            <a className="text-lg font-bold px-6 py-3 transition-all duration-300 
              text-green-600 hover:text-yellow-500
              relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
              after:w-0 hover:after:w-full after:bg-yellow-400 
              after:transition-all after:duration-300">
              Stocks
            </a>
          </li>
        </ul>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar 
              hover:ring hover:ring-green-400 hover:ring-offset-2 
              transition-all duration-300 transform hover:scale-105">
            <div className="w-12 rounded-full ring-2 ring-yellow-400">
              <img
                alt="Profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 z-[1] mt-3 w-48 p-2 
              shadow-lg transform -translate-x-1/2 left-1/2 
              animate-slideDown origin-top">
            <li>
              <a className="p-3 text-base transition-colors duration-200 text-green-600 
                hover:text-yellow-500">
                Profile
              </a>
            </li>
            <li>
              <a className="p-3 text-base transition-colors duration-200 text-error 
                hover:text-red-700">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
