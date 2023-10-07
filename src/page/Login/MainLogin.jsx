import React from 'react'
import Login from './Login'
import Register from './Register'

function MainLogin() {


    return (
        <>
            <div style={{ fontWeight: '600', textAlign: 'center', fontSize: '35px', padding: '20px' }}>Chat App</div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', padding: '15px' }}>
                <Login />
                <Register />
            </div>
        </>
    )
}

export default MainLogin