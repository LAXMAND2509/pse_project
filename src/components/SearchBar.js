import React from 'react'
import { json } from 'react-router-dom';
// const cheerio = require("cheerio");
import cheerio from 'cheerio';
// const axios = require("axios");
import axios from "axios";
// const fs = require("fs");
// const { log } = require("console");
// const json2csv = require("json2csv").Parser;

const results = [
    {
        "website": "digital",
        "tittle": "In Base Duplex Mobile Case for Mi Note 10 Pro, Red IB-1485",
        "price": "₹299.00",
        "rating": 0,
        "noOfReviews": "",
        "link": "https://www.reliancedigital.in/in-base-duplex-mobile-case-for-mi-note-10-pro-red-ib-1485/p/492573499"
    },
    {
        "website": "digital",
        "tittle": "Inbase Duplex Mobile Case for Mi Note 10 Pro, Blue IB-1484",
        "price": "₹299.00",
        "rating": 0,
        "noOfReviews": "",
        "link": "https://www.reliancedigital.in/inbase-duplex-mobile-case-for-mi-note-10-pro-blue-ib-1484/p/492573722"
    },];
const SearchBar = () => {
    let search_text = "iphone 14 pro max 128";
    function addPlus(string) {
        return string.
            replace(/ /g, '+');
    }
    let search_text_final = addPlus(search_text);

    const url_amazon = `https://www.amazon.in/s?k=${search_text_final}`;
    const url_flipkart = `https://www.flipkart.com/search?q=${search_text_final}`
    const url_croma = `https://www.croma.com/searchB?q=${search_text_final}%3Arelevance&text=${search_text_final}`
    const url_digital = `https://www.reliancedigital.in/search?q=${search_text_final}`
    const productdata_amazon = [];
    const productdata_flipkart = [];
    const productdata_digital = [];
    async function getproduct_amazon() {
        let i = 5;
        try {
            const response = await axios.get(url_amazon);
            const $ = cheerio.load(response.data);
            let pro = $('div[class="sg-col-20-of-24 s-result-item s-asin sg-col-0-of-12 sg-col-16-of-20 sg-col s-widget-spacing-small sg-col-12-of-16"]')
            pro.each(function (index, el) {
                const website = "amazon";
                const tittle11 = $(el).find('span[class="a-size-medium a-color-base a-text-normal"]').text().trim();
                const price11 = $(el).find('span[class="a-price-whole"]').text().trim();
                const rating11 = $(el).find('span[class="a-icon-alt"]').text().trim();
                const noOfReviews11 = $(el).find('span[class="a-size-base s-underline-text"]').text();
                const link11 = "https://www.amazon.in" + $(el).find('a').attr("href").trim();
                if (tittle11.length > 1) {
                    // console.log(tittle11);
                    // console.log(price11);
                    // console.log(rating11);
                    // console.log(noOfReviews11);
                    // console.log(link11);
                    productdata_amazon.push({
                        website, tittle11, rating11, noOfReviews11, link11
                    });
                }
                i--;
                if (i == 0) {
                    return false;
                }
            });
            // const jsonContent = JSON.stringify(productdata_amazon);
            // fs.appendFile("./alphabet.json", jsonContent, 'utf8', function (err) {
            //     if (err) {
            //         return console.log(err);
            //     }

            //     console.log("The file was saved!");
            // }); 
            // const j2csv = new json2csv();
            // const csv = j2csv.parse(productdata_amazon);
            // fs.writeFileSync("./productinfo.csv", csv, "utf-8");

        }
        catch (error) {
            console.error(error);
        }
    }
    async function getproduct_flipkart() {
        let i = 5;
        try {
            const response = await axios.get(url_flipkart);
            const $ = cheerio.load(response.data);
            let pro = $('div[class="_1AtVbE col-12-12"]')
            // console.log(pro);
            pro.each(function (index, el) {
                // console.log(el);
                const website = "flipkart";
                const tittle11 = $(el).find('div[class="_4rR01T"]').text().trim();
                const price11 = $(el).find('div[class="_30jeq3 _1_WHN1"]').text().trim();
                const rating11 = $(el).find('span[class="_2_R_DZ"]').text().trim();
                const noOfReviews11 = $(el).find('span[class="_2_R_DZ"]').text();
                const link11 = "https://www.flipkart.com" + $(el).find('a[class="_1fQZEK"]').attr("href");
                if (tittle11.length > 1) {
                    // console.log(tittle11);
                    // console.log(price11);
                    // console.log(rating11);
                    // console.log(noOfReviews11);
                    // console.log(link11);
                    productdata_flipkart.push({
                        website, tittle11, rating11, noOfReviews11, link11
                    });
                }
                i--;
                if (i == 0) {
                    return false;
                }
            });




            // const j2csv = new json2csv();
            // const csv = j2csv.parse(productdata_amazon);
            // fs.appendFileSync("./productinfo.csv", csv, "utf-8");

        }
        catch (error) {
            console.error(error);
        }
    }
    async function getproduct_digital() {
        let i = 5;
        try {
            const response = await axios.get(url_digital);
            const $ = cheerio.load(response.data);
            let pro = $('div[class="sp grid"]')
            // console.log(pro.children());
            pro.each(function (index, el) {
                const website = "digital";
                // console.log(el);
                // const tittle11 = $(el).find('div[class="sp__product"]').text();
                const tittle11 = $(el).find('p[class="sp__name"]').text();
                // const tittle11 = $(el).find('.product-title .plp-prod-title').text().trim();
                const price11 = $(el).find('div[class="slider-text"] > div > div > div > span > span').text();
                // const price11 = $(el).find('.TextWeb__Text-sc-1cyx778-0 .gimCrs').text();

                // const price11 = $(el).find('.TextWeb__Text-sc-1cyx778-0 .LNMJa .Block-sc-u1lygz-0 .fsbggh').text().trim();
                // const price11 = $(el).find('span[class="TextWeb__Text-sc-1cyx778-0 gimCrs"]').text().trim();
                const rating11 = $(el).find('i[class="fa fa-star"]').length;
                const noOfReviews11 = $(el).find('div[class="slider-text"] > div > span:nth-child(2)').text();
                const link11 = "https://www.reliancedigital.in" + $(el).find('div[class="sp grid"] > a').attr("href");
                if (tittle11.length > 1) {
                    // console.log(tittle11);
                    // console.log(price11);
                    // console.log(rating11);
                    // console.log(noOfReviews11);
                    // console.log(link11);
                    productdata_digital.push({
                        website, tittle11, rating11, noOfReviews11, link11
                    });
                }
                i--;
                if (i == 0) {
                    return false;
                }
            });

        }
        catch (error) {
            console.error(error);
        }
    }
    Promise.all([
        getproduct_amazon(), getproduct_flipkart(), getproduct_digital()
    ]).then(() => {
        let result = productdata_digital.concat(productdata_amazon.concat(productdata_flipkart));
        // console.log(result);
        const jsonContent = JSON.stringify(result);
        console.log(jsonContent);
        // fs.writeFile("./data.json", jsonContent, 'utf8', function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }

        //     console.log("The file was saved!");
        // });
    })
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
                        results.length !== 0 && results.map((note) => {
                            return (
                                <>
                                    <div className='col-md-3'>
                                        <div className="card my-3">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center">
                                                    <h6 className="card-title mb-0 mr-2 py-1">{note.tittle}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                            // return note.title
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default SearchBar
