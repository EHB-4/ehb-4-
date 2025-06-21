# EHB API Documentation

## Overview

The EHB API provides comprehensive endpoints for managing the EHB ecosystem.

## Authentication

All API requests require authentication using JWT tokens.

### Headers

```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

## Endpoints

### Health Check

```http
GET /api/health-check
```

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345.67,
  "memory": {
    "rss": 123456789,
    "heapTotal": 987654321,
    "heapUsed": 123456789
  },
  "database": "connected",
  "environment": "production"
}
```

### User Management

```http
GET /api/user/profile
POST /api/user/profile
PUT /api/user/profile
DELETE /api/user/profile
```

### Wallet Operations

```http
GET /api/wallet/balance
POST /api/wallet/transfer
GET /api/wallet/transactions
```

### Products

```http
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

## Error Handling

All errors follow a consistent format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error
