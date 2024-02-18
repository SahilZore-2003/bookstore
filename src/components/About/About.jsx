import React from 'react'
import "./About.scss"
import about from "../../assets/about.png"
const About = () => {
  return (
    <div className='about' id='about'>
      <div className="left">
        <img src={about} alt="" />
      </div>
      <div className="right">
        <h1>About Us</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti praesentium neque dolor, cum iusto molestias ut accusantium. Reiciendis, quisquam blanditiis laudantium debitis voluptatibus ex repellat doloribus rem ducimus at? Pariatur.</p>
        <button>Learn More</button>
      </div>
    </div>
  )
}

export default About
