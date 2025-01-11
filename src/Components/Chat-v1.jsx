import React, { useState, useEffect } from 'react';
import { useMessageStore } from './Connectionmanger';
import ChatHistory from './ChatHistory';
import MessageInput from './MessageInput';
import Profiles from './profile';
import { Box, Button, TextField } from '@mui/material';

const Chat = () => {
    const messages = useMessageStore((state) => state.messages);
    const [ws, setWs] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [activeProfile, setActiveProfile] = useState(null);

    useEffect(() => {
        // Connect to WebSocket server
        const socket = new WebSocket('ws://localhost:8080'); // Update to match your server's URL

        socket.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
        };

        socket.onmessage = (event) => {
            const receivedMessage = event.data;
            console.log('Received message:', receivedMessage);
            useMessageStore.getState().addMessage({ type: 'received', text: receivedMessage });
        };

        socket.onclose = () => {
            console.warn('WebSocket disconnected');
            setIsConnected(false);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setWs(socket);

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    const handleSendMessage = (message) => {
        if (ws && isConnected) {
            ws.send(message); // Sending text message
            console.log('Message sent:', message);
            useMessageStore.getState().addMessage({ type: 'sent', text: message });
        } else {
            console.error('Cannot send message: WebSocket is not connected');
        }
    };
    

    const handleProfileClick = (profileId) => {
        setActiveProfile(profileId);
        console.log(`Active profile ID: ${profileId}`);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                height: '100vh',
            }}
        >
            {/* Profiles Sidebar */}
            <Box
                sx={{
                    width: { xs: '100%', sm: 250 },
                    backgroundColor: '#f5f5f5',
                    padding: { xs: 1, sm: 2 },
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
                    padding: { xs: 1, sm: 2 },
                }}
            >
                <ChatHistory messages={messages} />

                <MessageInput onSendMessage={handleSendMessage} disabled={!isConnected} />
            </Box>
        </Box>
    );
};

export default Chat;
