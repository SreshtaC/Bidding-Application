import logo from './pic.png'
import React from 'react'
import { Link } from "react-router-dom";

function Nav2(){
        return(
            <body>
            <header className="navbar2">
            <div className="logo">
                <Link to='/'><img className="img1" src={logo} alt="platform Logo" /></Link>
                <Link to='/'><h3>Genix Auctions</h3> </Link>
            </div>
            </header>
        </body>
    );
}

export default Nav2