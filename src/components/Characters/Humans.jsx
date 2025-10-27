import React from 'react';

const Humans = () => {
    return (
        <div className="humans-container">
            <h2>Human Characters</h2>
            <div className="human-character">
                <img src="/path/to/human1.png" alt="Human Character 1" />
                <p>Human Character 1 Description</p>
            </div>
            <div className="human-character">
                <img src="/path/to/human2.png" alt="Human Character 2" />
                <p>Human Character 2 Description</p>
            </div>
            {/* Add more human characters as needed */}
        </div>
    );
};

export default Humans;