import React, { useRef, useState } from "react";
import ChatHistory from "./ChatHistory";
import MessageInput from "./MessageInput";
import { Box, Button, TextField } from "@mui/material";
import SimplePeer from "simple-peer";

const Chat = () => {
  const [isInitiator, setIsInitiator] = useState(false);
  const [signal, setSignal] = useState("");
  const [remoteSignal, setRemoteSignal] = useState("");
  const [connected, setConnected] = useState(false);
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);

  const peerRef = useRef(null);

  const createPeer = (initiator) => {
    const peer = new SimplePeer({ initiator, trickle: false });
  
    peer.on("signal", (data) => {
      console.log("Generated signal:", data);
      setSignal(JSON.stringify(data));
    });
  
    peer.on("connect", () => {
      console.log("Peer connected successfully!");
      setConnected(true);
    });
  
    peer.on("data", (data) => {
      console.log("Received data:", data.toString());
      setmessages((prevMessages) => [
        ...prevMessages,
        { sender: "peer", text: data.toString(), time: new Date().toLocaleTimeString() },
      ]);
    });
  
    peerRef.current = peer;
    console.log("Peer created:", peer);
  };
  
  const handleConnect = () => {
    if (!remoteSignal.trim()) {
      console.error("Remote signal is empty.");
      return;
    }
  
    try {
      const signalData = JSON.parse(remoteSignal);
      peerRef.current.signal(signalData); // Signal the peer
      console.log("Signaled peer with:", signalData);
    } catch (error) {
      console.error("Invalid signal data:", error);
    }
  };
  

  const sendMessage = () => {
    if (!peerRef.current || !connected) {
      console.error("Peer not connected.");
      return;
    }
  
    if (!message.trim()) {
      console.error("Cannot send an empty message.");
      return;
    }
  
    console.log("Sending message:", message);
    peerRef.current.send(message);
    setmessages((prevMessages) => [
      ...prevMessages,
      { sender: "me", text: message, time: new Date().toLocaleTimeString() },
    ]);
    setmessage("");
  };
  

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
        onChange={(e) => setmessage(e.target.value)}
        onSendMessage={sendMessage}
      />
    </Box>
  );
};

export default Chat;
