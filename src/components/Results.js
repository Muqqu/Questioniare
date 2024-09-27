import React from 'react';

const Results = ({ score, totalQuestions }) => {
    return (
        <div>
            <h2>Your Score: {score} out of {totalQuestions}</h2>
        </div>
    );
};

export default Results;
