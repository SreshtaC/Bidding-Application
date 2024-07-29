import PropTypes from 'prop-types'
import './Card.css'
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';


function Card({ auctionId, imageUrl, productName, minBid, currBid, timeLeft, showBidButton = true }) {
  const isExpired = timeLeft === 'Expired' || timeLeft === 'Auction has ended';
  const succ = JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isExpired) {
      const parts = timeLeft.split(' ');
      setDays(parseInt(parts[0].replace('d', ''), 10));
      setHours(parseInt(parts[1].replace('h', ''), 10));
      setMinutes(parseInt(parts[2].replace('m', ''), 10));
      setSeconds(parseInt(parts[3].replace('s', ''), 10));
    }
  }, [timeLeft, isExpired]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else if (days > 0) {
        setDays(days - 1);
        setHours(23);
        setMinutes(59);
        setSeconds(59);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [days, hours, minutes, seconds]);

  const handleBidNow = () => {
    if (!succ) {
      navigate('/login');
    } else {
      console.log(auctionId);
      navigate(`/product/${auctionId}`);
    }
  };
    return (
      <div className={`auction-card ${isExpired ? 'expired' : ''}`}>
        <img src={imageUrl} alt={productName} className="product-image" />
        {!isExpired && (<div className="live-auction">Live Auction</div>)}
        <h3 className="product-name">{productName}</h3>
        <p className="starting-bid">Starting Bid: ₹ {minBid}</p>
        <p className="current-bid">Current Bid: ₹ {currBid}</p>
        <p className="time-left">
          {isExpired ? timeLeft : `Ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`}
        </p>
        {showBidButton && !isExpired &&(
        <button className="bid-now-button" onClick={handleBidNow}>
          Bid Now
        </button>
      )}
      </div>
    );
  }

  Card.propTypes = {
    imageUrl:PropTypes.string,
    productName:PropTypes.string,
    minBid:PropTypes.number,
    currBid:PropTypes.number,
}

const getTimeRemaining = (timeLeft) => {
  if (timeLeft === 'Expired' || timeLeft === 'Auction has ended') {
    return 0;
  }

  const parts = timeLeft.split(' ');
  const days = parseInt(parts[0].replace('d', ''), 10);
  const hours = parseInt(parts[1].replace('h', ''), 10);
  const minutes = parseInt(parts[2].replace('m', ''), 10);
  const seconds = parseInt(parts[3].replace('s', ''), 10);

  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
};

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

Card.defaultProps = {
  imageUrl:"Image url not valid",
  productName:"x",
  minBid:0,
  currBid:0,
}

  export default Card;