import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfile } from '../redux/userReducer';
import { authenticateUser } from '../redux/authActions';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER_PROFILE } from '../graphql/mutations';

const ButlerUI = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userProfile);
  const [updateProfile] = useMutation(UPDATE_USER_PROFILE);
  const [voiceCommand, setVoiceCommand] = useState('');

  useEffect(() => {
    // This would be replaced with actual voice recognition logic
    const handleVoiceCommand = command => {
      setVoiceCommand(command);
    };

    // Placeholder for voice command listener setup
    // voiceCommandListener.on('command', handleVoiceCommand);

    return () => {
      // Cleanup voice command listener
      // voiceCommandListener.off('command', handleVoiceCommand);
    };
  }, []);

  const handleVoiceCommandSubmit = async () => {
    try {
      // Here we would have logic to process the voice command
      // For example, updating the user profile, setting reminders, etc.
      const result = await updateProfile({ variables: { command: voiceCommand } });
      if (result.data) {
        dispatch(authenticateUser(result.data.updateUserProfile));
      }
    } catch (error) {
      console.error('Error processing voice command:', error);
    }
  };

  return (
    <div className="butler-ui">
      <h1>Welcome, {user.name}</h1>
      <p>Butler at your service. What can I do for you today?</p>
      <input
        type="text"
        value={voiceCommand}
        onChange={e => setVoiceCommand(e.target.value)}
        placeholder="Say something..."
      />
      <button onClick={handleVoiceCommandSubmit}>Submit Command</button>
    </div>
  );
};

export default ButlerUI;