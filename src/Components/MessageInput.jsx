import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const MessageInput = ({ onSendMessage, disabled }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

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
    }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        aria-label="Message input field"
        sx={{ marginRight: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendMessage}
        // disabled={disabled} // Disable the button if `disabled` is true
      >
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;
