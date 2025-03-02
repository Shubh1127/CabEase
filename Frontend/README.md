# Uber Backend

This is the backend for the Uber-like application. It is built using Node.js, Express, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Captain Routes](#captain-routes)
  - [Ride Routes](#ride-routes)
  - [Map Routes](#map-routes)
- [Services](#services)
- [Models](#models)
- [Middlewares](#middlewares)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/uber-backend.git
    cd uber-backend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
API_KEY=your_google_maps_api_key