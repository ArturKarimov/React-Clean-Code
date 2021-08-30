import React, {useContext} from 'react'
import {Link} from "react-router-dom"
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context/context";

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            <div className="navbar__links">
                <Link to="/about">About</Link>
                <Link to="/posts">Posts</Link>
                { isAuth && <MyButton
                    onClick={logout}
                    style={{
                        borderColor: 'rgba(255,32,0,0.7)',
                        color: 'rgba(255,32,0,0.7)',
                        background: '#fff'}}
                >
                    Log out
                </MyButton>}
            </div>
        </div>
    )
}

export default Navbar