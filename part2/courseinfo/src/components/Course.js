import React from 'react'

const Header = ({ header }) => {
    return (
        <>
            <h1>{header}</h1>
        </>
    )
}

const Part = ({ name, exercise }) => {
    return (
        <p>{name} {exercise}</p>
    )
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => {
                return (
                    <Part
                        key={part.id}
                        exercise={part.exercises}
                        name={part.name}
                    />
                )
            })}
        </>
    )
}

const Total = ({ course }) => {
    return (
        <>
            <p>Number of exercises:
                <em>
                    <strong>
                        {course.map(part => part.exercises).reduce((a, b) => a + b, 0)}
                    </strong>
                </em>
            </p>
        </>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header header={course.name} />
            <Content parts={course.parts} />
            <Total course={course.parts} />
        </>
    )
}

export default Course