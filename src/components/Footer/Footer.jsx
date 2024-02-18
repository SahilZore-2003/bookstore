import React from 'react'
import logo from "../../assets/logo.png"
import "./Footer.scss"
import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
    return (
        <footer>
            <div className='logo'>
                <img src={logo} alt="" />
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit ut accusamus blanditiis a cum distinctio quisquam deserunt in quia quam?</p>
            </div>
            <div className='links'>
                <h3>Quick Links</h3>
                <div>
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#features">Features</a>
                    <a href="#arivals">Arivals</a>
                </div>
            </div>
            <div className='contact'>
                <h3>Contact Info</h3>
                <div>
                    <div><IoCallSharp /> <span>9356089857</span></div>
                    <div><IoCallSharp /> <span>7020224131</span></div>
                    <div><MdEmail /> <span>zoresahil80@gmail.com</span></div>
                </div>
            </div>
            <div className='socials'>
                <h3>Follow Us</h3>
                <div className="icons">
                    <FaGithub />
                    <FaLinkedinIn />
                    <FaXTwitter />
                </div>
            </div>
            <div className='newsletter'>
                <h3>NewsLetter</h3>
                <div>
                    <input type="email" placeholder='Enter email' />
                </div>
                <button>Subscribe</button>
            </div>
        </footer>
    )
}

export default Footer
