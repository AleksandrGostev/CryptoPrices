# Crypto prices

This project is a web application designed to allow users to view and compare cryptocurrency prices. It consists of a **frontend** built with React and a **backend** built with Node.js and Express.

## Features
- Fetch and display cryptocurrency prices
- Compare prices across different cryptocurrencies
- API integration to fetch the latest prices and trends (implemented only CoinGecko API)

---

## Getting Started

### Prerequisites
- **Node.js**: Ensure Node.js is installed on your system.
- **NPM/Yarn**: For managing dependencies in both frontend and backend projects.
- **Docker**: Required if you want to containerize and run the application in a Docker environment.
- **Docker Compose**: To manage and orchestrate multi-container Docker applications, such as this frontend and backend setup.


### Installation

1. **Check Port Availability**:  
   Ensure that ports **3000**, **8000**, and **5432** are available on your machine, as they will be used by the frontend, backend, and database.

2. **Clone the Repository**:  
   ```bash
   git clone https://github.com/AleksandrGostev/CryptoPrices.git
   cd CryptoPrices

3. **Edit Environment Variables**:  
   Before running the application, make sure to edit the environment variable COIN_GECKO_API_KEY in the `docker-compose.yml`

4. **Run Docker Compose**:  
   Start the application using Docker Compose to set up both frontend and backend containers:
   ```bash
   docker-compose up --build [ --force-recreate ]

### Access the Application
- Once the backend, frontend and postgres are running, you can access the site at: http://localhost:3000

### Improvements
* Better error handling (show meaningful error messages for users)
* Better typings, especially for external api calls
* Possibility to integrate other cryptocurrency providers
* Add caching to external providers API endpoints
* Implement different currencies, currently only USD by default
* Admin panel to add / remove coins supported by the system
* Overall UI/UX could be improved
* Frontend tests
* Serve frontend over nginx with production build
* Replace in-memory cache with redis
