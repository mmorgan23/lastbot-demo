import React from 'react';

class Clone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: { x: Math.random() * 800, y: Math.random() * 600 },
            health: 100,
            speed: 2,
        };
    }

    moveTowardsPlayer(playerPosition) {
        const { position, speed } = this.state;
        const deltaX = playerPosition.x - position.x;
        const deltaY = playerPosition.y - position.y;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        if (distance > 0) {
            const moveX = (deltaX / distance) * speed;
            const moveY = (deltaY / distance) * speed;

            this.setState({
                position: {
                    x: position.x + moveX,
                    y: position.y + moveY,
                },
            });
        }
    }

    render() {
        const { position } = this.state;
        return (
            <div
                className="clone"
                style={{
                    position: 'absolute',
                    left: position.x,
                    top: position.y,
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'red',
                    borderRadius: '50%',
                }}
            />
        );
    }
}

export default Clone;