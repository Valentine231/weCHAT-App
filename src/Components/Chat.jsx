import React, { useState, useEffect } from 'react';
import { usePeerStore } from '../Store/Connectionmanger';
import ChatHistory from './ChatHistory';
import MessageInput from './MessageInput';
import Profiles from './profile';
import { Box, Button, TextField } from '@mui/material';

const Chat = () => {
    const {isInitiator,
        signal,
        remoteSignal,
        connected,
        message,
        messages,
        setIsInitiator,
        setRemoteSignal,
        setMessage,
        createPeer,
        handleConnect,
        sendMessage,} = usePeerStore();
   

    return (
        <Box>

      
        <Button onClick={() => { setIsInitiator(true); createPeer(true); }}>Generate Signal</Button>
        <TextField value={signal} disabled />
        <TextField
          value={remoteSignal}
          onChange={(e) => setRemoteSignal(e.target.value)}
        />
        <Button onClick={() => { setIsInitiator(false); createPeer(false); }}>Join Chat</Button>
        <Button onClick={handleConnect}>Connect</Button>
        <ChatHistory messages={messages} />
        <MessageInput
          message={message}
          onChange={(e) => setMessage(e.target.value)}
          onSendMessage={sendMessage}
        />
      </Box>
    );
};

export default Chat;






 // const messages = useMessageStore((state) => state.messages);
    // const [ws, setWs] = useState(null);
    // const [isConnected, setIsConnected] = useState(false);
    // const [activeProfile, setActiveProfile] = useState(null);

    // useEffect(() => {
    //     // Connect to WebSocket server
    //     const socket = new WebSocket('ws://localhost:8080'); // Update to match your server's URL

    //     socket.onopen = () => {
    //         console.log('WebSocket connected');
    //         setIsConnected(true);
    //     };

    //     socket.onmessage = (event) => {
    //         const receivedMessage = event.data;
    //         console.log('Received message:', receivedMessage);
    //         useMessageStore.getState().addMessage({ type: 'received', text: receivedMessage });
    //     };

    //     socket.onclose = () => {
    //         console.warn('WebSocket disconnected');
    //         setIsConnected(false);
    //     };

    //     socket.onerror = (error) => {
    //         console.error('WebSocket error:', error);
    //     };

    //     setWs(socket);

    //     return () => {
    //         if (socket) {
    //             socket.close();
    //         }
    //     };
    // }, []);

    // const handleSendMessage = (message) => {
    //     if (ws && isConnected) {
    //         ws.send(message); // Sending text message
    //         console.log('Message sent:', message);
    //         useMessageStore.getState().addMessage({ type: 'sent', text: message });
    //     } else {
    //         console.error('Cannot send message: WebSocket is not connected');
    //     }
    // };
    
