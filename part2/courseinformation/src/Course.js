const Header = ({ course }) => <h1>{course}</h1>
 
const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return(
  <>
  {parts.map(part => <Part part = {part} key ={part.id}/>)}
  </>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, currentValue) =>
  sum + currentValue.exercises, 0)
  return(
    <p style = {{fontWeight: "bold"}}>Total of {total} exercises </p>
  )
}

const Course = ({course}) => {
  return(
    <>
<Header course={course.name} />
<Content parts = {course.parts} />
<Total parts = {course.parts} />
</>
  )
}

export default Course