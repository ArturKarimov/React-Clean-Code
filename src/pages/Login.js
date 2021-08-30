import React, {useContext} from 'react'
import MyInput from "../components/UI/input/MyInput"
import MyButton from "../components/UI/button/MyButton"
import {AuthContext} from "../context/context";

const Login = () => {

    const {setIsAuth} = useContext(AuthContext)

    const login = (event) => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{marginBottom: '10px'}}>Login page</h1>
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '350px'}}
            onSubmit={login}
            >
                <MyInput type='text' placeholder='Login'/>
                <MyInput type='password' placeholder='Password'/>
                <MyButton style={{width: '350px', marginTop: '10px'}}>Sign in</MyButton>
            </form>
        </div>
    )
}

export default Login