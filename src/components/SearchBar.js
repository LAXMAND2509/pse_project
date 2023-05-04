import React, { useContext, useState, useEffect, useRef } from 'react'
import { json } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';
// const cheerio = require("cheerio");
// import cheerio from 'cheerio';
// const axios = require("axios");
// import axios from "axios";
// const fs = require("fs");
// const { log } = require("console");
// const json2csv = require("json2csv").Parser;
import axios from "axios";
import * as cheerio from "cheerio";
import SearchResult from './SearchResult';
const host = "http://localhost:5000"

let results = {}
// const results = [
//     {
//         "website": "digital",
//         "tittle": "In Base Duplex Mobile Case for Mi Note 10 Pro, Red IB-1485",
//         "price": "₹299.00",
//         "rating": 0,
//         "noOfReviews": "",
//         "link": "https://www.reliancedigital.in/in-base-duplex-mobile-case-for-mi-note-10-pro-red-ib-1485/p/492573499"
//     },
//     {
//         "website": "digital",
//         "tittle": "Inbase Duplex Mobile Case for Mi Note 10 Pro, Blue IB-1484",
//         "price": "₹299.00",
//         "rating": 0,
//         "noOfReviews": "",
//         "link": "https://www.reliancedigital.in/inbase-duplex-mobile-case-for-mi-note-10-pro-blue-ib-1484/p/492573722"
//     },]; 

const SearchBar = () => {
    const context = useContext(noteContext)
    const { product, getProducts } = context;
    // useEffect(() => {
    //     getProducts();
    //     // getNotes();
    // }, [])
    // const getProducts = async () => {
    //     //Todo
    //     const response = await fetch(`${host}/api/search/searchproduct`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     });
    //     results = await response.json();
    //     // console.log(results);
    //     convert();
    // }
    // let finalresult = [];
    // async function convert() {
    //     finalresult = [];
    //     let price = 0;
    //     let color = "";
    //     let link = "";
    //     let modelName = "";
    //     let noOfReviews = "";
    //     let ram = "";
    //     let rating = 0;
    //     let storage = "";
    //     let tittle = "";
    //     let website = "";
    //     for (let model in results) {
    //         for (let i = 0; i < results[model].length; i++) {
    //             price = results[model][i].price;
    //             color = results[model][i].color;
    //             link = results[model][i].link;
    //             modelName = results[model][i].modelName;
    //             noOfReviews = results[model][i].noOfReviews;
    //             ram = results[model][i].ram;
    //             rating = results[model][i].rating;
    //             storage = results[model][i].storage;
    //             tittle = results[model][i].tittle;
    //             website = results[model][i].website;
    //             finalresult.push({
    //                 website: website,
    //                 tittle: tittle,
    //                 modelName: modelName,
    //                 price: price,
    //                 storage: storage,
    //                 color: color,
    //                 link: link,
    //                 noOfReviews: noOfReviews,
    //                 rating: rating,
    //                 ram: ram,
    //             })
    //         }
    //     }
    //     console.log(finalresult.length);

    // }
    const history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'));
            
        }
        else {
            history('/login');
        }
        // getNotes();
    }, [])
    const [prod, setProd] = useState({name1: ''});
    const handleClick = (e) => {
        e.preventDefault();
        // let productsearched = "Iphone 14 pro max 128 gb black";
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
                            // return <>
                            //     <div className='col-md-3'>
                            //         <div className="card my-3">
                            //             <div className="card-body">
                            //                 <div className="d-flex align-items-center">
                            //                     <h6 className="card-title mb-0 mr-2 py-1">{note.tittle}</h6>
                            //                 </div>

                            //             </div>
                            //         </div>
                            //     </div>
                            // </>
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default SearchBar
