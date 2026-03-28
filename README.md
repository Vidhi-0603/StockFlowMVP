# StockFlow MVP -- SaaS Inventory Management System
------------------------------------------------------------------------

## 📌 Overview

StockFlow MVP is a minimal SaaS-based inventory management system built
within a 6-hour technical assessment. It allows users to manage
products, track inventory, and monitor low stock items.

------------------------------------------------------------------------

## ✨ Features

### 🔐 Authentication

-   User Signup (Email, Password, Organization Name)
-   Login with JWT Authentication
-   Organization-based data isolation (multi-tenant)

### 📦 Product Management

-   Create, Read, Update, Delete (CRUD) products
-   Fields:
    -   Name
    -   SKU (unique per organization)
    -   Quantity
    -   Cost Price
    -   Selling Price
    -   Low Stock Threshold

### 📊 Dashboard

-   Total number of products
-   Total inventory quantity
-   Low stock products list

### ⚙️ Settings

-   Global default low stock threshold
-   Used when product threshold is not set

------------------------------------------------------------------------

## 🧠 Tech Stack

### Frontend

-   React (Vite)
-   Axios
-   React Router

### Backend

-   Node.js
-   Express.js
-   Prisma ORM

### Database

-   PostgreSQL (Neon)

### Deployment

-   Frontend: Vercel
-   Backend: Render

------------------------------------------------------------------------

## 🗂️ Project Structure

    /frontend
      /src
        /components
        /pages
        axiosInstance.js

    /backend
      /src
        /routes
        prismaClient.js
      prisma/schema.prisma

------------------------------------------------------------------------

## ⚙️ Setup Instructions

### 1. Clone Repository

    git clone <repo-url>
    cd project-folder

------------------------------------------------------------------------

### 2. Backend Setup

    cd backend
    npm install

Create `.env`:

    DATABASE_URL=your_database_url
    JWT_KEY=your_secret_key

Run:

    npx prisma db push
    npx prisma generate
    npm run dev

------------------------------------------------------------------------

### 3. Frontend Setup

    cd frontend
    npm install

Create `.env`:

    VITE_BASE_URL=http://localhost:5000

Run:

    npm run dev

------------------------------------------------------------------------

## 🌐 Deployment

### Backend (Render)

-   Build Command:

        npm install && npx prisma generate

-   Start Command:

        npm start

### Frontend (Vercel)

-   Set environment variable:

        VITE_BASE_URL=https://your-backend-url.onrender.com

------------------------------------------------------------------------

## 🔒 Authentication Flow

1.  User logs in → receives JWT token

2.  Token stored in localStorage

3.  Axios interceptor attaches:

        Authorization: Bearer <token>

4.  Backend verifies token using JWT

------------------------------------------------------------------------

## ⚠️ Key Design Decisions

-   Multi-tenant architecture using `organizationId`
-   Prisma ORM for fast schema iteration
-   JWT-based authentication
-   Centralized dashboard state for consistency

------------------------------------------------------------------------

## 🧪 Testing

-   Signup/Login flow
-   Product CRUD
-   Dashboard metrics
-   Low stock logic
-   Deployment validation

------------------------------------------------------------------------

## 📌 Future Improvements

-   Role-based access control
-   Product categories & images
-   Stock movement history
-   Pagination & search optimization

------------------------------------------------------------------------

## 👩‍💻 Author

Vidhilika Gupta

------------------------------------------------------------------------

## 📬 Notes

This project was developed as part of a time-bound technical assessment
focusing on real-world SaaS application development.
