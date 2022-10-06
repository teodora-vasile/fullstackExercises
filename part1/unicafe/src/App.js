import { useState } from 'react'

const Button = ({handleClick, text}) => {
return (<button onClick = {handleClick}>
{text}
</button>)
}

const Statistics = ({text, number}) => {
return (
<p>{text}: {number}</p>
)
}

const App = () => {
  // save clicks of each button to its own state
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
  return (
    <div>
      <h1>Give feedback for Cafeteria</h1>
      <Button handleClick = {handleGoodClick} text = "good" />
      <Button handleClick = {handleNeutralClick} text = "neutral" />
      <Button handleClick = {handleBadClick} text = "bad" />
      <h1>Statistics:</h1>
<Statistics text = "good" number = {good} />
<Statistics text = "neutral" number = {neutral} />
<Statistics text = "bad" number = {bad} />

    </div>
  )
}

export default App
