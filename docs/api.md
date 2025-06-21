# API Documentation

## Overview

This document describes the API endpoints available in the EHB Next.js 04 application.

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Users

#### GET /api/users

Get all users (admin only)

#### POST /api/users

Create a new user

#### GET /api/users/[id]

Get user by ID

#### PUT /api/users/[id]

Update user

#### DELETE /api/users/[id]

Delete user

### Products

#### GET /api/products

Get all products

#### POST /api/products

Create a new product

#### GET /api/products/[id]

Get product by ID

#### PUT /api/products/[id]

Update product

#### DELETE /api/products/[id]

Delete product

### Orders

#### GET /api/orders

Get all orders

#### POST /api/orders

Create a new order

#### GET /api/orders/[id]

Get order by ID

#### PUT /api/orders/[id]

Update order status

### Authentication

#### POST /api/auth/login

User login

#### POST /api/auth/register

User registration

#### POST /api/auth/logout

User logout

#### GET /api/auth/me

Get current user

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

## Success Responses

Successful responses follow this format:

```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```
