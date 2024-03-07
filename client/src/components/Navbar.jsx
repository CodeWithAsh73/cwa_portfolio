import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    function handleLogout(){
        localStorage.removeItem('token')
        window.location.reload()
    }
    return (
        <header className="header">
            <nav className="nav">
                <Link to="/" className="nav_logo">CodeWithASh</Link>
                <ul className="nav_items">
                    <li className="nav_item">
                        <Link to='/' className="nav_link">Home</Link>
                        <Link to='/about' className="nav_link">About</Link>
                        <Link to='/projects' className="nav_link">Projects</Link>
                        <Link to='/contact' className="nav_link">Contact</Link>
                    </li>
                </ul>
                {!localStorage.getItem('token') && <Link to={'/login'} className="button" id="form-open">Login</Link>}
                {localStorage.getItem('token') && <Link to={'/login'} className="button" id="form-open" onClick={handleLogout}>Logout</Link>}
            </nav>
        </header>
    )
}

export default Navbar