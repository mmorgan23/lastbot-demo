import React from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner/Banner';
// import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const handleEnter = () => {
        navigate('/game/1');
    };

    return (
        <div
            className="home-page"
            style={{
                minHeight: '100vh',
                backgroundImage: "url('/assets/backgrounds/home.png')", // Replace with your image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <h1 style={{ color: 'limegreen', marginTop: 120 }}>Welcome to LAST BOT</h1>
            <h2 style={{ color: 'limegreen', marginTop: 30 }}>*Designed to be Played on Desktop Computer.*</h2>
            <p style={{ color: 'limegreen', maxWidth: 800, fontSize: '1.2rem', margin: '24px 0', textAlign: 'center' }}>
                When an evil scientist named Dr. Con creates evil clones from programmable metal and human DNA, the clones destroy 75% of humanity and enslave the other 25% in cities all over the world. Before being captured, a team of computer programmers and engineers from New York City create an intelligent robot to help free humanity from the evil clones and to destroy Dr. Con. The Last Bot is humanity’s only hope of freedom and survival! Check out the demo below.
            </p>
            <p style={{ color: 'limegreen', fontSize: '1.2rem'}} >Prepare for an action-packed adventure!</p>
            <button
                onClick={handleEnter}
                style={{
                    marginTop: 40,
                    width: 180,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'limegreen',
                    color: '#000',
                    border: '2px solid #fff',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '20px 4px 5px rgba(0,255,0,0.2)'
                }}
            >
                PLAY
            </button>
            <p style={{ color: 'white', fontSize: '0.8rem', marginTop: 60}} >All Rights Reserved. Created by Melissa Morgan. 2025.</p>

        </div>
    );
};

export default HomePage;