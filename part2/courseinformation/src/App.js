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

  const App = () => {
    const courses = [
      {
        name: 'Half Stack application development',
        id: 1,
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]

  return(
    <>
    {courses.map(course =>  <Course course={course} key = {course.id}/>)}
  </>
  )
}

export default App