import React, { useState } from 'react';
import './Profile.css'
import { Link } from 'react-router-dom';

function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const succ = JSON.parse(localStorage.getItem("user"));
  console.log(succ)

  return (
    <div className="profile-container">
      <button className="profile-button" onClick={toggleMenu}>
        <img src="https://i.imgur.com/s831G6W.jpg" alt="Profile Picture" />
      </button>
      {isOpen && (
        <ul className="profile-menu">
          {succ?(<>
            <li>{succ.name} </li>
            <li>{succ.email}</li>
            </>):
            (<></>)}
          <li> View profile </li>
          <li> Settings </li>
          <Link to='/mybids'><li> My bids </li></Link>
          <li> Credit cards </li>
          <Link to='/myaucs'> <li> My Auctions </li> </Link>
          <li> Invite colleagues </li>
          <li> Notifications </li>
          <li> Community </li>
          <li> Support </li>
          <li> API </li>
            <Link to='/logout'>
            <li>Log out</li>
            </Link>
        </ul>
      )}
    </div>
  );
}

export default ProfileMenu;