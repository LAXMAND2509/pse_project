import react from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
let results = {}
const NoteState = (props) => {
    const host = "http://localhost:5000"
    const intialnotes = []
    const intialproduct = []
    const intialsearchhistory = []
    //get all notes
    const getNotes = async () => {
        //Todo
        const response = await fetch(`${host}/api/notes/fecthallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }
    //Add a note
    const addNote = async (title, description, tag) => {
        //Todo
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }
    //Delete a note
    const deleteNote = async (id) => {
        //Todo
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = response.json();
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes)
    }
    //edit a note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
            }
        }
        setNotes(newNotes);
    }
    const getProducts = async (productsearched) => {
        //Todo
        const response = await fetch(`${host}/api/search/searchproduct/${productsearched}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1MTMxNWY3ZjI0YzY3YTgzZGE1YjExIn0sImlhdCI6MTY4MzE4OTE0OH0.p3VHMKxIKWMeS8A9o3YoLcTidXBNNyCvQ65je7Gejrk"
            }
        });
        results = await response.json();
        // console.log(results);
        convert();
    }
    
    let finalresult = [];
    async function convert() {
        finalresult = [];
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
                finalresult.push({
                    website: website,
                    tittle: tittle,
                    modelName: modelName,
                    price: price,
                    storage: storage,
                    color: color,
                    link: link,
                    noOfReviews: noOfReviews,
                    rating: rating,
                    ram: ram,
                })
            }
        }
        console.log(finalresult);
        setProduct(finalresult)
        
    }
    async function getsearchhistory(){
        const response = await fetch(`${host}/api/producthistory/getsearchhistory`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        results = await response.json();
        setSearchhistory(results);
        console.log(results);
    }
    const addsearchhistory = async (title, description, link) => {
        //Todo
        const response = await fetch(`${host}/api/producthistory/addsearchhistory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, link }),
        });
        const note = await response.json();
        setSearchhistory(searchhistory.concat(note));
    }
    const [searchhistory,setSearchhistory] = useState(intialsearchhistory);
    const [notes, setNotes] = useState(intialnotes)
    const [product,setProduct] = useState(intialproduct)
    return (
        <NoteContext.Provider value={{searchhistory,getsearchhistory, addsearchhistory,product,getProducts,notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;