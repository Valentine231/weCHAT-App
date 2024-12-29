import React from 'react';
import { Box, Avatar, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const profiles = [
  {
    id: 1,
    name: 'AVLIN',
    status: 'Online',
    avatar: 'https://via.placeholder.com/40', // Replace with a real avatar URL
  },
  {
    id: 2,
    name: 'MR Kanayo',
    status: 'Away',
    avatar: 'https://via.placeholder.com/40', // Replace with a real avatar URL
  },
  {
    id: 3,
    name: 'valentine',
    status: 'Busy',
    avatar: 'https://via.placeholder.com/40', // Replace with a real avatar URL
  },
  {
    id: 4,
    name: 'Michael ',
    status: 'Offline',
    avatar: 'https://via.placeholder.com/40', // Replace with a real avatar URL
  },
];

const Profiles = ({ onProfileClick }) => {
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 250 }, // Full width on mobile and fixed width on larger screens
        backgroundColor: '#f5f5f5',
        height: '100vh',
        padding: { xs: 1, sm: 2 }, // Adjust padding for mobile
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          textAlign: 'center',
          fontSize: { xs: '1rem', sm: '1.25rem' }, // Adjust font size based on screen size
        }}
      >
        Profiles
      </Typography>
      <List>
        {profiles.map((profile) => (
          <ListItem
            key={profile.id}
            button
            onClick={() => onProfileClick(profile.id)}
            sx={{
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
              padding: { xs: '8px 0', sm: '12px 0' }, // Adjust padding for list items on mobile
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={profile.avatar}
                alt={profile.name}
                sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }} // Smaller avatars on mobile
              />
            </ListItemAvatar>
            <ListItemText
              primary={profile.name}
              secondary={profile.status}
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' }, // Adjust font size for smaller screens
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Profiles;
