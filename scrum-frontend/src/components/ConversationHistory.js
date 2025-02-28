import React, { useEffect, useRef } from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

// Define roleStyles here
const roleStyles = {
  user: { bgcolor: '#e3f2fd', alignSelf: 'flex-end', borderRadius: '10px 10px 0 10px' },
  scrum_master: { bgcolor: '#c8e6c9', alignSelf: 'flex-start', borderRadius: '10px 10px 10px 0' },
  product_owner: { bgcolor: '#ffecb3', alignSelf: 'flex-start', borderRadius: '10px 10px 10px 0' },
  developer_1: { bgcolor: '#b3e5fc', alignSelf: 'flex-start', borderRadius: '10px 10px 10px 0' },
  developer_2: { bgcolor: '#d1c4e9', alignSelf: 'flex-start', borderRadius: '10px 10px 10px 0' },
  error: { bgcolor: '#ffcdd2', alignSelf: 'center', borderRadius: '10px' },
};

function ConversationHistory({ conversation }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
      <List>
        {conversation.map((msg, index) => (
          <ListItem
            key={index}
            sx={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
          >
            <Box
              sx={{
                maxWidth: '70%',
                // Use roleStyles with a fallback to 'error' if the role isn’t defined
                ...roleStyles[msg.role] || roleStyles.error,
                p: 1,
              }}
            >
              <Typography variant="caption">{msg.targetRole || msg.role}</Typography>
              <ListItemText primary={msg.content} />
            </Box>
          </ListItem>
        ))}
        <div ref={endRef} />
      </List>
    </Box>
  );
}

export default ConversationHistory;