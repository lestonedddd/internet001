import React, { useState } from 'react';
import './App.css';

function App() {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [grades, setGrades] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGrade = parseFloat(grade);
    if (!isNaN(newGrade) && subject) {
      setGrades((prevGrades) => [...prevGrades, { subject, grade: newGrade }]);
      setSubject('');
      setGrade('');
    }
  };

  const calculateGpa = () => {
    if (grades.length === 0) return 0;

    const totalPoints = grades.reduce((total, item) => {
      if (item.grade >= 90) return total + 4.0;
      if (item.grade >= 80) return total + 3.0;
      if (item.grade >= 70) return total + 2.0;
      if (item.grade >= 60) return total + 1.0;
      return total + 0.0;
    }, 0);

    return (totalPoints / grades.length).toFixed(2);
  };

  const gpaValue = calculateGpa();
  const getGpaColor = (gpa) => {
    if (gpa < 2.0) return 'red';
    else if (gpa < 3.5) return 'orange';
    else return 'green';
  };

  return (
    <div className="App">
      <h1>成績紀錄與 GPA 計算器</h1>
      <form onSubmit={handleSubmit} className="grade-form">
        <div className="form-group">
          <label>
            科目:
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            成績:
            <input
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              min="0"
              max="100"
              required
            />
          </label>
        </div>
        <button type="submit" className="submit-button">提交</button>
      </form>

      <h2 className="gpa-display" style={{ color: getGpaColor(gpaValue) }}>
        目前 GPA: {gpaValue}
      </h2>

      <h3>成績紀錄</h3>
      <ul className="grades-list">
        {grades.map((item, index) => (
          <li key={index}>
            {item.subject}: {item.grade}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
