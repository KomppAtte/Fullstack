import React, { useState } from 'react'

const points = new Uint8Array(7); 

const Button = (props) => {
  console.log(props.voteText);
  return(
    <div>
      <p>{props.text}</p>
      <p>has {props.voteText} votes</p>
      <button onClick={props.handleClickVote}>vote</button>
      <button onClick={props.handleClick}>next anecdote</button>
    </div>
  )
}

const MostVoted = (props) => {
  let biggest = 0;
  let temp = 0;
  for(let i = 0; i < 7; i++) {
    console.log("silmukka " + i +"ja aanet " + points[i]);
    console.log(points[i] > biggest)
    if(points[i] > biggest) {
      biggest = points[i];
      temp = i;
    }
  }
  console.log("suurin " + biggest);
  return (
    <div>
      <p>{props.array[temp]}</p>
      <p>has {biggest} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  
  const handleSelected = () => {
    setSelected(Math.floor(Math.random() * 7))
  }
  
  const handlePoints = () => {
    const copy = [...points];
    // kasvatetaan taulukon paikan 2 arvoa yhdellä
    copy[selected] += 1;
    points[selected] = copy[selected];
    console.log(copy);
    console.log(points);
  }

  return (
    <div>
      <Button handleClick={handleSelected} handleClickVote={handlePoints} text={anecdotes[selected]} voteText={points[selected]}></Button> 
      <h1>Anecdote with most votes</h1>
      <MostVoted array={anecdotes}></MostVoted> 
    </div>
  )
}

export default App