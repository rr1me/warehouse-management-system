import './App.sass';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Login from './Components/Login/Login';
import Private from "./Components/PrivateRoute/PrivateRoute";
import {PageNotFound} from "./Components/PageNotFound/PageNotFound";
import Cargo from "./Components/Cargo/Cargo";
import DriversGrid from "./Components/Drivers/DriversGrid";
import Transits from "./Components/Transits/Transits";
import TransitPage from "./Components/Transits/TransitPage/TransitPage";

// import 'overlayscrollbars/overlayscrollbars.css';
import {OverlayScrollbarsComponent} from "overlayscrollbars-react";
// import { OverlayScrollbars } from 'overlayscrollbars';

export default function App() {
  return (
          // <CompactRouter/>
    <CompactRouter/>
  );
};

const CompactRouter = () =>
    <Router>
        <Routes>
            <Route path="/login" element={<Login/>}/>

            <Route path="/" element={<Private Component={<h1>home</h1>}/> }/>
            <Route path="/cargo" element={<Private Component={<Cargo/>}/> }/>
            <Route path="/drivers" element={<Private Component={<DriversGrid/>}/> }/>

            <Route path="/transits" element={<Private Component={<Transits/>}/> }/>
            {["/transits/add", "/transits/:id"].map(path => (
                <Route key='transit' path={path} element={<Private Component={<TransitPage/>}/> }/>
            ))}

            <Route path="*" element={<PageNotFound/>}/>
            <Route path="heroes/:id" element={<h1>?</h1>}/>
        </Routes>
    </Router>



