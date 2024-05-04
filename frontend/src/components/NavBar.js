import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

export default function NavBar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const userMenuRef = useRef(null);
  const navMenuRef = useRef(null);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }

      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        setIsNavMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  function PageNavigation() {
    const navLinkClasses =
      "block px-3 py-2 text-white bg-transparent rounded md:p-0 hover:text-blue-400";
    return (
      <ul className="flex flex-col p-4 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-dark-1 md:p-0 ">
        <li>
          <Link to="/" className={`${navLinkClasses}`}>
            Practise
          </Link>
        </li>
        <li>
          <Link to="/challange" className={`${navLinkClasses}`}>
            Challange
          </Link>
        </li>
        <li>
          <Link to="/rooms" className={`${navLinkClasses}`}>
            Rooms
          </Link>
        </li>
      </ul>
    );
  }

  function CollapsedPageNavigationDropdown() {
    return (
      <div
        ref={navMenuRef}
        className="absolute z-10 my-0 text-base bg-white divide-y divide-gray-100 rounded-lg shadow right-1 dark:bg-gray-700 dark:divide-gray-600"
        style={{ top: `calc(100% + 0.25rem)` }}
        id="nav-dropdown"
      >
        <ul className="py-2" aria-labelledby="nav-menu-button">
          <li>
            <Link
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Practise
            </Link>
          </li>
          <li>
            <Link
              to="/challange"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Challange
            </Link>
          </li>
          <li>
            <Link
              to="/rooms"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Friends
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  function UserMenu() {
    return (
      <>
        {user ? (
          <button
            type="button"
            className="flex rounded-full text-md md:me-0 focus:ring-4 focus:ring-blue-400 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            onClick={() => setIsUserMenuOpen((prevValue) => !prevValue)}
          >
            <svg
              className={`w-8 h-8 ${
                isUserMenuOpen ? "text-gold" : "text-white"
              } hover:text-gold`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="4"></circle>
              <path d="M5.41 17.59a10 10 0 0 1 13.18 0"></path>
            </svg>
          </button>
        ) : (
          <Link
            to="/accounts/login"
            className="p-1 text-sm text-white rounded-full bg-dark-2 md:me-0 ring-1 hover:ring-2 hover:ring-gray-300 dark:focus:ring-gray-600"
          >
            Sign in
          </Link>
        )}

        {isUserMenuOpen && (
          <div
            ref={userMenuRef}
            className="absolute z-50 my-0 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow right-1 dark:bg-gray-700 dark:divide-gray-600"
            style={{ top: `calc(100% + 0.25rem)` }}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-dark-2 dark:text-white">
                {user.username}
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                {user.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Friends
                </Link>
              </li>
              <li>
                <div
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={handleSignOut}
                >
                  Sign out
                </div>
              </li>
            </ul>
          </div>
        )}
      </>
    );
  }

  return (
    <nav className="font-mono bg-dark-1 h-[60px]">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={logo}
            className="h-[69px] z-10 px-4"
            alt="Code Royale Logo"
          />
        </Link>
        <div
          className="items-center justify-between hidden w-full p-4 md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <PageNavigation />
        </div>
        <div className="relative flex items-center p-4 space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <UserMenu />

          <button
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => {
              setIsNavMenuOpen((prevValue) => !prevValue);
            }}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {isNavMenuOpen && <CollapsedPageNavigationDropdown />}
        </div>
      </div>
    </nav>
  );
}
