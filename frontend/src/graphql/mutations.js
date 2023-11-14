import { gql } from '@apollo/client';

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($userId: ID!, $profileData: UserProfileInput!) {
    updateUserProfile(userId: $userId, profileData: $profileData) {
      id
      username
      email
      bio
      avatarUrl
    }
  }
`;

export const CREATE_AUTOMATION_SCRIPT = gql`
  mutation CreateAutomationScript($userId: ID!, $scriptData: AutomationInput!) {
    createAutomationScript(userId: $userId, scriptData: $scriptData) {
      id
      name
      description
      script
      createdAt
    }
  }
`;

export const LIST_MARKETPLACE_ITEMS = gql`
  mutation ListMarketplaceItems($itemData: MarketplaceItemInput!) {
    listMarketplaceItems(itemData: $itemData) {
      id
      name
      description
      price
      owner {
        id
        username
      }
      createdAt
    }
  }
`;

export const PURCHASE_NFT = gql`
  mutation PurchaseNFT($nftId: ID!, $buyerId: ID!) {
    purchaseNFT(nftId: $nftId, buyerId: $buyerId) {
      transactionId
      nft {
        id
        title
        owner {
          id
          username
        }
      }
      buyer {
        id
        username
      }
      purchaseDate
    }
  }
`;

export const TRANSFER_NFT = gql`
  mutation TransferNFT($nftId: ID!, $newOwnerId: ID!) {
    transferNFT(nftId: $nftId, newOwnerId: $newOwnerId) {
      transactionId
      nft {
        id
        title
        owner {
          id
          username
        }
      }
      newOwner {
        id
        username
      }
      transferDate
    }
  }
`;

export const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      authToken
      user {
        id
        username
        email
      }
    }
  }
`;