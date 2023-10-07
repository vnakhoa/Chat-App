import React, { useEffect } from 'react'
import Chat from '../../components/Chat/Chat'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Col, Row } from 'antd'
import { auth } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

function MainLayout() {
    const [user] = useAuthState(auth)
    console.log(user);

    const navigate = useNavigate()

    useEffect(() => {
        if (user == null) {
            navigate('/login')
        }
    }, [user])

    return (
        <Row style={{ height: '100vh' }}>
            <Col span={6} style={{ background: '#b9b4b4', padding: '0 5px' }}>
                <Sidebar />
            </Col>
            <Col span={18} style={{ background: '#ecdddd', padding: '0' }}>
                <Chat />
            </Col>
        </Row>
    )
}

export default MainLayout