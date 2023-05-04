import React, { useContext } from 'react'

const SearchHistoryItems = (props) => {
    const { note } = props;
    return (
        <div className=''>
            <div className="card m-1 ">
                <div className="card-body ">
                    <div className=" .card1">
                        <h6 className="card-title mb-0 mr-2 py-1 row1">{note.title}</h6>
                        <div className='row1'>
                            <span>{note.description}</span>
                            <span><a href={note.link}>Link</a></span>
                            <span>{note.date}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchHistoryItems

