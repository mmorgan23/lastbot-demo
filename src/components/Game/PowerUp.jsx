import React from 'react';

const PowerUp = ({ type, position }) => {
    const powerUpStyles = {
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: '30px',
        height: '30px',
        backgroundColor: type === 'speed' ? 'blue' : 'green',
        borderRadius: '50%',
    };

    return <div style={powerUpStyles}></div>;
};

export default PowerUp;