import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout'
import Home from './components/Home/Home'
import About from './components/About/About'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import LsLayout from './LsLayout'
import Logout from './components/Logout/Logout'
import Auctions from './components/Auction/Auctions'
import AucDisplay from './components/Auction/AucDisplay'
import MyAuctions from './components/Auction/MyAucs'
import MyBids from './components/Bids/MyBids'
import UpdateAuc from './components/Auction/UpdateAuctionForm'
import ProdPage from './components/Products/ProdPage'
import './index.css'
import { createBrowserRouter , createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />}/>
        <Route path="about" element={<About/>}/>
        <Route path="createauc" element={<Auctions/>}/>
        <Route path="auctions" element={<AucDisplay/>}/>
        <Route path="myaucs" element={<MyAuctions/>}/>
        <Route path="mybids" element={<MyBids/>}/>
        <Route path="update-auction/:auctionId" element={<UpdateAuc/>} />
        <Route path="product/:auctionItemId" element={<ProdPage />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
      <Route path='/login' element={<LsLayout/>}>
        <Route path='' element={<Login />}/>
      </Route>
      <Route path='/signup' element={<LsLayout/>}>
        <Route path='' element={<Signup />}/>
      </Route>
      <Route path='/logout' element={<LsLayout/>}>
        <Route path='' element={<Logout />}/>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
