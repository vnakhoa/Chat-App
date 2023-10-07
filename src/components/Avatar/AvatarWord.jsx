import React from 'react';
import { Avatar, Space } from 'antd';


const AvatarWord = ({ wordImage }) => (
    <Space size={16} wrap>
        <Avatar
            style={{
                backgroundColor: '#fde3cf',
                color: '#f56a00',
            }}
        >
            {wordImage}
        </Avatar>

    </Space>
);
export default AvatarWord;