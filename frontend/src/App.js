import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Login from './Components/Login/Login';
import Private from "./Components/PrivateRoute/PrivateRoute";
import {PageNotFound} from "./Components/PageNotFound/PageNotFound";
import Cargo from "./Components/Cargo/Cargo";
import DriversGrid from "./Components/Drivers/DriversGrid";

export default function App() {
  return (
    <Router>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            
            <Route path="/" element={<Private Component={<h1>home</h1>}/> }/>
            {/*<Route path="/cargoes" element={<Private Component={<Cargoes/>}/> }/>*/}
            <Route path="/cargoes" element={<Private Component={<Cargo/>}/> }/>
            {/*<Route path="/drivers" element={<Private Component={<Drivers/>}/> }/>*/}
            <Route path="/drivers" element={<Private Component={<DriversGrid/>}/> }/>

            <Route path="*" element={<PageNotFound/>}/>
            <Route path="heroes/:id" element={<h1>?</h1>}/>
        </Routes>
    </Router>
  );
};


