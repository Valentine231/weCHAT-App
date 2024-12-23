import React, { useState, useEffect } from 'react';
import {
  createInitiator,
  useMessageStore,
  sendMessage,
} from './Connectionmanger';

import ChatHistory from './ChatHistory';
import MessageInput from './MessageInput';
import Profiles from './profile';
import { Box } from '@mui/material';

const Chat = () => {
  const messages = useMessageStore((state) => state.messages);
  const [peer, setPeer] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);

  useEffect(() => {
    const newPeer = createInitiator();

    newPeer.on('connect', () => {
      console.log('Peer connected');
      setIsConnected(true);
    });

    newPeer.on('close', () => {
      console.log('Peer disconnected');
      setIsConnected(false);
    });

    setPeer(newPeer);
  }, []);

  const handleSendMessage = (message) => {
    if (peer && isConnected) {
      sendMessage(peer, message);
    } else {
      console.error('Cannot send message: Peer is not connected');
    }
  };

  const handleProfileClick = (profileId) => {
    setActiveProfile(profileId);
    console.log(`Active profile ID: ${profileId}`);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Profiles onProfileClick={handleProfileClick} />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
        }}
      >
        <ChatHistory messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} disabled={!isConnected} />
      </Box>
    </Box>
  );
};

export default Chat;
