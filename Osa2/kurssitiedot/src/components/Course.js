import React from "react"

const Course = ({course}) => {
  console.log("toimiiko tää", course)
  return (
    <div>
      <Header course={course} />
      <div>
        {course.parts.map(part =>
          <Content key={part.id} part={part} /> 
        )}
      </div>
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({course}) => {
  return (
    <div>
      <h2>{course.name}</h2>
    </div>
  )
}

const Content = ({part}) => {
  console.log(part)
  return(
    <div>
      <Part part={part}/>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.part.name + " " + props.part.exercises}</p>
    </div>
  )
} 

const Total = ({parts}) => {
  const sum = parts.reduce((total, curr) => {
      if(isNaN(total.exercises)) {
        return total + curr.exercises
      }
      return total.exercises + curr.exercises
  })
  return (
    <div>
      <b>Number of exercises {sum}</b>
    </div>
  )
}

export default Course