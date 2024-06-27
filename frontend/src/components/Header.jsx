import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStore, faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/authContext";
import { SearchBar } from "./SearchBar";
import LogIn from "./account/LogIn";
import Cart from "./shoppingCart/Cart";
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

function Header() {
const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const { user, userDetail, login } = useAuth();
  const [isLoginOverlayOpen, setLoginOverlayOpen] = useState(false);
  const [isCartOverlayOpen, setCartOverlayOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserEmail(currentUser.email);
        login(currentUser);
      } else {
        setUserEmail('');
      }
    });
    return () => unsubscribe();
  }, [auth, login]);

  const setLoginClose = () => {
    setLoginOverlayOpen(false);
  };

  const toggleLoginOverlay = () => {
    setLoginOverlayOpen(!isLoginOverlayOpen);
  };

  const setCartOpen = () => {
    setCartOverlayOpen(true);
  };

  const setCartClose = () => {
    setCartOverlayOpen(false);
  };

  const onSearch = (string) => {
    if (typeof string === "string") {
      navigate("/home/" + string);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };
  return (
    <div className="flex flex-col justify-cneter item-center mb-4">
      <div>
        <div className="my-10 flex justify-between">
          <div className="ml-20">
            <Link to="/">
              <h1 className="font-bold text-5xl">KIWITECH</h1>
            </Link>
          </div>

          <div className="space-x-4 flex">
          {userEmail ? (
              <div className="flex items-center">     
                <button
                  onClick={handleSignOut}
                  className="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                >
                <span className="text-green-400 font-bold">
                  Welcome, {userEmail.slice(0, 3)}!  
                </span>
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={toggleLoginOverlay}
                className="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
              >
                Account <FontAwesomeIcon icon={faUser} />
              </button>
            )}
            <Link to="/admin">
              <button class="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
                Admin
              </button>
            </Link>
            <button class="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
              About <FontAwesomeIcon icon={faStore} />
            </button>
          </div>

          <div className="mr-20 space-x-4">
            <button class="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-700 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
              Watchlist{" "}
              <Link to="/cart">
                <FontAwesomeIcon icon={faHeart} />
              </Link>
            </button>

            <button
              onClick={setCartOpen}
              class="px-3 py-3 bg-black text-white font-bold rounded-2xl transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faCartShopping} size="2x" />
              $0.00
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          {location.pathname !== "/admin" && <SearchBar onSearch={onSearch} />}
        </div>
      </div>
      {isLoginOverlayOpen && (
            <LogIn closeLogin={setLoginClose}/>
      )}
      {isCartOverlayOpen && <Cart closeCart={setCartClose} userDetail={user}/>}
    </div>
  );
}

export default Header;