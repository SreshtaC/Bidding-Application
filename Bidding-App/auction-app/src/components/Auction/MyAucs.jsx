import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Card/Card.css'
import Card from '../Card/Card';
import { calculateTimeLeft } from '../utils/timeUtils';
import { useNavigate } from 'react-router-dom';

const MyAucs = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        const userEmail = userData.email; 
        try {
          const response = await axios.get(`http://localhost:4000/api/auctions/myAucs/${userEmail}`);
          console.log('API response:', response.data);
          if (!Array.isArray(response.data)) {
            console.error('API response is not an array:', response.data);
          } else {
            setAuctions(response.data);
          }
        } catch (error) {
          console.error('API error:', error);
        } finally {
          setLoading(false); 
        }
      };
      fetchAuctions();
  }, []);

  const handleDelete = async (auctionId) => {
    try {
      await axios.delete(`http://localhost:4000/api/auctions/${auctionId}`);
      const updatedAuctions = auctions.filter((auction) => auction._id !== auctionId);
      setAuctions(updatedAuctions);
      alert('Auction Item Deleted Successfully!')
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="auction-container">
      <div><h1>My Auctions</h1></div>
      {Array.isArray(auctions) ? (
        auctions.map((auction) => {
          const timeLeft = calculateTimeLeft(auction.endDate);
          const isExpired = timeLeft <= 0;

          return (
            <div key={auction._id} className={`auction-card-wrapper ${isExpired ? 'expired' : ''}`}>
              <Card
                auctionId={auction._id}
                imageUrl={auction.image}
                productName={auction.title}
                minBid={auction.minBid}
                currBid={auction.currentBid}
                timeLeft={isExpired ? 'Expired' : timeLeft}
                showBidButton={false}
              />
              <div className="auction-actions">
                <button onClick={() => navigate(`/update-auction/${auction._id}`)}>Update</button>
                <button onClick={() => handleDelete(auction._id)}>Delete</button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No auctions available</p>
      )}
    </div>
  );
  
};

export default MyAucs;