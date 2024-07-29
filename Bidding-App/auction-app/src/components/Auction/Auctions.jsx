import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auctions.css';


function Auctions() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [minBid, setMinBid] = useState(0);
  const [image, setImage] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('user'));
    const userEmail = userData.email;   
    try {
        const response = await axios.post('http://localhost:4000/api/auctions/createAuc', { title, description, minBid, image, endDate, userEmail});
        const data = response.data;
        if (data.message.includes('created successfully') || response.status === 201) {
          navigate('/auctions'); 
        } else {
          alert('Error creating auction');
        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className="auctions-container">
      <h1>Create Auction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Minimum Bid:
          <input type="number" value={minBid} onChange={(e) => setMinBid(e.target.value)} />
        </label>
        <br />
        <label>
          Image URL:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <br />
        <label>
          Set End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <br />
        <button type="submit">Create Auction</button>
      </form>
    </div>
  );
}

export default Auctions;