# Bidding-Application

Bidding-Application is a web-based platform for creating and participating in auctions. Users can create auctions, place bids on items, and view auction details. The application consists of a React.js front end and a Node.js back end using Express.

### Features

- User authentication
- Create, update, display, and delete auctions
- Place bids on auction items
- View bid history for each item 
- Display user's own auctions and bids they have placed
- Auction status updates to 'completed' after the end date

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB or another database for storing auction data

### Backend Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/SreshtaC/Bidding-Application.git
   cd Bidding-Application
2. **Navigate to the backend directory:**
   ```sh
   cd backend
3. **Install required packages:**
   ```sh
   npm install
4. **Create a .env file in the backend directory and add your environment variables:**
   ```sh
   PORT=4000
   MONGODB_URI=<your-mongodb-uri>
5. **Start the backend server:**
   ```sh
   npm start
### Frontend Setup

1. **Navigate to the frontend directory:**
   ```sh
   cd ../frontend
2. **Install required packages:**
   ```sh
   npm install
3. **Start the frontend development server:**
   ```sh
   npm run dev
