import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameState, purchaseNFT } from '../redux/gameReducer';
import { nftAssets } from '../redux/store';
import { GET_GAME_STATE, TRANSFER_NFT } from '../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';

const MetarealmsClashUI = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  const [selectedNFT, setSelectedNFT] = useState(null);

  const { loading, error, data } = useQuery(GET_GAME_STATE);
  const [transferNft] = useMutation(TRANSFER_NFT);

  useEffect(() => {
    if (data) {
      dispatch(fetchGameState(data.gameState));
    }
  }, [data, dispatch]);

  const handleNFTSelection = (nft) => {
    setSelectedNFT(nft);
  };

  const handleNFTPurchase = async () => {
    try {
      const result = await transferNft({ variables: { nftId: selectedNFT.id } });
      if (result.data.transferNFT.success) {
        dispatch(purchaseNFT(selectedNFT));
      }
    } catch (e) {
      console.error('Error purchasing NFT:', e);
    }
  };

  if (loading) return <p>Loading game state...</p>;
  if (error) return <p>Error loading game state: {error.message}</p>;

  return (
    <div id="metarealms-clash-container">
      <h1>Metarealms Clash</h1>
      <div id="gameContainer">
        {/* Game UI components go here */}
      </div>
      <div id="nftGallery">
        <h2>Select NFT</h2>
        {nftAssets.map((nft) => (
          <div key={nft.id} onClick={() => handleNFTSelection(nft)}>
            <img src={nft.image} alt={nft.name} />
            <p>{nft.name}</p>
          </div>
        ))}
        {selectedNFT && (
          <button onClick={handleNFTPurchase}>Purchase {selectedNFT.name}</button>
        )}
      </div>
    </div>
  );
};

export default MetarealmsClashUI;