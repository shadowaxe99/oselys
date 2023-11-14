import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    userProfile(userId: $userId) {
      id
      username
      email
      profilePicture
      bio
      createdGames {
        id
        title
        description
        createdAt
      }
      automationScripts {
        id
        name
        description
        createdAt
      }
      nftAssets {
        id
        title
        description
        imageUri
        owner
        createdAt
      }
    }
  }
`;

export const GET_GAME_STATE = gql`
  query GetGameState($gameId: ID!) {
    gameState(gameId: $gameId) {
      id
      title
      description
      players {
        id
        username
      }
      state
      createdAt
      updatedAt
    }
  }
`;

export const GET_MARKETPLACE_ITEMS = gql`
  query GetMarketplaceItems {
    marketplaceItems {
      id
      title
      description
      price
      imageUri
      seller {
        id
        username
      }
      createdAt
    }
  }
`;

export const GET_AUTOMATION_SCRIPTS = gql`
  query GetAutomationScripts($userId: ID!) {
    automationScripts(userId: $userId) {
      id
      name
      description
      script
      createdAt
    }
  }
`;

export const GET_NFT_ASSETS = gql`
  query GetNFTAssets {
    nftAssets {
      id
      title
      description
      imageUri
      owner {
        id
        username
      }
      createdAt
    }
  }
`;