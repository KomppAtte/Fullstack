import React, { useState } from 'react'

const Statistics =(props) => {
    if(props.all === 0) {
      return (
        <div>
          None to see here yet.
        </div>
      )
    }

    return (
      <table>
        <tbody>
          <StatisticLine text={'good'} value={props.good}/>
          <StatisticLine text={'neutral'} value={props.neutral}/>
          <StatisticLine text={'bad'} value={props.bad}/>
          <StatisticLine text={'all'} value={props.all}/>
          <StatisticLine text={'average'} value={(props.good + (props.neutral * 0) + (props.bad * (-1)))/(props.all)}/>
          <StatisticLine text={'positive'} value={(props.good/props.all * 100 + ' %')}/>
        </tbody>
      </table>
    )
}

const StatisticLine = (props) => {
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}> {props.text}</button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState(0)

  const handleGoodClick = () => {
    setAllClicks(allClicks + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAllClicks(allClicks + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAllClicks(allClicks + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text={'Good'}></Button>
      <Button handleClick={handleNeutralClick} text = {'Neutral'}></Button>
      <Button handleClick={handleBadClick} text= {'Bad'}></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={allClicks}/>
    </div>
  )
}

export default App