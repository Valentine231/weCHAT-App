import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const MessageInput = ({ onSendMessage, message, onChange}) => {
  // const [newMessage, setNewMessage] = useState(message || ""); // Initialize with the passed message if any

  // const handleSendMessage = () => {
  //   if (newMessage.trim()) {
  //     onSendMessage(newMessage); // Send the message
  //     setNewMessage(""); // Clear the input after sending
  //   }
  // };

  return (
    <Box
      sx={{
        position: "fixed", // Fix it to the bottom
        bottom: 0, // Align at the bottom of the viewport
        display: "flex",
        alignItems: "center",
        width: "80%",
        p: 2,
        backgroundColor: "white", // Add background to distinguish it
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)", // Add a shadow for better separation
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        value={message}
        onChange={onChange}
        aria-label="Message input field"
        sx={{ marginRight: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSendMessage}
      >
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;