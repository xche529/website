import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import meme from '../images/logo.png';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../css/header.css';
import { useAuth } from '../context/authContext';
import { SearchBar } from './search-bar';


function Header() {
  const navigate = useNavigate();

  const { user, userDetail } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Use state to track dropdown open state

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // Toggle dropdown state
  };


  const onSearch = (string) => {
    if(typeof string === 'string'){
      navigate('/home/' + string)
    }
  }


  return (
    <nav className="nav-bar">
      <div className="logo-icon">
        <Link to="/" className='link'>        
        <img className="logo" src={meme} alt="" />
        </Link>
      </div>
      <ul className={`menu ${isDropdownOpen ? 'open' : ''}`} onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
        <li className='cat_text'>
          Categories
          <span className={`material-symbols-outlined expand_more ${isDropdownOpen ? 'rotate-180' : ''}`}>
            expand_more
          </span>
          <ul>
            <li><Link to="/home/Tablet" className='link-to-normal'>Tablet</Link></li>
            <li><Link to="/home/phone" className='link-to-normal'>Phone</Link></li>
            <li><Link to="/home/laptop" className='link-to-normal'>Laptop</Link></li>
            <li><Link to="/home/accessories" className='link-to-normal'>Accessories</Link></li>
          </ul>
        </li>
      </ul>
    <SearchBar onSearch={onSearch}/>
    <div>
       {user ? (<Link to="/profile" className='link-to-normal'>
        {userDetail ? (userDetail.avatar ? (
          <img src={userDetail.avatar} alt="Avatar" className="avatar" />
        ) : (user.email)) : (user.email)}
      </Link>) : (<Link to="/login" className='link-to-normal'>
        SignIn
      </Link>
      )}</div>

      <div className="icon">
        <Link to="/items">
          <span className="material-symbols-outlined account">account_circle</span>
        </Link>
        <span className="material-symbols-outlined watchlist">favorite</span>
        <Link to="/cart">
          <span className="material-symbols-outlined cart">shopping_cart</span>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
