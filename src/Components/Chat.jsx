import React, { useState, useEffect } from 'react';
import {
  createInitiator,
  createResponder,
  useMessageStore,
  useSignalingStore,
} from './Connectionmanger';

import ChatHistory from './ChatHistory';
import MessageInput from './MessageInput';
import Profiles from './profile';
import { Box, Button, TextField } from '@mui/material';

const Chat = () => {
  const messages = useMessageStore((state) => state.messages);
  const [peer, setPeer] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);
  const [role, setRole] = useState(); // 'initiator' or 'responder'
  const [signalData, setSignalData] = useState(''); // Signal data input field
  const [isResponder, setIsResponder] = useState(false); // Flag to toggle between initiator and responder mode

  const { setSignalData: updateSignalData } = useSignalingStore.getState();

  // useEffect(() => {
  //   let newPeer;

  //   if (role === 'initiator') {
  //     // Initiator logic
  //     newPeer = createInitiator();

  //     newPeer.on('signal', (data) => {
  //       console.log('Initiator signal data:', data);
  //       updateSignalData(data); // Save signal data to signaling store
  //       setSignalData(JSON.stringify(data)); // Set signal data to state for copying
  //     });
  //   } else if (role === 'responder' && signalData) {
  //     // Responder logic: Wait for initiator signal
  //     newPeer = createResponder(JSON.parse(signalData));
  //   }

  //   if (newPeer) {
  //     // General event handlers
  //     newPeer.on('connect', () => {
  //       console.log('Peer connected');
  //       setIsConnected(true);
  //     });

  //     newPeer.on('data', (data) => {
  //       const message = data.toString();
  //       console.log('Received message:', message);
  //       useMessageStore.getState().addMessage({ type: 'received', text: message });
  //     });

  //     setPeer(newPeer);
  //   }

  //   return () => {
  //     if (newPeer) {
  //       newPeer.destroy(); // Cleanup peer instance
  //     }
  //   };
  // }, [role, signalData]);

  useEffect(() => {
    let newPeer;

    if (role === 'initiator') {
      newPeer = createInitiator();

      newPeer.on('signal', (data) => {
        updateSignalData(data);
        setSignalData(JSON.stringify(data));
      });
    } else if (role === 'responder' && signalData) {
      newPeer = createResponder(JSON.parse(signalData));
    }

    if (newPeer) {
      newPeer.on('connect', () => {
        setIsConnected(true);
      });

      newPeer.on('data', (data) => {
        const message = data.toString();
        useMessageStore.getState().addMessage({ type: 'received', text: message });
      });

      setPeer(newPeer);
    }

    return () => {
      if (newPeer) {
        newPeer.destroy();
      }
    };
  }, [role, signalData]);

  const handleSendMessage = (message) => {
    if (peer && isConnected) {
      try {
        peer.send(message); // Send message via peer's data channel
        console.log('Message sent:', message);
        useMessageStore.getState().addMessage({ type: 'sent', text: message });
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    } else {
      console.error('Cannot send message: Peer is not connected');
    }
  };

  const handleProfileClick = (profileId) => {
    setActiveProfile(profileId);
    console.log(`Active profile ID: ${profileId}`);
    // Simulate a condition to switch between roles
    setRole(profileId % 2 === 0 ? 'initiator' : 'responder');
  };

  const handleSignalPaste = () => {
    try {
      const parsedData = JSON.parse(signalData);
      if (parsedData.type === 'offer') {
        const responderPeer = createResponder(parsedData);
        setPeer(responderPeer);
      } else {
        console.error('Invalid signal data type. Expected "offer".');
      }
    } catch (error) {
      console.error('Invalid signaling data format:', error);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens, horizontally on larger ones
        height: '100vh',
      }}
    >
      {/* Profiles Sidebar */}
      <Box
        sx={{
          width: { xs: '100%', sm: 250 }, // Full width on mobile, fixed width on larger screens
          backgroundColor: '#f5f5f5',
          padding: { xs: 1, sm: 2 }, // Adjust padding for different screen sizes
          boxShadow: 3,
        }}
      >
        <Profiles onProfileClick={handleProfileClick} />
      </Box>

      {/* Chat Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
          padding: { xs: 1, sm: 2 }, // Adjust padding for smaller screens
        }}
      >
        <ChatHistory messages={messages} />

        {/* Role Selection */}
        <Box sx={{ marginBottom: 2 }}>
          <Button onClick={() => setRole('initiator')} variant="contained" color="primary">
            Set as Initiator
          </Button>
          <Button onClick={() => setRole('responder')} variant="contained" color="secondary" sx={{ marginLeft: 2 }}>
            Set as Responder
          </Button>
        </Box>

        {/* Signal Input */}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Signaling Data (Offer/Answer)"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={signalData}
            onChange={(e) => setSignalData(e.target.value)}
            placeholder="Paste signaling data here"
          />
          <Button onClick={handleSignalPaste} variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Set as Responder
          </Button>
        </Box>

        <MessageInput onSendMessage={handleSendMessage} disabled={!isConnected} />
      </Box>
    </Box>
  );
};

export default Chat;
