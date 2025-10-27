import React from 'react';
import GameBoard from '../components/Game/GameBoard';
import Layout from '../components/Layout/Layout';
// import '../../styles/game.css';
// import '../../styles/global.css';
// import '../../styles/components.css';


const GamePage = () => {
    return (
        <Layout>
            <GameBoard />
        </Layout>
    );
};

export default GamePage;