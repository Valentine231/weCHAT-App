import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const ChatHistory = ({ messages = [] }) => {
  return (
    <Box
      className="bg-white"
      sx={{
        padding: { xs: 1, sm: 4 },
        maxHeight: '80vh',
        overflowY: 'scroll',
      }}
    >
      {Array.isArray(messages) ? (
        messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              padding: 1,
              display: 'flex',
              justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: message.sender === "me" ? "primary.main" : "text.secondary",
                maxWidth: '80%',
                wordWrap: 'break-word',
              }}
            >
              {message.text || "no Message"}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography>No messages to display</Typography>
      )}
    </Box>
  );
};

ChatHistory.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string,
    })
  ).isRequired,
};

export default ChatHistory;
