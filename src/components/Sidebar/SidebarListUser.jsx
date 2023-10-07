import React, { useContext, useEffect, useState } from 'react'
import AvatarHeader from '../Avatar/AvatarHeader'
import AvatarWord from '../Avatar/AvatarWord'

import { auth } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/firebase'
import { UserContext } from '../../App'


function SidebarListUser() {
    const [listUser, setListUser] = useState([])

    //useContext
    const { chooseFriend, setChooseFriend } = useContext(UserContext)
    console.log(chooseFriend)

    const [user] = useAuthState(auth)
    console.log(user)

    const getListUser = async () => {
        onSnapshot(collection(db, "user"), (Snapshot) => {
            let newList = [];
            Snapshot.forEach((doc) => {
                const data = JSON.parse(JSON.stringify(doc.data()))
                console.log(data);

                newList.push({ ...data, id: doc.id })
            }); 32

            if (user != null && newList.length > 0) {
                const list = newList.filter((item) => { return item.uid != user.uid })
                console.log(list)

                setListUser(list)
            }
        });

    }

    console.log(listUser.length)
    useEffect(() => {
        getListUser()
    }, [user])

    return (
        <>
            {
                listUser.length > 0 && listUser.map((item) => {
                    return (
                        <div
                            className='list_user'
                            onClick={() => setChooseFriend(item)}
                            key={item.id}
                        >
                            {
                                item.photoURL
                                    ? <AvatarHeader imageUser={item.photoURL} />
                                    : <AvatarWord wordImage={item?.name.charAt(0).toUpperCase()} />
                            }
                            <span>{item.name}</span>
                        </div>
                    )
                })
            }
        </>
    )
}

export default SidebarListUser