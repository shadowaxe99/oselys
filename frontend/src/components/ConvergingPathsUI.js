import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { userProfile } from '../redux/userReducer';
import { nftGallery } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const ConvergingPathsUI = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(createStructuredSelector({ user: userProfile }));
  const [virtualSpace, setVirtualSpace] = useState(null);

  // Fetch NFT gallery data
  const { loading, error, data } = useQuery(nftGallery, {
    variables: { userId: user.id },
  });

  useEffect(() => {
    if (data) {
      setVirtualSpace(data.nftGallery);
    }
  }, [data]);

  if (loading) return <p>Loading virtual experiences...</p>;
  if (error) return <p>Error loading virtual experiences: {error.message}</p>;

  return (
    <div id="convergingPathsContainer">
      <h1>Welcome to Converging Paths</h1>
      <p>Explore collaborative virtual experiences and create shared memories.</p>
      <div id="virtualSpace">
        {virtualSpace ? (
          virtualSpace.map((space, index) => (
            <div key={index} className="virtualSpaceItem">
              <h3>{space.title}</h3>
              <p>{space.description}</p>
              {/* Placeholder for virtual space rendering */}
              <div className="virtualSpaceRender">Virtual Space Render</div>
            </div>
          ))
        ) : (
          <p>No virtual experiences available. Start creating one now!</p>
        )}
      </div>
    </div>
  );
};

export default ConvergingPathsUI;