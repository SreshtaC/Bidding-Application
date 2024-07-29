import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        const userEmail = userData.email; 
        try {
          const response = await axios.get(`http://localhost:4000/api/bids/myBids/${userEmail}`);
          console.log('API response:', response.data);
          if (!Array.isArray(response.data)) {
            console.error('API response is not an array:', response.data);
          } else {
            setBids(response.data);
          }
        } catch (error) {
          console.error('API error:', error);
        } finally {
          setLoading(false); 
        }
      };
      fetchBids();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bid-container">
      <div><h1>My Bids</h1></div>
      {Array.isArray(bids) ? (
        bids.map((bid) => (
          <div key={bid._id}>
            <p>You bid ${bid.bidAmount} on {bid.auction.title} on {new Date(bid.createdAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No bids available</p>
      )}
    </div>
  );
  
};

export default MyBids;