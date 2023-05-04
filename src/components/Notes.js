import React, { useContext, useState, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItems from './NoteItems';
import Addnotes from './Addnotes';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const history = useNavigate();
    const context = useContext(noteContext)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'));
            getNotes();
        }
        else {
            history('/login');
        }
        // getNotes();
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = (e) => {
        console.log("updating the note...", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success")
        // addNote(note.etitle, note.edescription, note.etag);
    }

    const onChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Addnotes showAlert={props.showAlert}></Addnotes>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Feedback</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="form-group">
                                    <label htmlFor="title">Product Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} placeholder="Enter Title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description and Experience</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Enter description" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tag">Rating</label>
                                    <input type="number" className="form-control" id="tag" name="tag" placeholder="Enter Rating in numbers(1-5)" value={note.etag} onChange={onChange} min={0} max={5} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container px-0 '>
                <h2>Your History Feedbacks</h2>
                <div className="container px-0">
                    {notes.length === 0 && "No notes to display"}
                </div>
                <div className="row">
                    {
                        notes.length !== 0 && notes.map((note) => {
                            return <NoteItems key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}></NoteItems>
                            // return note.title
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Notes
