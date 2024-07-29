import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import { calculateTimeLeft } from '../utils/timeUtils';

  function AucDisplay() {
    const [auctions, setAuctions] = useState([]);
  
    useEffect(() => {
      const fetchAuctions = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/auctions/getAuc');
          console.log('API response:', response.data);
          if (!Array.isArray(response.data)) {
            console.error('API response is not an array:', response.data);
          } else {
            setAuctions(response.data);
          }
        } catch (error) {
          console.error('API error:', error);
        }
      };
  
      fetchAuctions();
    }, []);

  return (
    <div className='auction-container'>
      {Array.isArray(auctions) ? (
      auctions.map(auction => (
        <Card
          key={auction._id}
          auctionId={auction._id}
          imageUrl={auction.image}
          productName={auction.title}
          minBid={auction.minBid}
          currBid={auction.currentBid}
          timeLeft={calculateTimeLeft(auction.endDate)}
        />
      ))
    ) : (
      <p>No auctions available</p>
    )}
    </div>
  );
}

export default AucDisplay;