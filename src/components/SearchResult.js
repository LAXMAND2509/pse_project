import React from 'react'

const SearchResult = (props) => {
    const { note } = props;
    return (
        <>
            <div className=''>
                <div className="card m-1 ">
                    <div className="card-body ">
                        <div className="d-flex align-items-center .card1">
                            <h6 className="card-title mb-0 mr-2 py-1 row1">{note.tittle}</h6>
                            <div className='row1'>
                                <span className='sec'>{note.website}</span>
                                <span className='sec'>{note.modelName}</span>
                                <span className='sec'>{note.price}</span>
                                <span className='sec'>{note.noOfReviews}</span>
                                <span className='sec'>{note.storage}</span>
                                <span className='sec'>{note.color}</span>
                                <span className='sec'><a href={note.link}>Link</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchResult
