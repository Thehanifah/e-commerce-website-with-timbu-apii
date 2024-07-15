import React from 'react'
import './Hero.css'
import heroImage from '../images/hero.png'

function Hero() {
  return (
    <>
      <div className=" hero-container  flex-xl-column-reverse  justify-content-start" style={{ backgroundImage: `url(${heroImage})` }}>
      <h1 className='explore display-2'>Explore</h1>
      <h1 className='rarewrld display-1 '>RAREWRLD</h1>
       

      
     </div>
    </>
  )
}

export default Hero
