
import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NotesSates';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Feedback from './components/Feedback';
import SearchHistory from './components/SearchHistory'
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <Alert alert={alert}></Alert>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}></Home>}></Route>
            <Route exact path="/about" element={<About></About>}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert}></Login>}></Route>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}></Signup>}></Route>
            <Route exact path="/feedback" element={<Feedback showAlert={showAlert}></Feedback>}></Route>
            <Route exact path="/searchhistory" element={<SearchHistory showAlert={showAlert}></SearchHistory>}></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
