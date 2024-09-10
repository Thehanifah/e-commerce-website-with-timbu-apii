import React, { useRef, useState, useEffect } from 'react';
import logo from '../../images/logo.png';
import './Navbar.css';
import { GoSearch } from "react-icons/go";
import { CiShoppingCart } from "react-icons/ci";
import { PiHandbagSimpleThin } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/Cartcontext';
import { useContext } from 'react';


const Navbar = ({ products, onSearch, onSearchStateChange }) => {
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false); 
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchStateChange(value.trim() !== "");
  };

  const handleClearSearch = () => {
    setSearchInput("");
    
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchInput.trim().toLowerCase())
      );
      onSearch(filteredProducts);
      // setSearchInput("");
      navigate('/');  
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`navbar ${isOpen ? 'active' : ''}`} ref={navRef}>
      <a className="navbar-brand" href="/">
        <img src={logo} alt="Logo" width="auto" height="40" className="d-inline-block align-text-center" />
        <span className="d-inline-block align-text-top">RareWrld</span>
      </a>

      <div className={`search ${isSearchOpen ? 'active' : ''}`}>
        <GoSearch id="Search-icon" className={`searchIcon${isSearchOpen ? 'active' : ''}`} onClick={handleSearch} />
        <input
          id="searchInput"
          type="text"
          placeholder="Search"
          className={`searchInput${isSearchOpen ? 'active' : ''}`}
          value={searchInput}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
        />
        <IoCloseOutline
          id="close-icon"
          className={`close-Icon${isSearchOpen ? 'active' : ''}`}
          onClick={handleClearSearch}
        />
      </div>

      <ul className={`navbar-ul ${isOpen ? 'show' : ''}`}>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/Cart"><CiShoppingCart className="nav-item-icon" /><span>Cart</span></a>
          <span className='cart-number'>{cartItemCount}</span>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/shop"><PiHandbagSimpleThin className="nav-item-icon" /> <span>Shop</span></Link>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/"><CiUser className="nav-item-icon" /><span>Profile</span></a>
        </li>
      </ul>

      <button className='navbar-toggler-3'>
        <GoSearch id="search-icon-1" className='searchIcon-1' onClick={toggleSearch} />
      </button>
      <button onClick={toggleNavbar} className="navbar-toggler-1">
        <IoIosMenu className="toggle-open" />
      </button>
      <button onClick={toggleNavbar} className="navbar-toggler-2">
        <IoCloseOutline className="toggle-close" />
      </button>
    </div>
  );
};

export default Navbar;
