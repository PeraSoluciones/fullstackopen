import { useState } from 'react';
const Display = ({ text }) => <h1>{text}</h1>;
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;
  const average = ((good + bad * -1) / all).toFixed(2);
  const positive = ((good / all) * 100).toFixed(2);
  const hasFeedback = good || neutral || bad;
  if (hasFeedback) {
    return (
      <table>
        <tbody>
          <StatisticsLine text={'good'} value={good} />
          <StatisticsLine text={'neutral'} value={neutral} />
          <StatisticsLine text={'bad'} value={bad} />
          <StatisticsLine text={'all'} value={all} />
          <StatisticsLine text={'average'} value={average} />
          <StatisticsLine text={'positive'} value={positive + '%'} />
        </tbody>
      </table>
    );
  }
  return <p>No feedback given</p>;
};
const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => setGood((prev) => prev + 1);
  const handleClickNeutral = () => setNeutral((prev) => prev + 1);
  const handleClickBad = () => setBad((prev) => prev + 1);
  return (
    <>
      <Display text={'give feedback'} />
      <Button handleClick={handleClickGood} text={'good'} />
      <Button handleClick={handleClickNeutral} text={'neutral'} />
      <Button handleClick={handleClickBad} text={'bad'} />
      <Display text={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
