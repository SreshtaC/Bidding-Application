import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProdPage.css'; // Assuming you have a CSS file for styling

function ProdPage() {
  const { auctionItemId } = useParams();
  const [auctionItem, setAuctionItem] = useState({});
  const [bidAmount, setBidAmount] = useState('');
  const [bidHistory, setBidHistory] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));
  const userEmail = userData.email;

  useEffect(() => {
    fetchAuctionItem();
    fetchBidHistory();
  }, []);

  const fetchAuctionItem = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/auctions/${auctionItemId}`);
      setAuctionItem(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchBidHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/bids/history/${auctionItemId}`);
      setBidHistory(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBidChange = (event) => {
    setBidAmount(event.target.value);
  };

  const placeBid = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/api/bids/placeBid/${auctionItemId}`, {
        auctionItemId, bidAmount, userEmail
      });
      alert("Bid Placed Successfully!");
      navigate('/auctions');
      fetchAuctionItem(); // Update the auction item with the new bid
      fetchBidHistory(); // Update the bid history
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="prod-page">
      {error && <p className="error-message">{error}</p>}
      <div className="auction-details">
        <h1>{auctionItem.title}</h1>
        <p>{auctionItem.description}</p> <br/>
        <img src={auctionItem.image} alt={auctionItem.title} className="auction-image" />
        <p>Current Bid: {auctionItem.currentBid}</p>
        <p>Minimum Bid: {auctionItem.minBid}</p>
        <form onSubmit={placeBid} className="bid-form">
          <input
            type="number"
            value={bidAmount}
            onChange={handleBidChange}
            placeholder="Enter your bid"
            className="bid-input"
          />
          <button type="submit" className="bid-button">Place Bid</button>
        </form>
      </div>
      <div className="bid-history">
        <h2>Bid History</h2>
        <ul>
          {bidHistory.map((bid, index) => (
            <li key={index}>
                <p><strong>{bid.bidderId.name}</strong> bid Rs. {bid.bidAmount} on {new Date(bid.bidTime).toLocaleString()}</p>
                </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProdPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams , useNavigate} from 'react-router-dom';

// function ProdPage() {
//     const { auctionItemId } = useParams();
//     const [auctionItem, setAuctionItem] = useState({});
//     const [bidAmount, setBidAmount] = useState('');
//     const [error, setError] = useState(null);
//     const navigate=useNavigate();
//     const userData = JSON.parse(localStorage.getItem('user'));
//     const userEmail = userData.email; 
//     useEffect(() => {
//         fetchAuctionItem();
//       }, []);

//       const fetchAuctionItem = async () => {
//         try {
//           const response = await axios.get(`http://localhost:4000/api/auctions/${auctionItemId}`);
//           setAuctionItem(response.data);
//           console.log(response.data);
//         } catch (error) {
//           setError(error.message);
//         }
//       };
//       const handleBidChange = (event) => {
//         setBidAmount(event.target.value);
//       };
    
//       const placeBid = async (event) => {
//         event.preventDefault();
//         try {
//           const response = await axios.post(`http://localhost:4000/api/bids/placeBid/${auctionItemId}`, {
//             auctionItemId, bidAmount, userEmail});
//           alert("Bid Placed Successfully!");
//           navigate('/auctions');
//           // Update the auction item with the new bid
//           fetchAuctionItem();
//         } catch (error) {
//                 alert(error.response.data.error);
//         }
//       };
    
//       return (
//         <div>
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//           <h1>{auctionItem.title}</h1>
//           <p>{auctionItem.description}</p>
//           <img src={auctionItem.image} alt={auctionItem.title} />
//           <p>Current Bid: {auctionItem.currentBid}</p>
//           <p>Minimum Bid: {auctionItem.minBid}</p>
//           <form onSubmit={placeBid}>
//             <input
//               type="number"
//               value={bidAmount}
//               onChange={handleBidChange}
//               placeholder="Enter your bid"
//             />
//             <button type="submit">Place Bid</button>
//           </form>
//         </div>
//       );
//   }

// export default ProdPage;