import React from 'react';
import { Link } from 'react-router-dom';
import meme from '../images/meme.jpg';
import '../css/header.css';

function Header() {
	return (
		<nav className="nav-bar">
			<div className="logo_icon">
				<img className="logo" src={meme} alt="" />
				<a>CSZ Tech</a>
			</div>
			<text className="category">Categories</text>
			<div className="search_pkg">
				<input className="search_input" type="text" placeholder="Search products, brands , and more..." />
				<button className="search_button" type="submit">
					Search
				</button>
			</div>
			<ul className="nav_links">
				<li>About</li>
				<li>Contact</li>
			</ul>

			<div className="icon">
				<span className="material-symbols-outlined account">account_circle</span>
				<span className="material-symbols-outlined watchlist">favorite</span>
				<Link to="/cart">
					<span className="material-symbols-outlined cart">shopping_cart</span>
				</Link>
			</div>
		</nav>
	);
}

export default Header;
    
