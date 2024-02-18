import React from 'react'
import "./Sidebar.scss"
import { Link, useNavigate } from 'react-router-dom'
const Sidebar = ({ sidebar, showSideBar }) => {

    const navigate = useNavigate()

    const handleSideBar = () => {
        showSideBar(false)
    }
    return (
        <aside onClick={handleSideBar}>
            <div className={sidebar ? "sidelinks show" : "sidelinks"} onClick={(e) => e.stopPropagation()}>
                <Link to="/" onClick={() => showSideBar(false)}>Home</Link>
                <a href="#books" onClick={() => showSideBar(false)}>Books</a>
                <a href="#arrivals" onClick={() => showSideBar(false)}>Arrivals</a>
                <a href="#about" onClick={() => showSideBar(false)}>About</a>
                <button onClick={() => {
                    navigate("/addbook");
                    showSideBar(false)
                    window.scrollTo(0, 0)
                }}>Add Book</button>
            </div>
        </aside>
    )
}

export default Sidebar
