import React from 'react'
import { Avatar,Box, } from '@mui/material'
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline'

const Logo = () => {
  return (
    <div>
         <div className="flex items-center justify-center h-screen bg-gray-100">
      <Box
        className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 shadow-lg"
        sx={{ position: "relative" }}
      >
        <ChatBubbleOutline className="text-white" sx={{ fontSize: 32 }} />
        <Avatar
          sx={{
            bgcolor: "white",
            color: "blue",
            width: 24,
            height: 24,
            position: "absolute",
            bottom: -4,
            right: -4,
            fontSize: 12,
          }}
        >
          U
        </Avatar>
      </Box>
    </div>
    </div>
  )
}

export default Logo