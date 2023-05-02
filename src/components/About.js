import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
const About = () => {
    const a = useContext(noteContext)
    return (
        <div>
            This is About Component
        </div>
    )
}

export default About
