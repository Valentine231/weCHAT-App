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
        width: 250,
        backgroundColor: '#f5f5f5',
        height: '100vh',
        padding: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, textAlign: 'center' }}>
        Profiles
      </Typography>
      <List>
        {profiles.map((profile) => (
          <ListItem
            key={profile.id}
            button='true'
            onClick={() => onProfileClick(profile.id)}
            sx={{
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar src={profile.avatar} alt={profile.name} />
            </ListItemAvatar>
            <ListItemText
              primary={profile.name}
              secondary={profile.status}
              typographyprops={{font:'bold'}}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Profiles;
