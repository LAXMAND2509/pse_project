import React, { useContext } from 'react'
import Notes from './Notes';
import SearchBar from './SearchBar';
const Home = (props) => {
    const { showAlert } = props
    return (
        <>
            
            <div className="container">
                <h3 className=' my-3'>Search Your product</h3>
                <SearchBar></SearchBar>
            </div>
        </>
    )
}

export default Home

