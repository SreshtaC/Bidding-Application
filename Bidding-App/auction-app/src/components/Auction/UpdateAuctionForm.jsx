import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateAuctionForm = () => {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState({});
    const [updatedAuction, setUpdatedAuction] = useState({title: '', description: '', image: '', minBid: '', endDate: '', userEmail: ''});
    const [auctions, setAuctions] = useState([]);
    const userData = JSON.parse(localStorage.getItem('user'));
    const userEmail = userData.email; 
    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/auctions/${auctionId}`);
                const data = response.data;
                setAuction(data);
                setUpdatedAuction({
                  title: data.title,
                  description: data.description,
                  image: data.image,
                  minBid: data.minBid,
                  endDate: new Date(data.endDate).toISOString().split('T')[0],
                  userEmail: userEmail
                });
              } catch (error) {
                console.error(error);
              }
            };
        fetchAuction();
    }, [auctionId]);

  const handleUpdate = async (auctionId, updatedAuction) => {
    try {
        console.log(`Sending updated data: ${JSON.stringify(updatedAuction)}`);
        const response = await axios.put(`http://localhost:4000/api/auctions/${auctionId}`, updatedAuction);
      console.log(response.data)
      const updatedAuctions = auctions.map((auction) => (auction._id === auctionId ? response.data : auction));
      setAuctions(updatedAuctions);
      alert("Auction Updated Successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate(auction._id, updatedAuction);
  };

  const handleChange = (event) => {
    setUpdatedAuction({ ...updatedAuction, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={updatedAuction.title} onChange={handleChange} />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={updatedAuction.description} onChange={handleChange} />
      </label>
      <label>
        Image:
        <input type="text" name="image" value={updatedAuction.image} onChange={handleChange} />
      </label>
      <label>
        Min Bid:
        <input type="number" name="minBid" value={updatedAuction.minBid} onChange={handleChange} />
      </label>
      <label>
        End Date:
        <input type="date" name="endDate" value={updatedAuction.endDate} onChange={handleChange} />
      </label>
      <label>
        User Email:
        <input type="email" name="userEmail" value={updatedAuction.userEmail} onChange={handleChange} />
      </label>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateAuctionForm;