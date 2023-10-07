import { SendOutlined } from "@ant-design/icons"
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { UserContext } from '../../App'
import { auth, db } from '../../firebase/firebase'
import AvatarHeader from '../Avatar/AvatarHeader'
import AvatarWord from '../Avatar/AvatarWord'


function ChatMessage() {
    // User is acting on firebase
    const [user] = useAuthState(auth);
    console.log(user, 'user')
    const ref = useRef()

    //useContext
    const { chooseFriend, setChooseFriend } = useContext(UserContext);
    console.log(chooseFriend, 'chooseFriennd')

    //useState
    const [message, setMessage] = useState([]);
    const [valueInput, setValueInput] = useState('')


    const handleInput = (e) => {
        setValueInput(e.target.value)
    }
    console.log(valueInput)

    const handleSendMessage = async (e) => {
        if ((e.key == "Enter" && valueInput != '' && valueInput != null && chooseFriend != undefined) || e.target.name == 'sendMessage') {
            console.log(chooseFriend)
            try {
                //currentTime
                const currentTime = serverTimestamp();
                console.log(currentTime)
                // Add messgage to firebase firestore 
                const docRef = await addDoc(collection(db, "messages"), {
                    uid: user.uid,
                    name: user.email,
                    photoURL: user.photoURL,
                    text: valueInput,
                    createdAt: currentTime,
                    tokenChat: [user.uid, chooseFriend.uid]
                });

                console.log("Document written with ID: ", docRef.id);
            }
            catch (error) {
                console.error("Error adding document: ", error);
            }
            //Set lại inputvalue
            setValueInput('')

            // Cuộn xuông cuối
            ref.current.scrollTo({
                top: ref.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }
    console.log(chooseFriend)



    useEffect(() => {

        let valueUser;
        let valueFriend;
        if (user && chooseFriend) {

            valueUser = user.uid;
            valueFriend = chooseFriend.uid;
            console.log(valueUser, valueFriend)
        }
        else {
            console.log(valueUser)
            return;
        }

        console.log(valueUser)

        const collectionRef = query(collection(db, "messages"), orderBy('createdAt'));
        console.log(collectionRef)


        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            let newMessage = [];
            snapshot.forEach((doc) => {
                const data = JSON.parse(JSON.stringify(doc.data()))
                console.log(data);

                newMessage.push({ ...data, id: doc.id })
                console.log(newMessage)
            });
            console.log(newMessage)

            if (user != null && newMessage.length > 0) {
                // const listMesage = newMessage.filter((item) => { return item.uid != user.uid })
                console.log(newMessage)


                const finalMess = newMessage.filter((item) => {
                    return item.tokenChat.includes(valueUser) && item.tokenChat.includes(valueFriend)
                })
                setMessage(finalMess)
                console.log(finalMess)
            }
        });

        // Cuộn xuống cuối
        if (ref.current) {
            ref.current.scrollTo({
                top: ref.current.scrollHeight,
                behavior: "smooth"
            });
        }

        return () => {
            console.log('aa')
            unsubscribe()
        }

    }, [chooseFriend])

    console.log(message)

    return (
        <>
            {
                chooseFriend
                    ? <div style={{ display: 'flex', overflow: 'hidden', flexDirection: 'column', height: '100%', width: '100%' }}>
                        <div ref={ref} style={{ height: '90%', width: '100%', overflow: 'auto', scrollbarWidth: '0px', display: 'flex', flexDirection: 'column', justifyContent: 'end', color: '#fff' }}>
                            <div style={{ height: '100%', paddingRight: '10px', paddingLeft: '10px' }}>
                                {
                                    user != null && (
                                        message.length > 0 && message.map(item => {

                                            if (item.uid == user.uid) {
                                                return (
                                                    <div
                                                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', alignItems: 'flex-end', margin: '10px 0' }}
                                                        key={item.id}
                                                    >
                                                        {/* <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            {
                                                                item.photoURL
                                                                    ? <AvatarHeader imageUser={item.photoURL} />
                                                                    : <AvatarWord wordImage={item?.name.charAt(0).toUpperCase()} />
                                                            }
                                                            <span
                                                                style={{ color: 'black', fontWeight: '500' }}
                                                            >
                                                                {item.name}
                                                            </span>
                                                        </div> */}
                                                        <span
                                                            style={{ marginLeft: '20px', padding: '10px', background: '#2e2eb4', maxWidth: '40%', borderRadius: '10px', wordBreak: 'break-all' }}
                                                        >
                                                            {item.text}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                            else {
                                                return (
                                                    <div
                                                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', margin: '5px 0' }}
                                                        key={item.id}
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            {
                                                                item.photoURL
                                                                    ? <AvatarHeader imageUser={item.photoURL} />
                                                                    : <AvatarWord wordImage={item?.name.charAt(0).toUpperCase()} />
                                                            }
                                                            <span
                                                                style={{ color: 'black', fontWeight: '500' }}
                                                            >
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                        <span
                                                            style={{ marginLeft: '20px', padding: '10px', background: '#3d3838', width: 'fit-content', maxWidth: '40%', borderRadius: '10px', wordBreak: 'break-all' }}
                                                        >
                                                            {item.text}
                                                        </span>
                                                    </div>
                                                )
                                            }
                                        }
                                        )
                                    )
                                }
                            </div>
                        </div>

                        {/* Sent mesage */}
                        <div style={{ padding: '19px 0 0 0 ', margin: '0 -5px' }}>
                            <input
                                type="text"
                                placeholder='Message'
                                style={{ width: '90%', outline: 'none', border: 'none', background: '#fff', padding: '15px 15px  15px 10px' }}
                                value={valueInput}
                                onChange={handleInput}
                                onKeyDown={handleSendMessage}

                            />
                            <button
                                className='sendMessage'
                                name='sendMessage'
                                onClick={handleSendMessage}
                            >
                                Send <SendOutlined />
                            </button>
                        </div>
                    </div>

                    : <>Chưa chọn friend</>
            }
        </>
    )
}

export default ChatMessage