import React from 'react'
import "./Header.scss"
import table from "../../assets/table.png"
const Header = () => {
  return (
    <header>
      <div className="left">
         <h1>Welcome to <br /> <span>BOOK STORE</span></h1>
         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nobis laudantium ipsum cum fugit magnam quidem illum labore necessitatibus minima velit exercitationem atque delectus dolore, officia distinctio veritatis, veniam possimus.</p>
         <button>Buy Now</button>
      </div>
      <div className="right">
        <img src={table} alt="" />
      </div>
    </header>
  )
}

export default Header
