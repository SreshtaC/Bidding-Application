import React from 'react'
import '../Card/Card.css'
import '../Auction/AucDisplay'
import AucDisplay from '../Auction/AucDisplay';


function Home() {
  const succ = JSON.parse(localStorage.getItem("user"));
  console.log(succ)
  return (
    <>
    {succ?(<><div><h1>Welcome {succ.name}</h1></div></>):(<><div><h1>Explore Auctions</h1></div></>)}
    <div className='auction-container'>
    <AucDisplay/>
    </div>
    </>
  )
}

export default Home