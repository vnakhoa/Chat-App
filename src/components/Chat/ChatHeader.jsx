import React, { useContext } from 'react'
import AvatarHeader from '../Avatar/AvatarHeader'
import ListMember from '../ListMember/ListMember'
import { UserContext } from '../../App'
import AvatarWord from '../Avatar/AvatarWord'

function ChatHeader() {

    //useContext
    const { chooseFriend, setChooseFriend } = useContext(UserContext)
    console.log(chooseFriend)

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginLeft: '15px', height: '10vh', position: 'relative' }}>
            {chooseFriend ? (
                <div style={{ display: 'flex', gap: '3px', alignItems: 'start' }}>
                    {
                        chooseFriend.photoURL
                            ? <AvatarHeader imageUser={chooseFriend.photoURL} />
                            : <AvatarWord wordImage={chooseFriend?.name.charAt(0).toUpperCase()} />
                    }
                    <span
                        style={{ display: 'flex', alignItems: 'center', color: 'black', fontWeight: '500', paddingTop: '5px' }}
                    >
                        {chooseFriend.name}
                    </span>

                </div>
            )
                : <span
                    style={{ padding: '5px', background: '#957772', height: 'fit-content', borderRadius: '3px', color: "#fff" }}
                >
                    Choose friends to chat!
                </span>
            }

            <div style={{ position: 'absolute', left: '90%' }}>
                <ListMember />
            </div>
        </div >
    )
}

export default ChatHeader