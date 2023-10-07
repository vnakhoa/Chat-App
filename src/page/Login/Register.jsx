
import { Button, Form, Input } from 'antd';
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const onFinish = async (values) => {
    console.log('SuccessRegister:', values);
    const email = values.username
    const password = values.password

    try {
        // Signed up 
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredential.user);

    }
    catch (error) {
        console.log(error.message, 'eror')
        alert(error.message)
    };
};

const onFinishFailed = (errorInfo) => {
    console.log('FailedRegister:', errorInfo);
    alert('Enter your infomations to sign up')
};

const Register = () => {
    const [register, setRegister] = useState({ username: '', password: '' })
    const navigate = useNavigate();

    // Firebase
    const [user] = useAuthState(auth);
    console.log(user, 'user')

    const handleRegister = (e) => {
        setRegister(pre => ({ ...pre, [e.target.name]: e.target.value }))

    }

    useEffect(() => {
        if (user != null) {
            navigate('/')
        }
    }, [user])

    return (
        <div style={{ padding: '15px', textAlign: 'center' }}>
            <div style={{ fontWeight: '600', fontSize: '25px', marginBottom: '15px' }}>Register</div>
            <Form
                name="register"
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
                        onChange={handleRegister}
                        value={register.username}
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
                        onChange={handleRegister}
                        value={register.password}
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default Register;