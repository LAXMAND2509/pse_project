const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const SearchResult = require('../models/SearchHistory');
const colorKeywords = require('../color.json');
const { query, check, validationResult } = require('express-validator');
let phones = {};
let phoneGroups = {};
let search_text = "";
function addPlus(string) {
    return string.replace(/ /g, '+');
}
let search_text_final = "";
const HEADERS = {
    'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36')",
    'Accept-Language': 'en-US, en;q=0.5'
}
let url_amazon = "";
let url_flipkart = "";
let url_digital = "";
async function assign(prod) {
    search_text_final = addPlus(prod);
    url_amazon = `https://www.amazon.in/s?k=${search_text_final}`;
    url_flipkart = `https://www.flipkart.com/search?q=${search_text_final}`;
    url_digital = `https://www.reliancedigital.in/search?q=${search_text_final}`;
}
let productdata_amazon = [];
let productdata_flipkart = [];
let productdata_digital = [];
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function UpdatePrice() {
    for (let model in phoneGroups) {
        for (let i = 0; i < phoneGroups[model].length; i++) {
            let x = phoneGroups[model][i].price;
            try {
                if (x) {
                    if (typeof x === 'string') {
                        if (x[0] === '₹') {
                            x = x.substring(1, x.length);
                        }
                        x = x.replaceAll(',', '');
                    }
                    phoneGroups[model][i].price = x * 1;
                }
                else {
                    continue;
                }
            }
            catch (e) {
                console.log(e.message);
            }

        }
    }

}
function rating1(str) {
    if (str.length > 0) {
        return str
    }
    return "No review"
}
function getSubstringUntilWord(str, word) {
    str = str.toLowerCase()
    let max_len = -1;
    for (i = 0; i < word.length; i++) {

        var index = str.indexOf(word[i]);
        max_len = Math.max(max_len, index + word[i].length);
    }


    if (max_len !== -1) {
        return str.substring(0, max_len);
    }
    return str;
}
function getStorage(str) {
    str = str.toLowerCase();
    let index1 = -1;
    let index2 = -1;
    index1 = str.indexOf(' gb');
    index2 = str.indexOf(' tb');
    let max_len = Math.max(index1, index2);
    let ptr = max_len;
    while (ptr > 0) {
        ptr--;
        if (str[ptr] === ' ' || str[ptr] === '(') {
            return str.substring(ptr + 1, max_len + 3);
        }
        else {
            continue;
        }
    }
    return "none";
}
function getRam(str) {
    str = str.toLowerCase();
    let index1 = -1;
    index1 = str.indexOf(' gb ram');
    let max_len = index1;
    let ptr = max_len;
    while (ptr > 0) {
        ptr--;
        if (str[ptr] === ' ' || str[ptr] === '(' || str[ptr] === ',') {
            return str.substring(ptr + 1, max_len + 7);
        }
        else {
            continue;
        }
    }
    return "none";
}
function productColor(str) {

    str = str.toLowerCase()
    for (let i = 0; i < colorKeywords.length; i++) {
        if (str.indexOf(colorKeywords[i].toLowerCase(), 0) > 0) {
            return colorKeywords[i];
        }
    }
    return "none";
}

