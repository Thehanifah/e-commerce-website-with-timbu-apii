import './Footer.css'
import Logo from '../../images/logo.png'
import { PiCopyrightLight } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa6";
import { RiTiktokFill } from "react-icons/ri";

import React from 'react'

function Footer() {
  return (
    <>
      <div className="container-fluid brown"></div> 


      <div class="footer-cont">
     <div class="footerbrand"> 
     <a className="navbar-brand" href="/">
        <img src={Logo} alt="Logo" width="auto" height="40" className="d-inline-block align-text-center" />
        <span className="d-inline-block align-text-top ">RareWrld</span>
      </a>
     </div>
     
    <div class="ul-container"> 
  
    <div><a href="/"  >Terms and Conditions</a></div> 
   
    <div><a href="/" >Privacy</a></div>
  
     <div><a href="/" >Cookies</a></div>
  
     <div><a href="/" >Refund</a></div>
  
    <div><a href="/" >License</a></div>
    </div>
    </div>

  
  
  
  
  <hr className='hro' />


  <div class="copyright">
    <div class="copyright-word"><PiCopyrightLight className='copyright-logo'/> Copyright 2024  RareWrld</div>

    <div class=" ul-container1"> 
 
  <a href="https://www.instagram.com/" ><IoLogoInstagram className='media' /></a>
 
  <a href="https://twitter.com/home" ><FaXTwitter className='media' /></a>
 
  <a href="https://web.whatsapp.com/" ><FaWhatsapp className='media' /></a>
 
 
  <a href="https://www.tiktok.com/" ><RiTiktokFill className='media'/></a>

 </div>
  </div>
      
    </>
  )
}

export default Footer;