import React from 'react'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'

import { Row, Col } from 'antd'


function Chat() {
    return (
        <div style={{ height: '100%' }}>
            <Row style={{ padding: ' 20px 0', borderBottom: '1px solid #fff', height: '10vh' }}>
                <ChatHeader />
            </Row>
            <Row style={{ paddingTop: '10px', height: '90vh' }}>
                <ChatMessage />
            </Row>
        </div>
    )
}

export default Chat