import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const Addnotes = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        setNote({ title: "", description: "", tag: "" });
        addNote(note.title, note.description, note.tag);
        props.showAlert("Added successfully","success")
    }

    const onChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container">
                <h2>Share Your Experience</h2>
                <form className='my-3'>
                    <div className="form-group">
                        <label htmlFor="title">Product Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange} value={note.title} minLength={5} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description and Experience</label>
                        <textarea  type="textarea" className="form-control" id="description" name="description" placeholder="Enter description" value={note.description} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Rating of our search</label>
                        <input type="number" className="form-control" id="tag" name="tag" placeholder="Enter tag" value={note.tag} onChange={onChange} min={0} max={5}/>
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary my-2" onClick={handleClick}>Submit you feedback</button>
                </form>
            </div>
        </>
    )
}

export default Addnotes
