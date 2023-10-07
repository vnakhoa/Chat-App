import React from 'react'
import AvatarHeader from '../Avatar/AvatarHeader'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import AvatarWord from '../Avatar/AvatarWord'
import { LogoutOutlined } from '@ant-design/icons'
import { UserContext } from '../../App'
import { useContext } from 'react'

function SidebarHeader() {
    //Firebase
    const [user] = useAuthState(auth)
    // console.log(user)

    //useContext
    const { chooseFriend, setChooseFriend } = useContext(UserContext);
    console.log(chooseFriend)

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                {
                    user && (user?.photoURL
                        ? <AvatarHeader imageUser={user.photoURL} />
                        : <AvatarWord wordImage={user.email.charAt(0).toUpperCase()} />
                    )
                }
                {
                    user && user?.email && (
                        <span
                            style={{ color: 'black', fontWeight: '500' }}
                        >
                            {user.email}
                        </span>

                    )
                }
            </div>
            <button
                className='logout_btn'
                onClick={() => {
                    signOut(auth);
                    setChooseFriend()
                }}
            >
                LogOut  <LogoutOutlined />
            </button>
        </div >
    )
}

export default SidebarHeader