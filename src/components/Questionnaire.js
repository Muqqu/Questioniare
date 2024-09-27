import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import questionnaireData from "../Data/MultilingualCareerQuestionnaire.json";
import careerPathsData from "../Data/CareerPaths.json"; 

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [scores, setScores] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [language, setLanguage] = useState("en");
  const [gaEvents, setGaEvents] = useState([]);

  const questionsData = questionnaireData.questions.map(q => ({
    ...q,
    data: q[language]
  }));

  useEffect(() => {
    ReactGA.initialize("UA-XXXXXXXXX-X");
    ReactGA.pageview(window.location.pathname);
  }, []);

  const handleOptionSelect = (questionId, option) => {
    setUserResponses(prev => ({ ...prev, [questionId]: option }));
  };

  const calculateScores = () => {
    const { scoring, careerPaths } = careerPathsData;
    let newScores = {};

    careerPaths.forEach(path => {
      newScores[path.id] = 0;
    });

    Object.entries(userResponses).forEach(([questionId, response]) => {
      if (scoring.education[response]) {
        Object.entries(scoring.education[response]).forEach(([career, score]) => {
          newScores[career] += score;
        });
      }
      if (scoring.experience[response]) {
        Object.entries(scoring.experience[response]).forEach(([career, score]) => {
          newScores[career] += score;
        });
      }
      if (scoring.current_field[response]) {
        Object.entries(scoring.current_field[response]).forEach(([career, score]) => {
          newScores[career] += score;
        });
      }
      if (questionId.startsWith('comparison_') && scoring.comparison_pairs[questionId.split('_')[1]]) {
        const pairScores = scoring.comparison_pairs[questionId.split('_')[1]][response];
        Object.entries(pairScores).forEach(([career, score]) => {
          newScores[career] += score;
        });
      }
    });

    setScores(newScores);
  };

  const trackGAEvent = (action, label) => {
    ReactGA.event({
      category: "Questionnaire",
      action,
      label
    });
    setGaEvents(prev => [...prev, { action, label, timestamp: new Date().toISOString() }]);
  };

  const handleNext = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      trackGAEvent("Next Question", `Moved to question ${currentQuestion + 2}`);
    } else {
      calculateScores();
      setShowResult(true);
      trackGAEvent("Completed", "User completed the questionnaire");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      trackGAEvent("Previous Question", `Moved back to question ${currentQuestion}`);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setUserResponses({});
    setScores({});
    setShowResult(false);
    setGaEvents([]);
    trackGAEvent("Restarted", "User restarted the questionnaire");
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setCurrentQuestion(0);
    setUserResponses({});
    setShowResult(false);
    trackGAEvent("Language Changed", `Changed to ${e.target.value}`);
  };

  const isQuestionAnswered = () => {
    const currentQuestionData = questionsData[currentQuestion];
    if (currentQuestionData.type === "single-choice") {
      return !!userResponses[currentQuestionData.id];
    } else if (currentQuestionData.type === "comparison") {
      return currentQuestionData.data.pairs.every(pair => 
        !!userResponses[`${currentQuestionData.id}-${pair.id}`]
      );
    }
    return false;
  };

  const getTopCareerPaths = () => {
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([careerPath, score]) => {
        const careerInfo = careerPathsData.careerPaths.find(path => path.id === careerPath);
        return {
          id: careerPath,
          name: careerInfo[language],
          score: score,
          fields: careerInfo.fields.map(field => field[language])
        };
      });
  };

  if (showResult) {
    const topCareerPaths = getTopCareerPaths();
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Your Career Path Recommendations</h2>
          {topCareerPaths.map((career, index) => (
            <div key={career.id} className="mb-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-xl font-semibold">{index + 1}. {career.name}</h3>
              <p className="text-gray-600">Score: {career.score}</p>
              <p className="mt-2"><strong>Potential fields:</strong></p>
              <ul className="list-disc list-inside">
                {career.fields.map((field, fieldIndex) => (
                  <li key={fieldIndex}>{field}</li>
                ))}
              </ul>
            </div>
          ))}
          <h3 className="text-lg font-semibold mb-2">Google Analytics Events:</h3>
          <ul className="mb-6 max-h-40 overflow-y-auto">
            {gaEvents.map((event, index) => (
              <li key={index} className="mb-1">
                <span className="font-semibold">{event.action}:</span> {event.label} ({event.timestamp})
              </li>
            ))}
          </ul>
          <button
            onClick={handleRestart}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Restart Questionnaire
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = questionsData[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Question {currentQuestion + 1}</h2>
          <select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="et">Estonian</option>
            <option value="ru">Russian</option>
          </select>
        </div>
        <p className="text-lg mb-4">{currentQuestionData.data.question}</p>

        {currentQuestionData.type === "single-choice" && (
          <div className="space-y-2">
            {currentQuestionData.data.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(currentQuestionData.id, option)}
                className={`w-full py-2 px-4 rounded-md transition duration-300 ${
                  userResponses[currentQuestionData.id] === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQuestionData.type === "comparison" && (
          <div className="space-y-2">
            {currentQuestionData.data.pairs.map((pair, index) => (
              <div key={index} className="flex justify-between">
                <button
                  onClick={() => handleOptionSelect(`${currentQuestionData.id}-${pair.id}`, 'a')}
                  className={`w-full py-2 px-4 rounded-md transition duration-300 mr-2 ${
                    userResponses[`${currentQuestionData.id}-${pair.id}`] === 'a'
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {pair.a}
                </button>
                <button
                  onClick={() => handleOptionSelect(`${currentQuestionData.id}-${pair.id}`, 'b')}
                  className={`w-full py-2 px-4 rounded-md transition duration-300 ml-2 ${
                    userResponses[`${currentQuestionData.id}-${pair.id}`] === 'b'
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {pair.b}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center px-4 py-2 rounded-md transition duration-300 ${
              currentQuestion === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            <FaArrowLeft className="mr-2" /> Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!isQuestionAnswered()}
            className={`flex items-center px-4 py-2 rounded-md transition duration-300 ${
              !isQuestionAnswered()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {currentQuestion === questionsData.length - 1 ? "Submit" : "Next"}
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;