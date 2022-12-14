import { useState } from 'react'

const Button = ({handleClick, text}) => {
return (<button onClick = {handleClick}>
{text}
</button>)
}

const StatisticLine = ({text, number}) => (<tr><td>{text}</td><td>{number}</td></tr>)

const Statistics = ({good, neutral, bad, all}) => {
if (all === 0) { 
  return (
  <p>No feedback given.</p>
 )}
  return(
<>
<table>
 <StatisticLine text = "good" number = {good} />
 <StatisticLine text = "neutral" number = {neutral} />
 <StatisticLine text = "bad" number = {bad} />
 <StatisticLine text = "all" number = {all} />
 <StatisticLine text = "average" number = {(good-bad)/all} />
 <StatisticLine text = "positive" number = {good*100/all} />
 </table>
</>)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () => {
setGood(good + 1)
}
  const handleNeutralClick = () => {
setNeutral(neutral+1)
}
  const handleBadClick = () => {
setBad(bad+1)
}
  const all = good + neutral + bad
  return (
    <>
      <h1>Give feedback for Cafeteria</h1>
      <Button handleClick = {handleGoodClick} text = "good" />
      <Button handleClick = {handleNeutralClick} text = "neutral" />
      <Button handleClick = {handleBadClick} text = "bad" />
      <h1>Statistics:</h1>
      <Statistics good ={good} neutral ={neutral} bad = {bad} all={all}/>
    </>
  )
}
export default App