import React, { useContext, useState, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItems from './NoteItems';
import { useNavigate } from 'react-router-dom';
import SearchHistoryItems from './SearchHistoryItems';
const Notes = (props) => {
    const history = useNavigate();
    const context = useContext(noteContext)
    const { searchhistory, getsearchhistory } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'));
            getsearchhistory();
        }
        else {
            history('/login');
        }
    }, [])
    return (
        <>

            <div className='container px-0 '>
                <h2>Your History Search</h2>
                <div className="container px-0">
                    {searchhistory.length === 0 && "No notes to display"}
                </div>
                <div className="row">
                    {
                        searchhistory.length !== 0 && searchhistory.map((note) => {
                            return <SearchHistoryItems key={note._id} showAlert={props.showAlert} note={note} ></SearchHistoryItems>

                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Notes
