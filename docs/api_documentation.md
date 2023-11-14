# Elysium OS API Documentation

Welcome to the Elysium OS API documentation. This document provides detailed information about the API endpoints, request/response formats, and usage examples for developers integrating with Elysium OS.

## Authentication

### Login

**POST** `/api/auth/login`

Authenticates a user and returns an `authToken`.

**Request:**
```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userProfile": {
    "id": "123",
    "username": "user@example.com",
    // Additional user profile fields
  }
}
```

### Register

**POST** `/api/auth/register`

Registers a new user and returns an `authToken`.

**Request:**
```json
{
  "username": "newuser@example.com",
  "password": "newpassword123",
  "email": "newuser@example.com"
}
```

**Response:**
```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userProfile": {
    "id": "124",
    "username": "newuser@example.com",
    // Additional user profile fields
  }
}
```

## User Profile

### Get User Profile

**GET** `/api/users/{userId}`

Retrieves the profile of the authenticated user.

**Response:**
```json
{
  "userProfile": {
    "id": "123",
    "username": "user@example.com",
    // Additional user profile fields
  }
}
```

### Update User Profile

**PUT** `/api/users/{userId}`

Updates the profile of the authenticated user.

**Request:**
```json
{
  "email": "updateduser@example.com",
  // Additional fields to update
}
```

**Response:**
```json
{
  "userProfile": {
    "id": "123",
    "username": "updateduser@example.com",
    // Additional updated user profile fields
  }
}
```

## The Arena

### Get Game State

**GET** `/api/games/{gameId}`

Retrieves the current state of a game session.

**Response:**
```json
{
  "gameState": {
    "id": "game123",
    "players": [
      // Array of player objects
    ],
    // Additional game state fields
  }
}
```

## Automation Station

### Create Automation Task

**POST** `/api/automations`

Creates a new automation task.

**Request:**
```json
{
  "name": "Backup Task",
  "script": "const backup = () => { /* Backup logic */ }; backup();",
  // Additional automation task fields
}
```

**Response:**
```json
{
  "automationScripts": [
    {
      "id": "auto123",
      "name": "Backup Task",
      // Additional automation task fields
    },
    // Additional automation scripts
  ]
}
```

## Marketplace

### List Marketplace Items

**GET** `/api/marketplace`

Lists items available in the Marketplace.

**Response:**
```json
{
  "marketplaceItems": [
    {
      "id": "item123",
      "name": "Pro Editing Software",
      "price": 299.99,
      // Additional marketplace item fields
    },
    // Additional marketplace items
  ]
}
```

### Purchase NFT

**POST** `/api/nfts/purchase`

Handles the purchase of an NFT.

**Request:**
```json
{
  "nftId": "nft123",
  "buyerId": "user123"
}
```

**Response:**
```json
{
  "nftAssets": [
    {
      "id": "nft123",
      "ownerId": "user123",
      // Additional NFT fields
    },
    // Additional NFT assets
  ]
}
```

This API documentation is a starting point for developers to understand how to interact with Elysium OS's backend services. For more detailed information, please refer to the `developer_guide.md`, `user_manual.md`, and other relevant documentation.