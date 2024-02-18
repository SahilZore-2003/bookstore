import React from 'react'
import "./Banner.scss"
import banner from "../../assets/banner.jpg"
const Banner = () => {
  return (
    <div className='banner'>
        <img src={banner} alt="" />
    </div>
  )
}

export default Banner
