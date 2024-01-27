import React from "react";
import { Route, Routes} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../Home";
import Grades from "../Grades/Grades";
import DownriverStorage from "../Storage/DownriverStorage"


const AppRoutes = () =>{
 
   return (
    <Routes>
      
      <Route element={<PrivateRoute/>}>
      <Route exact path="/grades" element={<Grades />}/>
      <Route exact path="/downriver_strg" element={<DownriverStorage />} />
      </Route>
      <Route exact path="/" element={<Home/>}/>
  
    </Routes>
  );
  };


export default AppRoutes;