async function getproduct_amazon() {
    let i = 4;
    productdata_amazon = [];
    try {
        const response = await axios.get(url_amazon);
        const $ = cheerio.load(response.data);
        let pro = $('div[class="sg-col-20-of-24 s-result-item s-asin sg-col-0-of-12 sg-col-16-of-20 sg-col s-widget-spacing-small sg-col-12-of-16"]')
        pro.each(function (index, el) {
            const website = "amazon";
            const tittle = $(el).find('span[class="a-size-medium a-color-base a-text-normal"]').text().trim();
            const price = $(el).find('span[class="a-price-whole"]').text().trim();
            const rating = $(el).find('span[class="a-icon-alt"]').text().trim();
            let noOfReviews = $(el).find('span[class="a-size-base s-underline-text"]').text();
            noOfReviews = rating1(noOfReviews);
            const link = "https://www.amazon.in" + $(el).find('a').attr("href").trim();
            if (tittle.length > 1) {
                productdata_amazon.push({
                    website, tittle, price, rating, noOfReviews, link
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
async function getproduct_flipkart() {
    productdata_flipkart = [];
    let i = 4;
    try {
        const response = await axios.get(url_flipkart);
        const $ = cheerio.load(response.data);
        let pro = $('div[class="_1AtVbE col-12-12"]')
        pro.each(function (index, el) {
            const website = "flipkart";
            const tittle = $(el).find('div[class="_4rR01T"]').text().trim();
            const price = $(el).find('div[class="_30jeq3 _1_WHN1"]').text().trim();
            const rating = $(el).find('span[class="_2_R_DZ"]').text().trim();
            let noOfReviews = $(el).find('span[class="_2_R_DZ"]').text();
            noOfReviews = rating1(noOfReviews);
            const link = "https://www.flipkart.com" + $(el).find('a[class="_1fQZEK"]').attr("href");
            if (tittle.length > 1) {
                productdata_flipkart.push({
                    website, tittle, price, rating, noOfReviews, link
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
async function getproduct_digital() {
    productdata_digital = [];
    let i = 4;
    try {

        const response = await axios.get(url_digital);
        const $ = cheerio.load(response.data);
        let pro = $('div[class="sp grid"]')
        pro.each(function (index, el) {
            const website = "digital";
            const tittle = $(el).find('p[class="sp__name"]').text();
            const price = $(el).find('div[class="slider-text"] > div > div > div > span > span').text();
            const rating = $(el).find('i[class="fa fa-star"]').length;
            let noOfReviews = $(el).find('div[class="slider-text"] > div > span:nth-child(2)').text();
            noOfReviews = rating1(noOfReviews)
            const link = "https://www.reliancedigital.in" + $(el).find('div[class="sp grid"] > a').attr("href");
            if (tittle.length > 1) {
                productdata_digital.push({
                    website, tittle, price, rating, noOfReviews, link
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
async function final() {
    Promise.all([
        // getproduct_amazon(), getproduct_flipkart(), getproduct_digital()
        getproduct_flipkart(), getproduct_digital()
    ]).then(() => {
        phones = productdata_digital.concat(productdata_amazon.concat(productdata_flipkart));
    })
}
async function sort() {
    for (let model in phoneGroups) {
        for (let i = 0; i < phoneGroups[model].length; i++) {
            for (let j = i + 1; j < phoneGroups[model].length; j++) {
                let x = phoneGroups[model][i].price;
                let y = phoneGroups[model][j].price;
                if (y < x) {
                    let xx = phoneGroups[model][i];
                    let yy = phoneGroups[model][j];
                    phoneGroups[model][i] = yy;
                    phoneGroups[model][j] = xx;
                }
            }
        }
    }
}
async function convert(results,userid) {
    let price = 0;
    let color = "";
    let link = "";
    let modelName = "";
    let noOfReviews = "";
    let ram = "";
    let rating = 0;
    let storage = "";
    let tittle = "";
    let website = "";
    for (let model in results) {
        for (let i = 0; i < results[model].length; i++) {
            price = results[model][i].price;
            color = results[model][i].color;
            link = results[model][i].link;
            modelName = results[model][i].modelName;
            noOfReviews = results[model][i].noOfReviews;
            ram = results[model][i].ram;
            rating = results[model][i].rating;
            storage = results[model][i].storage;
            tittle = results[model][i].tittle;
            website = results[model][i].website;
            let desc = modelName + " " + color +" " +storage+ " ₹" + price;
            // let date = new Date();
            const utcdateStr = new Date().toUTCString();
            // today = today.toUTCString();
            const note = new SearchResult({
                title:tittle,description:desc,link, user: userid,date:utcdateStr
            })
            console.log(note);
            const savedNote = await note.save();
        }
    }

}
router.get('/searchproduct/:id', fetchuser, async (req, res) => {
    try {
        search_text = req.params.id;
        assign(search_text)
        phoneGroups = {};
        await final();
        await sleep(7000);
        const notes = phones;
        let len = 0;
        phones.forEach((phone) => {
            let color = productColor(phone.tittle);
            let modelName = getSubstringUntilWord(phone.tittle, ['max', "pro", "ultra"]);
            let storage = getStorage(phone.tittle);
            let ram = getRam(phone.tittle);
            let phoneKey = "";
            if (ram === "null") {

                phoneKey = modelName + ' ' + storage + ' ' + color + ' ' + ram;
            }
            else {

                phoneKey = modelName + ' ' + storage + ' ' + color;
            }
            phone.color = color;
            phone.modelName = modelName;
            phone.storage = storage;
            phone.ram = ram;
            if (!phoneGroups[phoneKey]) {
                phoneGroups[phoneKey] = [];
                len++;
            }

            phoneGroups[phoneKey].push(phone);
        });
        UpdatePrice();
        sort();
        res.json(phoneGroups);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        convert(phoneGroups,req.user.id);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Some error occured",
            error: error.message
        });
    }
});
module.exports = router;
