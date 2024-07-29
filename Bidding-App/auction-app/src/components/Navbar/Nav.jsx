import logo from './pic.png'
import React from 'react'
import { Link } from 'react-router-dom'
import ProfileMenu from './ProfileMenu';

function Nav(){
    const succ=localStorage.getItem("user");
        return(
            <body>
            <header className="navbar">
            <div className="logo">
                <Link to='/'><img className="img1" src={logo} alt="platform Logo" /></Link>
                <Link to='/'><h3>Genix Auctions</h3> </Link>
            </div>
            <nav className="n1">
                <ul>
                    {!succ?(<>
                        <li className='navText'>
                            <Link to="/" > Home </Link>
                        </li>
                        <li className='navText'>
                            <Link to="/login" >Auctions</Link>
                        </li>
                    </>):(<>
                    <li className='navText'>
                <Link to='/createauc'><a> Auctions</a></Link>
                </li></>)}
                <li className='navText'>
                    <a>Bidding</a>
                </li>
                <li className='navText'>
                    <Link to="/about">
                    <a>About Us</a>
                    </Link>
                </li>
                {!succ?(<>
                    <li>
                    <Link to="/login">
                    <button className='lgnBtn'>Login</button>
                    </Link>
                </li>
                <li>
                    <Link to="/signup">
                    <button className="signBtn">Get Started</button>
                    </Link>
                </li>
                </>):(
                    <div>
                        <ProfileMenu/>
                    </div>
                )}
                
                </ul>
            </nav>
            </header>
        </body>
    );
}

export default Nav