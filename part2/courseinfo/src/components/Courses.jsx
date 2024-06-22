const Courses = ({ courses }) => {
  return courses.map((course) => <Course key={course.id} course={course} />);
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Header = ({ course }) => {
  return <h3>{course}</h3>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  let total = parts.reduce((sum, currentval) => sum + currentval.exercises, 0);
  return (
    <p>
      <b> Total of {total} exercises</b>
    </p>
  );
};

export default Courses;
