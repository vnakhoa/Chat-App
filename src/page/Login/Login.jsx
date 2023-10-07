import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import { addDoc } from '@firebase/firestore';
import { collection } from '@firebase/firestore';
import { db } from '../../firebase/firebase';
import { getDocs } from '@firebase/firestore';


const onFinish = async (values) => {
    console.log('SuccessLogin:', values);

    const email = values.username
    const password = values.password

    try {
        // Signed up 
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log(userCredential.user.uid, userCredential.user.email);

    }
    catch (error) {
        alert('wrong username or password', error)
    };

};

const onFinishFailed = (errorInfo) => {
    console.log('FailedLogin:', errorInfo);
    alert('Wrong username or pasword')
};

const Login = () => {
    const [login, setLoggin] = useState({ username: '', password: '' })
    const navigate = useNavigate()

    const [user] = useAuthState(auth)
    console.log(user)


    const handleLogin = (e) => {
        setLoggin(pre => ({ ...pre, [e.target.name]: e.target.value }))
        console.log(e.target.value)
        console.log(login)
    }

    const getData = async () => {
        //Lấy danh sách user trong firestore hiện tại
        const myCollectionRef = collection(db, "user");
        const querySnapshot = await getDocs(myCollectionRef);

        const listCurrentUser = [];
        querySnapshot.forEach((doc) => {
            listCurrentUser.push({
                id: doc.id,
                ...doc.data()
            });
        });
        console.log(listCurrentUser)

        //Kiểm tra tk đã từng đăng nhập chưa
        const isLoginBefore = listCurrentUser.find((item) => {
            if (user && listCurrentUser) {
                console.log('j')
                return item.uid == user.uid;
            }

            console.log('j')
        })

        console.log(isLoginBefore)
        if (isLoginBefore == undefined) {
            console.log('kdnknk')
            //addDoc user
            if (user != null) {
                const docRef = await addDoc(collection(db, "user"), {
                    uid: user.uid,
                    name: user.email,
                    photoURL: user.photoURL,
                });
                console.log(docRef.id)
            }
        }
    }

    useEffect(() => {

        if (user != null) {
            getData();
            navigate('/')
        }
    }, [user])

    return (
        <div style={{ padding: '15px', textAlign: 'center' }}>
            <div style={{ fontWeight: '600', fontSize: '25px', marginBottom: '15px' }}>Login</div>
            <Form
                name="login"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input
                        name="username"
                        onChange={handleLogin}
                        value={login.username}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password
                        name='password'
                        onChange={handleLogin}
                        value={login.password}
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 3,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default Login;