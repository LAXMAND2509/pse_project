import React from 'react'


const SearchBar = () => {
    const results = [];
    return (
        <>
            <div className='container'>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" name="searcg" aria-label="Search" />
                    <button className="btn btn-primary mx-2" type="submit">Search</button>
                </form>
            </div>
            <div className="container">
                <div className="container px-0">
                    {results.length !== 0 && "Your Results"}
                </div>
                <div className="row">
                    {
                        
                    }
                </div>
            </div>

        </>
    )
}

export default SearchBar
