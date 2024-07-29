# **API Endpoints**
### Client-Side API Interaction

From the client side, API calls are made using the `axios` library, which provides a simple and convenient API for making HTTP requests. The following methods are used for interacting with the server:

- **GET**: Retrieves data from the server.
- **POST**: Sends data to the server to create or update resources.
- **PUT**: Updates existing resources on the server.
- **DELETE**: Removes resources from the server.

## User Authentication
- **POST /api/users/signup**
  - **Description**: Registers a new user with the provided details.
  - **Request Body**:
    - `name` (string): User's first name.
    - `lname` (string): User's last name.
    - `email` (string): User's email address.
    - `password` (string): User's password.
  - **Response**: Details of the newly created user, or an error message if the registration fails.

- **POST /api/users/login**
  - **Description**: Authenticates a user using their email and password.
  - **Request Body**:
    - `email` (string): User's email address.
    - `password` (string): User's password.
  - **Response**: Authentication status, possibly including a token for session management, or an error message if authentication fails.

## Auction Item Management
- **POST /api/auctions/createAuc**
  - **Description**: Creates a new auction item with the provided details.
  - **Request Body**:
    - `title` (string): Title of the auction item.
    - `description` (string): Description of the auction item.
    - `minBid` (number): Minimum bid amount.
    - `image` (string): URL or path to the auction item's image.
    - `endDate` (string): End date and time of the auction (ISO 8601 format).
    - `userEmail` (string): Email of the user creating the auction.
  - **Response**: Details of the newly created auction item, or an error message if creation fails.

- **GET /api/auctions/getAuc**
  - **Description**: Retrieves all active auction items.
  - **Response**: An array of auction items, each containing details such as title, description, minimum bid, image, end date, and status.

- **GET /api/auctions/:itemId**
  - **Description**: Retrieves details of a specific auction item by its ID.
  - **URL Parameter**:
    - `itemId` (string): The ID of the auction item.
  - **Response**: Details of the specified auction item, or an error message if the item is not found.

- **PUT /api/auctions/:itemId**
  - **Description**: Updates details of a specific auction item.
  - **URL Parameter**:
    - `itemId` (string): The ID of the auction item to update.
  - **Request Body**:
    - `title` (string, optional): Updated title of the auction item.
    - `description` (string, optional): Updated description of the auction item.
    - `minBid` (number, optional): Updated minimum bid amount.
    - `image` (string, optional): Updated URL or path to the auction item's image.
    - `endDate` (string, optional): Updated end date and time of the auction.
  - **Response**: Updated details of the auction item, or an error message if the update fails.

- **DELETE /api/auctions/:itemId**
  - **Description**: Deletes a specific auction item by its ID.
  - **URL Parameter**:
    - `itemId` (string): The ID of the auction item to delete.
  - **Response**: Confirmation of deletion or an error message if the deletion fails.

## Bidding Functionality
- **POST /api/bids/placeBid/:itemId**
  - **Description**: Places a bid on a specific auction item.
  - **URL Parameter**:
    - `itemId` (string): The ID of the auction item to bid on.
  - **Request Body**:
    - `bidAmount` (number): The amount of the bid.
    - `userEmail` (string): Email of the user placing the bid.
  - **Response**: Updated auction item with the new bid, or an error message if the bid cannot be placed.

- **GET /api/bids/history/:itemId**
  - **Description**: Retrieves the bid history for a specific auction item.
  - **URL Parameter**:
    - `itemId` (string): The ID of the auction item.
  - **Response**: An array of bids placed on the auction item, including details such as bid amount, user email, and timestamp.

- **GET /api/bids/myBids/:userEmail**
  - **Description**: Retrieves all bids placed by a specific user.
  - **URL Parameter**:
    - `userEmail` (string): Email of the user whose bids are being retrieved.
  - **Response**: An array of bids placed by the user, including details such as auction item ID, bid amount, and timestamp.
