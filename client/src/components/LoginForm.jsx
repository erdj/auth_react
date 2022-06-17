import React, { useContext, useState } from 'react'
import { Context } from './../index';

function LoginForm({getUsers, ...props}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useContext(Context);
    return (
        <div className='loginForm-background'>
            <div className="loginForm">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text" 
                    placeholder='Email'
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password" 
                    placeholder='Password'
                />
                <button style={{'--slr': 'rgba(2, 80, 80, 0.4)'}} onClick={() => store.login(email, password)}><span>Логин</span><i></i></button>
                <button style={{'--slr': 'rgba(2, 80, 80, 0.4)'}} onClick={() => store.registration(email, password)}><span>Регистрация</span><i></i></button>
            </div>
        </div>  
    )
}

export default LoginForm