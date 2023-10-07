import React from 'react';

const AvatarHeader = (props) => (
    <div style={{ width: '25px', height: '25px' }}>
        <img src={props.imageUser} style={{ width: '100%' }} />
    </div>
);
export default AvatarHeader;