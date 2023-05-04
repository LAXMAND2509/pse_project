import React, { useContext, useState, useEffect, useRef } from 'react'
import { json } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import * as cheerio from "cheerio";
import SearchResult from './SearchResult';
const host = "http://localhost:5000"

let results = {}

const SearchBar = () => {
    const context = useContext(noteContext)
    const { product, getProducts } = context;
    const history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'));
            
        }
        else {
            history('/login');
        }
    }, [])
    const [prod, setProd] = useState({name1: ''});
    const handleClick = (e) => {
        e.preventDefault();
        console.log(prod.name1);
        getProducts(prod.name1);
    }
    const onChange = (e) => {

        setProd({ ...prod, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container'>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search your product" name="name1" onChange={onChange} aria-label="Search" />
                    <button disabled={!(prod.name1.length > 2)} className="btn btn-primary mx-2" type="submit" onClick={handleClick}>Search</button>
                </form>
            </div>
            <div className="container">
                <div className="container px-0">
                    {product.length > 4 && "Your Results"}
                </div>
                <div className="row">
                    {
                        product.length > 4 && product.map((note) => {
                            return <SearchResult key={note.tittle} note={note}></SearchResult>
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default SearchBar
