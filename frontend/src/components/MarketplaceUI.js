import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MARKETPLACE_ITEMS, TRANSFER_NFT } from '../graphql/mutations';
import { nftGallery } from '../redux/store';

const MarketplaceUI = () => {
  const [marketplaceItems, setMarketplaceItems] = useState([]);
  const { data, loading, error } = useQuery(GET_MARKETPLACE_ITEMS);
  const [transferNFT] = useMutation(TRANSFER_NFT);

  useEffect(() => {
    if (data) {
      setMarketplaceItems(data.marketplaceItems);
    }
  }, [data]);

  const handlePurchase = async (itemId) => {
    try {
      const { data } = await transferNFT({ variables: { itemId } });
      if (data.transferNFT.success) {
        alert('NFT purchased successfully!');
        // Update local state or refetch query to reflect the new purchase
      } else {
        alert('Purchase failed. Please try again.');
      }
    } catch (e) {
      console.error('Error purchasing NFT:', e);
      alert('An error occurred during the purchase. Please try again.');
    }
  };

  if (loading) return <p>Loading marketplace items...</p>;
  if (error) return <p>Error loading marketplace items: {error.message}</p>;

  return (
    <div id={nftGallery}>
      <h2>Marketplace</h2>
      <div className="marketplace-items">
        {marketplaceItems.map((item) => (
          <div key={item.id} className="marketplace-item">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button onClick={() => handlePurchase(item.id)}>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceUI;