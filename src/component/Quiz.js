import React, { useState, useEffect } from 'react';
import quizData from '../utils/QuizData';
import QuizResult from './QuizResult';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        updateScore();
    }, [clickedOption]);

    const changeQuestion = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(null); // Reset clicked option for the next question
        } else {
            setShowResult(true);
        }
    }

    const updateScore = () => {
        if (clickedOption !== null) {
            console.log('Clicked Option:', clickedOption);
            console.log('Correct Answer:', quizData[currentQuestion].correctAnswer);

            if (clickedOption === quizData[currentQuestion].correctAnswer) {
                console.log('Answer is correct');
                setScore(score + 1);
            }
        }
        console.log('Current Score:', score);
    }

    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(null);
        setScore(0);
    }

    return (
        <div>
            <p className="heading-txt">Quiz APP</p>
            <div className="container">
                {showResult ? (
                    <QuizResult score={score} totalScore={quizData.length} tryAgain={resetAll} />
                ) : (
                    <>
                        <div className="question">
                            <span id="question-number">{currentQuestion + 1}. </span>
                            <span id="question-txt">{quizData[currentQuestion].question}</span>
                        </div>
                        <div className="option-container">
                            {quizData[currentQuestion].options.map((option, i) => (
                                <button
                                    className={`option-btn ${clickedOption === i + 1 ? 'checked' : null}`}
                                    key={i}
                                    onClick={() => setClickedOption(i + 1)}
                                    disabled={clickedOption !== null}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
                    </>
                )}
            </div>
        </div>
    );
}

export default Quiz;
