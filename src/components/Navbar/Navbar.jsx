import React, { useState } from 'react'
import logo from "../../assets/logo.png"
import "./Navbar.scss"
import { NavLink, useNavigate } from "react-router-dom"
import { FaHeart } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import Sidebar from "../Sidebar/Sidebar"
import { useFirebase } from "../../context/AuthContext"
import { FiShoppingCart } from "react-icons/fi";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const Navbar = () => {
    const [sidebar, showSideBar] = useState(false)
    const { userSignOut, bookCart } = useFirebase()
    const navigate = useNavigate()
    return (
        <>
            <nav>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                <div className="links">
                    <NavLink to={"/"}>Home</NavLink>
                    <a href={"#about"}>About</a>
                    <a href={"#books"}>Books</a>
                    <a href={"#arrivals"}>Arival</a>

                    <ProtectedRoute><NavLink to={"/orders"}>Orders</NavLink></ProtectedRoute>
                </div>
                <div className="icons">
                    <ProtectedRoute>
                        <button className='addbookbtn' onClick={() => navigate("/addbook")}>Add Book</button>
                    </ProtectedRoute>

                    <button onClick={() => userSignOut()}>Logout</button>
                    {/* <IoSearch /> */}
                    <FiShoppingCart className={bookCart.length > 0 ? "carthaveitems" : ""} onClick={() => {
                        navigate("/cart");
                        window.scrollTo(0, 0)
                    }} />
                    <FaBars className='baricon' onClick={() => showSideBar(true)} />
                </div>
            </nav>
            {
                sidebar && <Sidebar sidebar={sidebar} showSideBar={showSideBar} />
            }

        </>

    )
}

export default Navbar
