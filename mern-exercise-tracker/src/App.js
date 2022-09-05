import React from "react";
import {Route,Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/navbar.component';
import ExerciseList from './components/exercises-list.component';
import EditExercise from './components/edit-exercises.component'
import CreateExercise from './components/create-exercises.component';
import CreateUser from './components/create-users.component';

function App() {
  return (
    
    <div className="container">
      <Navbar/>
      <br />
      
      <Routes>
     
        <Route path="/" exact element={<ExerciseList />}></Route>
        <Route path="/edit/:id" element={<EditExercise />}></Route>
        <Route path="/create" element={<CreateExercise />}></Route>
        <Route path="/user" element={<CreateUser />}></Route>

      </Routes>
      </div>

  );
}

export default App;
