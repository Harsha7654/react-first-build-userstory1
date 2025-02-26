import React, { useState, useEffect } from "react";
import "./GradeCalculator.css";
import PieChart from "../UI/PieChart"; // Import the PieChart component

const GradeCalculator = () => {
  const [subjects, setSubjects] = useState([]);
  const [showChart, setShowChart] = useState(false); // State to control chart visibility

  useEffect(() => {
    // Simulating fetching subjects from an API
    const fetchSubjects = async () => {
      const defaultSubjects = [
        { name: "Math", score: null },
        { name: "Science", score: null },
        { name: "English", score: null },
        { name: "History", score: null },
      ];
      setSubjects(defaultSubjects);
    };
    fetchSubjects();
  }, []);

  const handleScoreChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].score = value === "" ? null : Number(value);
    setSubjects(updatedSubjects);
  };

  const handleNameChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].name = value;
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: "", score: null }]);
  };

  const calculatePercentage = () => {
    const validScores = subjects.filter((subj) => subj.score !== null);
    if (validScores.length === 0) return "No valid scores";
    const totalScore = validScores.reduce((acc, subj) => acc + subj.score, 0);
    return ((totalScore / (validScores.length * 100)) * 100).toFixed(2) + "%";
  };

  return (
    <div>
      <div className="grade-calculator-container">
        <h2 className="title">Grade Calculator</h2>
        <div className="subjects-container">
          {subjects.map((subject, index) => (
            <div key={index} className="subject-input">
              <input
                type="text"
                value={subject.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="input name-input"
                placeholder="Subject Name"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={subject.score === null ? "" : subject.score}
                onChange={(e) => handleScoreChange(index, e.target.value)}
                className="input score-input"
                placeholder="Score"
              />
            </div>
          ))}
        </div>
        <button onClick={addSubject} className="add-button">
          Add Subject
        </button>
        <div className="percentage">Percentage: {calculatePercentage()}</div>
        <button
          onClick={() => setShowChart(!showChart)}
          className="view-chart-button"
        >
          {showChart ? "Hide Charts" : "View Charts"}
        </button>
      </div>
      {showChart && (
        <div className="chart-container">
          <PieChart
            data={subjects.filter((subject) => subject.score !== null)}
          />
        </div>
      )}
    </div>
  );
};

export default GradeCalculator;
