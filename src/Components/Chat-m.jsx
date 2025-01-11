import React, { useRef, useState } from "react";
import { useChatStore } from "./Connectionmanger";
import ChatHistory from "./ChatHistory";
import MessageInput from "./MessageInput";
import Profiles from "./profile";
import { Box, Button, TextField } from "@mui/material";
import SimplePeer from "simple-peer";

const Chat = () => {
    const {
      messages,
      isConnected,
      setSignalData,
      addMessage,
      setIsConnected,
    } = useChatStore();
  
    const [peer, setPeer] = useState(null);
    const [receivedSignal, setReceivedSignal] = useState("");
    const [joinSignal, setJoinSignal] = useState("");
    const hasJoinedSignal = useRef(false);

    const setupPeerEvents = (peerInstance) => {
      peerInstance.on("connect", () => {
        console.log("Peer connected!");
        setIsConnected(true);
      });
    
      peerInstance.on("signal", (data) => {
        console.log("Signal generated:", JSON.stringify(data));
        setReceivedSignal(JSON.stringify(data));
      });
    
      peerInstance.on("error", (err) => {
        console.error("Peer error:", err);
      });
    
      peerInstance.on("close", () => {
        console.log("Peer connection closed.");
      });
    
      peerInstance.on("data", (data) => {
        console.log("Received data:", data.toString());
        addMessage({ type: "received", text: data.toString() });
      });
    
      peerInstance.on("connectionStateChange", () => {
        console.log("Connection state changed:", peerInstance._pc.connectionState);
      });
    };
    
  
    const handleGenerateSignal = () => {
      if (!peer) {
        const initiatorPeer = new SimplePeer({ initiator: true, trickle: false });
        setupPeerEvents(initiatorPeer);
        setPeer(initiatorPeer);
      }
    };
    
    const handleJoinChat = () => {
      if (!joinSignal || peer || hasJoinedSignal.current) return;
      try {
        const responderPeer = new SimplePeer({ initiator: false, trickle: false });
        setupPeerEvents(responderPeer);
        responderPeer.signal(JSON.parse(joinSignal));
        hasJoinedSignal.current = true;
        setPeer(responderPeer);
      } catch (error) {
        console.error("Error processing join signal:", error);
      }
    };
    
  
    return (
      <Box>
        {/* Signal and Message Components */}
        <Button onClick={handleGenerateSignal}>Generate Signal</Button>
        <TextField value={receivedSignal} disabled />
        <TextField
          value={joinSignal}
          onChange={(e) => setJoinSignal(e.target.value)}
        />
        <Button onClick={handleJoinChat}>Join Chat</Button>
        <ChatHistory messages={messages} />
        <MessageInput
          onSendMessage={(message) => {
            if (peer && isConnected) {
              peer.send(message);
              addMessage({ type: "sent", text: message });
            }
          }}
          disabled={!isConnected}
        />
      </Box>
    );
  };
  
  export default Chat;