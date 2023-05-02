import React, { useContext } from 'react'
import Notes from './Notes';
const Feedback = (props) => {
    return (
        <div>
            <Notes showAlert={props.showAlert}></Notes>
        </div>
    )
}

export default Feedback
