import React, { Component } from 'react';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: { x: 0, y: 0 },
            health: 100,
            score: 0,
        };
    }

    move = (direction) => {
        const { position } = this.state;
        switch (direction) {
            case 'up':
                this.setState({ position: { x: position.x, y: position.y - 1 } });
                break;
            case 'down':
                this.setState({ position: { x: position.x, y: position.y + 1 } });
                break;
            case 'left':
                this.setState({ position: { x: position.x - 1, y: position.y } });
                break;
            case 'right':
                this.setState({ position: { x: position.x + 1, y: position.y } });
                break;
            default:
                break;
        }
    };

    shoot = () => {
        // Logic for shooting
        console.log('Player shot!');
    };

    render() {
        const { position, health, score } = this.state;
        return (
            <div>
                <h2>Player</h2>
                <p>Position: {`(${position.x}, ${position.y})`}</p>
                <p>Health: {health}</p>
                <p>Score: {score}</p>
            </div>
        );
    }
}

export default Player;